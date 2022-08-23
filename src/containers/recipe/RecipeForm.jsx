/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/display-name */
import { useAppContext } from '@/components/context/AppContext';
import AutocompleteField from '@/components/form/AutocompleteField';
import useCategoryRecipes, { saveCategoryRecipes } from '@/hooks/recipe-groups/useRecipesGroups';
import { saveRecipe } from '@/hooks/recipe/useRecipes';
import { API_CATEGORY_RECIPES_URL, API_RECIPES_URL, POST, PUT } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import { Field, Form, Formik } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import IngredientsForm from './IngredientsForm';

const RecipeForm = ({ data }) => {
  const { t } = useTranslation('common');
  const queryClient = useQueryClient();
  const [ingredients, setIngredients] = useState([]);
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors] = useState({});
  const [touched] = useState({});
  const { user } = useAppContext();
  const [shipmentPrice, setShipmentPrice] = useState(0);
  const [miscCost, setMiscCost] = useState(0);
  const [salesPrice, setSalesPrice] = useState(0);
  const [salesProfit, setSalesProfit] = useState(0);

  const { data: categories } = useCategoryRecipes({
    args: {},
    options: {
      keepPreviousData: true
    }
  });

  const initialValues = {
    name: data?.name || '',
    price: data?.salesPrice || 0,
    description: data?.description || '',
    category: data?.category || '',
    posId: data?.posId || '',
    miscCost: data?.miscCost || 0,
    salesProfit: data?.salesProfit || 0,
    ingredients: data?.ingredients || []
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('form.common.required.name')),
    price: Yup.number().required(t('form.common.required.price')),
    description: Yup.string().required(t('form.common.required.description')),
    //category: Yup.string().required(t('form.common.required.description')),
    posId: Yup.string().required(t('form.common.required.description')),
    miscCost: Yup.string().required(t('form.common.required.description'))
  });

  const onSubmit = async (values) => {
    const { name, description, category, price, posId } = values;
    const sendBody = { name, description, price, posId, miscCost };
    sendBody.recipeGroup = category.id;
    sendBody.business = user?.data?.business[0]?.id;
    sendBody.miscCost = miscCost;
    sendBody.ingredients = ingredients;
    let method = POST;
    let message = t('inserted.male', { entity: t('recipes', { count: 1 }) });
    if (data) {
      method = PUT;
      sendBody.id = data.id;
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
      await queryClient.refetchQueries([API_RECIPES_URL]);
      toast(message);
    } catch (error) {
      toast(error.response.data.message || error.toString());
    } finally {
      setLoading(false);
    }
  };

  const onCreateCategories = async (name) => {
    const sendBody = { name: name };
    let method = POST;
    let message = t('inserted.male', { entity: t('recipes', { count: 1 }) });
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

  function getSumPrice(total, num) {
    return (total += num?.amount * num?.price);
  }

  const calculateShipmentPrice = () => {
    let total = 0;
    if (ingredients.length > 1) {
      total = ingredients.reduce(getSumPrice, 0);
    } else {
      total = ingredients[0]?.amount * ingredients[0]?.price;
    }
    total += parseFloat(miscCost);
    setShipmentPrice(total);
  };

  useMemo(async () => {
    if (ingredients.length > 0) {
      setDisable(false), calculateShipmentPrice();
      setSalesPrice(parseFloat(shipmentPrice) + parseFloat(salesProfit));
      //  setSalesProfit(parseFloat(salesPrice) + parseFloat(shipmentPrice));
    } else {
      setDisable(true);
    }
    setSalesPrice(parseFloat(shipmentPrice) + parseFloat(salesProfit));
  }, [ingredients, miscCost, salesProfit, shipmentPrice, salesPrice]);

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      <Form>
        <div className="flex p-8 space-x-12">
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

            <div className="w-full space-y-2">
              <label htmlFor="category">{t('form.common.label.category')}</label>
              <div className="relative w-full mx-auto">
                <AutocompleteField
                  id="category"
                  name="category"
                  options={categories?.rows ? categories.rows : []}
                  className="text-field filled"
                  defaultValue={data?.category}
                  actionCreate={onCreateCategories}
                />
              </div>
            </div>

            <div className="w-full space-y-2">
              <label htmlFor="posId">{t('form.common.label.pos-id')}</label>
              <div className="relative w-full mx-auto">
                <Field id="posId" name="posId" type="text" className="text-field filled" />
                {errors?.posId && touched?.posId ? (
                  <p className="mt-4 text-red-600">{errors?.posId}</p>
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

          <div className="w-full space-y-4">
            <label htmlFor="description">{t('form.common.label.ingredients')}</label>
            <IngredientsForm
              errors={errors}
              onShipmentItemsChange={setIngredients}
              touched={touched}
            />
          </div>

          <div className="w-full space-y-4">
            <div className="flex w-full space-x-4 items-center p-4 text-base text-gray-600 hover:text-primary-500 hover:bg-primary-100">
              <div className="w-full space-y-2">
                <label htmlFor="sales-price">{t('form.common.label.sales-price')}</label>
                <div className="relative w-full mx-auto">
                  <input
                    id="price"
                    name="price"
                    type="number"
                    value={salesPrice}
                    disabled={disable}
                    onChange={(e) => setSalesPrice(e.target.value)}
                    className="text-field filled"
                  />
                  {errors?.price && touched?.price ? (
                    <p className="mt-4 text-red-600">{errors?.price}</p>
                  ) : null}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="cost">{t('form.common.label.cost')}</label>
                <div className="relative w-full mx-auto">
                  <Field
                    id="cost"
                    type="number"
                    name="cost"
                    disabled={disable}
                    className="text-field filled"
                  />
                  {errors?.cost && touched?.cost ? (
                    <p className="mt-4 text-red-600">{errors?.cost}</p>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="sales-profit">{t('form.common.label.sales-profit')}</label>
              <div className="relative w-full mx-auto">
                <input
                  id="salesProfit"
                  type="number"
                  name="salesProfit"
                  disabled={disable}
                  value={salesProfit}
                  className="text-field filled"
                  onChange={(e) => setSalesProfit(e.target.value)}
                />
                {errors?.salesProfit && touched?.salesProfit ? (
                  <p className="mt-4 text-red-600">{errors?.salesProfit}</p>
                ) : null}
              </div>
            </div>

            <div className="flex w-full space-x-4 items-center p-4 text-base text-gray-600 hover:text-primary-500 hover:bg-primary-100">
              <div className="space-y-2">
                <label htmlFor="misc-cost">{t('form.common.label.misc-cost')}</label>
                <div className="relative w-full mx-auto">
                  <input
                    id="miscCost"
                    type="number"
                    name="miscCost"
                    value={miscCost}
                    className="text-field filled"
                    onChange={(e) => setMiscCost(e.target.value)}
                    disabled={disable}
                  />
                  {errors?.miscCost && touched?.miscCost ? (
                    <p className="mt-4 text-red-600">{errors?.miscCost}</p>
                  ) : null}
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="totalCost">{t('form.common.label.total-cost')}</label>
                <div className="relative w-full mx-auto">
                  <Field
                    value={formatPrice(shipmentPrice)}
                    disabled={true}
                    className="text-field filled"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end p-4 space-x-8">
          <button type="submit" className="btn-contained">
            {t('save')}
          </button>
        </div>
      </Form>
    </Formik>
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
