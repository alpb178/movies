/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/display-name */
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
  const [errors, setErrorsForm] = useState({});
  const [touched, setTouchedForm] = useState({});

  const initialValues = {
    name: data?.name || '',
    price: data?.price || '',
    description: data?.description || ''
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('form.common.required.name')),
    price: Yup.string().required(t('form.common.required.price')),
    description: Yup.string().required(t('form.common.required.description'))
  });

  const onSubmit = async (values) => {
    let sendBody = {};
    sendBody.name = values.name;
    sendBody.price = values.price;
    sendBody.description = values.description;
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
    <Formik initialValues={initialValues}>
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
              <label htmlFor="price">{t('form.common.label.price')}</label>
              <div className="relative w-full mx-auto">
                <Field id="price" type="number" name="price" className="text-field filled" />
                {errors?.price && touched?.price ? (
                  <p className="mt-4 text-red-600">{errors?.price}</p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="w-full space-y-2">
            <IngredientsForm />
          </div>
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
