/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/display-name */
import FormDialogWrapper from '@/components/form/FormDialogWrapper';
import { saveProduct } from '@/hooks/product/useProducts';
import { API_PRODUCT_URL, POST, PUT } from '@/lib/constants';
import { Field } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const RegionForm = ({ data, onOpen, open, setLoading }) => {
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
    let message = t('inserted.male', { entity: t('products', { count: 1 }) });
    if (data) {
      method = PUT;
      sendBody.id = data.id;
      message = t('updated.male', { entity: t('products', { count: 1 }) });
    }

    try {
      setLoading(true);
      await saveProduct({
        args: sendBody,
        options: {
          method
        }
      });
      await queryClient.refetchQueries([API_PRODUCT_URL]);
      toast(message);
    } catch (error) {
      toast(error.response.data.message);
    } finally {
      setLoading(false);
      onOpen(false);
    }
  };

  useEffect(() => {
    data?.id ? setIsNewData(false) : setIsNewData(true);
  }, [data?.id]);

  useEffect(() => {
    onOpen(true);
  });

  return (
    <FormDialogWrapper
      formName="products"
      open={open}
      onOpen={onOpen}
      isNewData={isNewData}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      setErrorsForm={setErrorsForm}
      setTouchedForm={setTouchedForm}
    >
      <div className="space-y-2">
        <label htmlFor="name">{t('form.common.label.name')}</label>
        <div className="relative w-full mx-auto">
          <Field
            id="name"
            name="name"
            type="text"
            className="w-full text-sm border-gray-300 rounded-lg hover:border-gray-700"
          />
          {errors?.name && touched?.name ? (
            <p className="mt-4 text-red-600">{errors?.name}</p>
          ) : null}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="price">{t('form.common.label.price')}</label>
        <div className="relative w-full mx-auto">
          <Field
            id="price"
            type="number"
            name="price"
            className="w-full text-sm border-gray-300 rounded-lg hover:border-gray-700"
          />
          {errors?.price && touched?.price ? (
            <p className="mt-4 text-red-600">{errors?.price}</p>
          ) : null}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="description">{t('form.common.label.description')}</label>
        <Field
          as="textarea"
          className="w-full text-sm border-gray-300 rounded-lg hover:border-gray-700"
          rows={3}
          id="description"
          name="description"
          placeholder={t('form.common.placeholder.description')}
        />
      </div>
    </FormDialogWrapper>
  );
};

RegionForm.defaultProps = {
  data: null,
  errors: null
};

RegionForm.propTypes = {
  data: PropTypes.object,
  errors: PropTypes.object,
  onOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  touched: PropTypes.object,
  setLoading: PropTypes.func.isRequired
};

export default RegionForm;
