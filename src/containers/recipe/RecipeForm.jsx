import Loading from '@/components/common/Loader';
import { useAppContext } from '@/components/context/AppContext';
import AutocompleteField from '@/components/form/AutocompleteField';
import CustomSwitch from '@/components/form/CustomSwitch';
import useCategoryRecipes, { saveCategoryRecipes } from '@/hooks/recipe-groups/useRecipesGroups';
import useRecipes, { saveRecipe } from '@/hooks/recipe/useRecipes';
import {
  API_CATEGORY_RECIPES_URL,
  DEFAULT_PAGE_SIZE,
  POST,
  PUT,
  RECIPES_PAGE
} from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import { Field, Form, Formik } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import NumberFormat from 'react-number-format';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import IngredientsForm from './IngredientsForm';

const RecipeForm = ({ recipesId }) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [sort, setSort] = useState();
  const queryClient = useQueryClient();
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAppContext();
  const [totalCost, setTotalCost] = useState(0);
  const [miscCost, setMiscCost] = useState(0);
  const [salesPrice, setSalesPrice] = useState(0);
  const [salesProfit, setSalesProfit] = useState(0);
  const [cost, setCost] = useState(0);
  const [menuItem, setMenuItem] = useState(false);

  const params = useMemo(() => {
    const queryParams = {};

    if (page) {
      queryParams.page = page;
    }
    if (pageSize) {
      queryParams.size = pageSize;
    }
    if (sort) {
      queryParams.sort = sort;
    }
    return queryParams;
  }, [page, pageSize, sort]);

  const { data: recipeGroups, loadingRecipeGroups } = useCategoryRecipes({
    args: params,
    options: {
      keepPreviousData: true
    }
  });

  const { data: recipes, isLoading: isLoading } = useRecipes({
    args: { id: recipesId },
    options: { keepPreviousData: true, enabled: !isNaN(recipesId) && !!recipeGroups }
  });

  const initialValues = {
    name: recipes?.name || '',
    description: recipes?.description || '',
    category: recipes?.category || '',
    ingredients: recipes?.ingredients || [],
    isMenuItem: recipes?.menuItem?.isAvailable || false,
    recipeGroups: recipes?.recipeGroups || []
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('form.common.required.name'))
  });

  const onCreateRecipeGroups = async (name) => {
    const sendBody = { name: name };
    let method = POST;
    let message = t('inserted.male', { entity: t('recipe-groups', { count: 1 }) });
    try {
      setLoading(true);
      await saveCategoryRecipes({
        args: sendBody,
        options: {
          method
        }
      });
      await queryClient.refetchQueries([API_CATEGORY_RECIPES_URL]);
      setLoading(false);
      toast(message);
    } catch (error) {
      toast(error?.response?.data?.message || error.toString());
    } finally {
      setLoading(false);
    }
  };

  const getSumPrice = (total, num) => {
    return (total += num?.amount * (num?.cost || num?.product?.cost));
  };

  const onChangeSalesPrice = async (value) => {
    setSalesPrice(value);
    setSalesProfit(parseFloat(value) - parseFloat(totalCost));
    setCost((parseFloat(totalCost) * 100) / parseFloat(value));
  };

  const onChangeSalesProfit = async (value) => {
    setSalesProfit(value);
    const newPrice = parseFloat(totalCost) + parseFloat(value);
    setSalesPrice(newPrice);
    setCost((parseFloat(totalCost) * 100) / newPrice);
  };

  const onChangeCost = async (value) => {
    setCost(value);
    const newSalePrice = (parseFloat(totalCost) * 100) / parseFloat(value);
    setSalesPrice(newSalePrice);
    setSalesProfit(newSalePrice - totalCost);
  };

  const calculateTotalCost = () => {
    console.log(ingredients);
    let total = 0;
    if (ingredients.length > 1) {
      total = ingredients.reduce(getSumPrice, 0);
    } else {
      total = ingredients[0]?.amount * (ingredients[0]?.cost || ingredients[0]?.product?.cost);
    }
    total += parseFloat(miscCost);
    setTotalCost(total);
  };

  useEffect(() => {
    setMenuItem(recipes?.menuItem?.isAvailable || false);
    setSalesPrice(recipes?.menuItem?.price || 0);
    console.log('ale');
  }, [recipes]);

  useMemo(async () => {
    if (ingredients.length > 0) {
      calculateTotalCost();
    } else {
      setSalesPrice(0);
      setSalesProfit(0);
      setTotalCost(0);
      setCost(0);
    }
    setSalesPrice(parseFloat(totalCost) + parseFloat(salesProfit));
    setCost((parseFloat(totalCost) * 100) / (parseFloat(totalCost) + parseFloat(salesProfit)));
  }, [ingredients, miscCost, totalCost]);

  const onSubmit = async (values) => {
    const { name, description, recipeGroups, isMenuItem } = values;
    const sendBody = { name, description, isMenuItem };
    sendBody.recipeGroup = recipeGroups.id;
    sendBody.business = user?.data?.business[0]?.id;
    sendBody.miscCost = miscCost;
    sendBody.price = salesPrice;
    sendBody.ingredients = ingredients;

    let method = POST;
    let message = t('inserted.male', { entity: t('recipes', { count: 1 }) });
    if (!isNaN(recipesId)) {
      method = PUT;
      sendBody.id = recipesId;
      message = t('updated.male', { entity: t('recipes', { count: 1 }) });
    }

    try {
      setLoading(true);
      await saveRecipe({
        args: sendBody,
        options: {
          method
        }
      });
      router.push(RECIPES_PAGE);
      setLoading(false);
      toast(message);
    } catch (error) {
      toast(error.response.data.message || error.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading || isLoading || loadingRecipeGroups ? (
        <Loading />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form className="p-6 space-y-6 text-lg">
              <p className="mb-1 form-header">
                {isNaN(recipesId) ? t('form.recipes.title.create') : t('form.recipes.title.update')}
              </p>
              <div className="grid grid-cols-1 gap-12 p-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="w-full space-y-4">
                  <div className="w-full space-y-2">
                    <label htmlFor="name">{t('form.common.label.name')}</label>
                    <div className="relative w-full mx-auto">
                      <Field id="name" name="name" type="text" className="text-field filled" />
                      {errors?.name && touched?.name ? (
                        <p className="mt-4 text-red-600">{errors?.name}</p>
                      ) : null}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="description">{t('form.common.label.description')}</label>
                    <Field
                      as="textarea"
                      className="text-field filled"
                      rows={3}
                      id="description"
                      name="description"
                      placeholder={t('form.common.placeholder.description')}
                    />
                  </div>
                </div>

                <div className="w-full space-y-2">
                  <label htmlFor="description">{t('form.common.label.ingredients')}</label>
                  <IngredientsForm
                    errors={errors}
                    onShipmentItemsChange={setIngredients}
                    touched={touched}
                    recipe={recipes}
                  />
                </div>

                <div className="grid w-full grid-cols-2 gap-6 h-max">
                  <div className="space-y-2">
                    <label htmlFor="misc-cost">{t('form.common.label.misc-cost')}</label>
                    <div className="relative w-full mx-auto">
                      <NumberFormat
                        decimalSeparator={','}
                        decimalScale={2}
                        id="miscCost"
                        name="miscCost"
                        value={miscCost}
                        className="text-field filled"
                        onChange={(e) => setMiscCost(e.target.value)}
                      />
                      <p className="absolute inset-y-0 right-0 flex items-center pr-10">$</p>
                    </div>
                  </div>
                  <div className="space-y-2 ">
                    <label htmlFor="totalCost">{t('form.common.label.total-cost')}</label>
                    <div className="relative w-full p-4 mx-auto bg-gray-100 border-2 border-transparent rounded-lg">
                      {formatPrice(totalCost)}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 col-span-2 gap-6 mt-5">
                    <label className="flex items-center">{t('direct-sale')}</label>
                    <Field id="isMenuItem" name="isMenuItem">
                      {({ form: { values, setFieldValue } }) => (
                        <CustomSwitch
                          checked={values?.isMenuItem}
                          onChange={(val) => {
                            setFieldValue('isMenuItem', val);
                            setMenuItem(!menuItem);
                          }}
                        />
                      )}
                    </Field>
                  </div>

                  {menuItem ? (
                    <>
                      <div className="w-full mt-5 space-y-2">
                        <label htmlFor="sales-price">{t('form.common.label.sales-price')}</label>
                        <div className="relative w-full mx-auto">
                          <NumberFormat
                            decimalSeparator={','}
                            decimalScale={2}
                            id="price"
                            value={salesPrice}
                            onChange={(e) => onChangeSalesPrice(e.target.value)}
                            className="text-field filled"
                          />
                          <p className="absolute inset-y-0 right-0 flex items-center pr-10">$</p>
                        </div>
                      </div>

                      <div className="mt-5 space-y-2 ">
                        <label htmlFor="cost">{t('form.common.label.cost')}</label>
                        <div className="relative w-full mx-auto">
                          <NumberFormat
                            decimalSeparator={','}
                            decimalScale={2}
                            id="cost"
                            name="cost"
                            value={cost}
                            className="text-field filled"
                            onChange={(e) => onChangeCost(e.target.value)}
                          />
                          <p className="absolute inset-y-0 right-0 flex items-center pr-10">%</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 col-span-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="sales-profit">
                            {t('form.common.label.sales-profit')}
                          </label>
                          <div className="relative">
                            <NumberFormat
                              decimalSeparator={','}
                              decimalScale={2}
                              id="salesProfit"
                              name="salesProfit"
                              value={salesProfit}
                              className="text-field filled"
                              onChange={(e) => onChangeSalesProfit(e.target.value)}
                            />
                            <p className="absolute inset-y-0 right-0 flex items-center pr-10">$</p>
                          </div>
                        </div>
                      </div>

                      <div className="w-full space-y-2">
                        <label htmlFor="category">{t('recipe-groups', { count: 1 })}</label>
                        <div className="relative w-full mx-auto">
                          <AutocompleteField
                            id="recipeGroups"
                            name="recipeGroups"
                            options={recipeGroups ? recipeGroups : []}
                            className="text-field filled"
                            defaultValue={recipes?.recipeGroups}
                            actionCreate={onCreateRecipeGroups}
                            actionText={t('recipe-groups.create')}
                            placeholder={t('select')}
                          />
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>

              <div className="flex justify-end p-4 space-x-8">
                <button type="submit" className="btn-contained">
                  {t('save')}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

RecipeForm.defaultProps = {
  data: null,
  errors: null
};

RecipeForm.propTypes = {
  data: PropTypes.object,
  errors: PropTypes.object,
  onOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  touched: PropTypes.object,
  setLoading: PropTypes.func.isRequired
};

export default RecipeForm;
