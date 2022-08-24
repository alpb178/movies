import Loading from '@/components/common/Loader';
import AutocompleteField from '@/components/form/AutocompleteField';
import useBusiness, { saveBusiness } from '@/hooks/business/useBusiness';
import useUsers from '@/hooks/user/useUsers';
import { Field, Form, Formik } from 'formik';
import { BUSINESS_PAGE, POST, PUT } from 'lib/constants';
import useTranslation from 'next-translate/useTranslation';
import router from 'next/router';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const BusinessForm = ({ businessId }) => {
  const { t } = useTranslation('common');

  const [loading, setLoading] = useState(false);

  const { data: users } = useUsers({
    args: {},
    options: {
      keepPreviousData: true
    }
  });

  const { data: business, isLoading } = useBusiness({
    args: { id: businessId },
    options: { keepPreviousData: true, enabled: !isNaN(businessId) && !!users }
  });

  const initialValues = {
    name: business?.name || '',
    address: business?.address || '',
    country: business?.country || '',
    phone: business?.phone || '',
    province: business?.province || '',
    city: business?.city || '',
    zipCode: business?.zipCode || '',
    userId: business?.userId || ''
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('required.name')),
    address: Yup.string().required(t('required.address')),
    country: Yup.string().required(t('required.country')),
    phone: Yup.string().required(t('required.phone')),
    province: Yup.string().required(t('required.province')),
    city: Yup.string().required(t('required.city')),
    zipCode: Yup.string().required(t('required.zipCode')),
    userId: Yup.object().nullable().required(t('required.status'))
  });

  const onSubmit = async (values) => {
    let businessSendApi = {};
    let method = POST;

    try {
      setLoading(true);
      businessSendApi.name = values.name;
      businessSendApi.address = values.address;
      businessSendApi.country = values.country;
      businessSendApi.phone = values.phone;
      businessSendApi.province = values.province;
      businessSendApi.city = values.city;
      businessSendApi.zipCode = values.zipCode;
      businessSendApi.UserId = 1;
      let message = t('inserted.male', { entity: t('business', { count: 1 }) });

      if (business) {
        method = PUT;
        businessSendApi.id = businessId;
        message = t('updated.male', { entity: t('business', { count: 1 }) });
      }
      await saveBusiness({
        args: businessSendApi,
        options: {
          method
        }
      });

      toast(message);
      router.push(BUSINESS_PAGE);
    } catch (error) {
      toast.error(error.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading || isLoading ? (
        <Loading />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form className="p-6 space-y-6 text-lg">
              <p className="mb-8 form-header">
                {isNaN(businessId) ? t('form.user.title.create') : t('form.user.title.update')}
              </p>
              <div className="flex flex-col space-y-8 lg:space-y-0 lg:space-x-12 lg:flex-row">
                <div className="w-full">
                  <label htmlFor="name">{t('form.common.label.name')}</label>
                  <Field
                    name="name"
                    id="name"
                    placeholder={t('form.user.placeholder.name')}
                    className={`autocomplete-field ${
                      errors?.name && touched?.name ? 'border-red-400' : 'border-gray-300'
                    }`}
                  />
                  {errors?.name && touched?.name ? (
                    <p className="mt-4 text-red-600">{errors?.name}</p>
                  ) : null}
                </div>

                <div className="w-full">
                  <label htmlFor="address">{t('address')}</label>
                  <Field
                    name="address"
                    placeholder={t('form.user.placeholder.address')}
                    className={`autocomplete-field ${
                      errors?.address && touched?.address ? 'border-red-400' : 'border-gray-300'
                    }`}
                  />
                  {errors?.address && touched?.address ? (
                    <p className="mt-4 text-red-600">{errors?.address}</p>
                  ) : null}
                </div>

                <div className="w-full">
                  <label htmlFor="country">{t('country')}</label>
                  <Field
                    name="country"
                    placeholder={t('form.user.placeholder.country')}
                    className={`autocomplete-field ${
                      errors?.country && touched?.country ? 'border-red-400' : 'border-gray-300'
                    }`}
                  />
                  {errors?.country && touched?.country ? (
                    <p className="mt-4 text-red-600">{errors?.country}</p>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col space-y-8 lg:space-y-8 lg:space-x-12 lg:flex-row">
                <div className="w-full mt-8 ">
                  <label htmlFor="phone">{t('phone')}</label>
                  <Field
                    name="phone"
                    placeholder={t('form.user.placeholder.phone')}
                    className={`autocomplete-field ${
                      errors?.phone && touched?.phone ? 'border-red-400' : 'border-gray-300'
                    }`}
                  />
                  {errors?.phone && touched?.phone ? (
                    <p className="mt-4 text-red-600">{errors?.phone}</p>
                  ) : null}
                </div>

                <div className="w-full">
                  <label htmlFor="province">{t('province')}</label>
                  <Field
                    name="province"
                    placeholder={t('form.user.placeholder.province')}
                    className={`autocomplete-field ${
                      errors?.province && touched?.province ? 'border-red-400' : 'border-gray-300'
                    }`}
                  />
                  {errors?.province && touched?.province ? (
                    <p className="mt-4 text-red-600">{errors?.province}</p>
                  ) : null}
                </div>

                <div className="w-full">
                  <label htmlFor="city">{t('city')}</label>
                  <Field
                    name="city"
                    placeholder={t('form.user.placeholder.city')}
                    className={`autocomplete-field ${
                      errors?.city && touched?.city ? 'border-red-400' : 'border-gray-300'
                    }`}
                  />
                  {errors?.city && touched?.city ? (
                    <p className="mt-4 text-red-600">{errors?.city}</p>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col space-y-8 lg:space-y-8 lg:space-x-12 lg:flex-row">
                <div className="w-full">
                  <label htmlFor="zipCode">{t('zipCode')}</label>
                  <Field
                    name="zipCode"
                    placeholder={t('form.user.placeholder.zipCode')}
                    className={`autocomplete-field ${
                      errors?.zipCode && touched?.zipCode ? 'border-red-400' : 'border-gray-300'
                    }`}
                  />
                  {errors?.zipCode && touched?.zipCode ? (
                    <p className="mt-4 text-red-600">{errors?.zipCode}</p>
                  ) : null}
                </div>

                <div className="w-full">
                  <label htmlFor="userId">{t('users')}</label>
                  <AutocompleteField
                    id="userId"
                    name="userId"
                    options={users ? users : []}
                    className="autocomplete-field"
                    defaultValue={business?.userId}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-8">
                <button
                  type="submit"
                  className="px-8 py-3 mt-6 font-medium leading-5 text-white transition duration-300 ease-in-out rounded-md bg-primary-500 hover:bg-primary-400"
                >
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

BusinessForm.defaultProps = {
  userId: null
};

BusinessForm.propTypes = {
  userId: PropTypes.string
};

export default BusinessForm;
