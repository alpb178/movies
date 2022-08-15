/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/display-name */
import CustomSwitch from '@/components/form/CustomSwitch';
import FormSidebarRight from '@/components/form/FormSidebarRight';
import { saveProduct } from '@/hooks/product/useProducts';
import { API_PRODUCTS_URL, POST, PUT } from '@/lib/constants';
import clsx from 'clsx';
import { Field } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const RegionForm = ({ data, onOpen, open, products, setLoading }) => {
  const { t } = useTranslation('common');
  const queryClient = useQueryClient();
  const [isNewData, setIsNewData] = useState(true);
  const [errors, setErrorsForm] = useState({});
  const [touched, setTouchedForm] = useState({});

  const initialValues = {
    name: data?.name || '',
    price: data?.price || '',
    description: data?.description || '',
    directSale: data?.directSale
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('form.common.required.name')),
    price: Yup.string().required(t('form.common.required.price'))
    // description: Yup.string().required(t('form.common.required.description'))
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
      await queryClient.refetchQueries([API_PRODUCTS_URL]);
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

  useEffect(() => {
    onOpen(true);
  });

  return (
    <FormSidebarRight
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
        <div className="relative w-full mx-auto">
          <div className="absolute z-10 text-center text-gray-500"></div>
          <Field
            name="name"
            placeholder={t('form.products.placeholder.name')}
            className={clsx(
              'text-field',
              errors?.shipmentItems && touched?.shipmentItems
                ? 'border-red-400 bg-red-100'
                : ' filled'
            )}
          />
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

      <div className="flex justify-between">
        <label className="flex items-center">{t('direct-sale')}</label>
        <Field id="directSale" name="directSale">
          {({ form: { values, setFieldValue } }) => (
            <CustomSwitch
              checked={values?.directSale}
              onChange={(val) => {
                // setPushNotification(val);
                setFieldValue('directSale', val);
              }}
            />
          )}
        </Field>
      </div>
    </FormSidebarRight>
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
