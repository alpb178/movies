/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/display-name */
import { useAppContext } from '@/components/context/AppContext';
import { saveRecipe } from '@/hooks/recipe/useRecipes';
import { API_RECIPE_URL, POST, PUT } from '@/lib/constants';
import { Field, Form, Formik } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import IngredientsForm from './IngredientsForm';

const RecipeForm = ({ data, onOpen, open, setLoading }) => {
  const { t } = useTranslation('common');
  const queryClient = useQueryClient();
  const [isNewData, setIsNewData] = useState(true);
  const [ingredients, setIngredients] = useState();
  const [errors] = useState({});
  const [touched] = useState({});
  const { user } = useAppContext();

  const initialValues = {
    name: data?.name || '',
    price: data?.salesPrice || '',
    description: data?.description || '',
    category: data?.category || '',
    posId: data?.posId || '',
    miscCost: data?.miscCost || '',
    cost: data?.cost || '',
    salesProfit: data?.salesProfit || '',
    totalCost: data?.totalCost || '',
    ingredients: data?.ingredients || []
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('form.common.required.name')),
    price: Yup.number().required(t('form.common.required.price')),
    description: Yup.string().required(t('form.common.required.description')),
    category: Yup.string().required(t('form.common.required.description')),
    posId: Yup.string().required(t('form.common.required.description')),
    miscCost: Yup.string().required(t('form.common.required.description'))
  });

  const onSubmit = async (values) => {
    const { name, description, category, postId, miscCost } = values;
    const sendBody = { name, description, category, postId, miscCost };
    sendBody.business = user?.data?.business[0]?.id;
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
      await queryClient.refetchQueries([API_RECIPE_URL]);
      toast(message);
    } catch (error) {
      toast(error.response.data.message || error.toString());
    } finally {
      setLoading(false);
      onOpen(false);
    }
  };

  useEffect(() => {
    data?.id ? setIsNewData(false) : setIsNewData(true);
  }, [data?.id]);

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
                <Field id="category" name="name" type="text" className="text-field filled" />
                {errors?.category && touched?.category ? (
                  <p className="mt-4 text-red-600">{errors?.category}</p>
                ) : null}
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
            <div className="w-full space-y-2">
              <label htmlFor="name">{t('form.common.label.sales-price')}</label>
              <div className="relative w-full mx-auto">
                <Field id="price" name="price" type="number" className="text-field filled" />
                {errors?.price && touched?.price ? (
                  <p className="mt-4 text-red-600">{errors?.price}</p>
                ) : null}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="cost">{t('form.common.label.cost')}</label>
              <div className="relative w-full mx-auto">
                <Field id="cost" type="number" name="cost" className="text-field filled" />
                {errors?.cost && touched?.cost ? (
                  <p className="mt-4 text-red-600">{errors?.cost}</p>
                ) : null}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="price">{t('form.common.label.sales-profit')}</label>
              <div className="relative w-full mx-auto">
                <Field
                  id="salesProfit"
                  type="number"
                  name="salesProfit"
                  className="text-field filled"
                />
                {errors?.salesProfit && touched?.salesProfit ? (
                  <p className="mt-4 text-red-600">{errors?.salesProfit}</p>
                ) : null}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="price">{t('form.common.label.misc-cost')}</label>
              <div className="relative w-full mx-auto">
                <Field id="miscCost" type="number" name="miscCost" className="text-field filled" />
                {errors?.miscCost && touched?.miscCost ? (
                  <p className="mt-4 text-red-600">{errors?.miscCost}</p>
                ) : null}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="totalCost">{t('form.common.label.total-cost')}</label>
              <div className="relative w-full mx-auto">
                <Field
                  id="totalCost"
                  type="number"
                  name="totalCost"
                  className="text-field filled"
                />
                {errors?.totalCost && touched?.totalCost ? (
                  <p className="mt-4 text-red-600">{errors?.totalCost}</p>
                ) : null}
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
