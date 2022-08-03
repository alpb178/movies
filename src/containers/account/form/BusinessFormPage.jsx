import Wizard from '@/components/form/Wizards';
import { Field } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';

const BusinessFormPage = ({ parentState }) => {
  const { t } = useTranslation('common');

  return (
    <Wizard.Page>
      {() => (
        <div className="relative w-full h-full pb-4">
          <h3 className="form-header items-center">{t('form.business.title.create')}</h3>
          <div className="flex flex-col space-y-8 lg:space-y-0 lg:space-x-12 lg:flex-row">
            <div className="items-center m-2">
              <p className="text-lg">{t('form.common.label.name')}</p>
              <Field
                name="name"
                id="name"
                placeholder={t('form.common.placeholder.name')}
                type="text"
                className="w-full text-xl border-gray-300 rounded-lg hover:border-gray-700"
              />
              {parentState?.errors?.name && parentState?.touched?.name ? (
                <p className="mt-1 text-red-500">{parentState?.errors?.name}</p>
              ) : null}
            </div>

            <div className="flex flex-col space-y-8 lg:space-y-0 lg:space-x-12 lg:flex-row">
              <div className="items-center m-2">
                <p className="text-lg">{t('form.common.label.address')}</p>

                <Field
                  name="address"
                  placeholder={t('form.common.placeholder.address')}
                  type="text"
                  className="w-full text-xl border-gray-300 rounded-lg hover:border-gray-700"
                />
                {parentState?.errors?.address && parentState?.touched?.address ? (
                  <p className="mt-1 text-red-500">{parentState?.errors?.address}</p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-6 space-y-8 lg:space-y-0 lg:space-x-12 lg:flex-row">
            <div className="items-center m-2">
              <p className="text-lg">{t('form.common.label.zipCode')}</p>
              <Field
                name="zipCode"
                placeholder={t('form.common.placeholder.zipCode')}
                type="text"
                className="w-full text-xl border-gray-300 rounded-lg hover:border-gray-700"
              />
              {parentState?.errors?.zipCode && parentState?.touched?.zipCode ? (
                <p className="mt-1 text-red-500">{parentState?.errors?.zipCode}</p>
              ) : null}
            </div>

            <div className="items-center m-2">
              <p className="text-lg">{t('form.common.label.phone')}</p>

              <Field
                name="phone"
                type="text"
                className="w-full text-xl border-gray-300 rounded-lg hover:border-gray-700"
                placeholder={t('form.common.placeholder.phone')}
              />
              {parentState?.errors?.phone && parentState?.touched?.phone ? (
                <p className="mt-1 text-red-500">{parentState?.errors?.phone}</p>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col mt-6 space-y-8 lg:space-y-0 lg:space-x-12 lg:flex-row">
            <div className="items-center m-2">
              <p className="text-lg">{t('form.common.label.province')}</p>

              <Field
                name="province"
                type="text"
                className="w-full text-xl border-gray-300 rounded-lg hover:border-gray-700"
                placeholder={t('form.common.placeholder.province')}
              />
              {parentState?.errors?.province && parentState?.touched?.province ? (
                <p className="mt-1 text-red-500">{parentState?.errors?.province}</p>
              ) : null}
            </div>

            <div className="items-center m-2">
              <p className="text-lg">{t('form.common.label.city')}</p>

              <Field
                name="city"
                type="text"
                className="w-full text-xl border-gray-300 rounded-lg hover:border-gray-700"
                placeholder={t('form.common.placeholder.city')}
              />
              {parentState?.errors?.city && parentState?.touched?.city ? (
                <p className="mt-1 text-red-500">{parentState?.errors?.city}</p>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </Wizard.Page>
  );
};

BusinessFormPage.propTypes = {
  parentState: PropTypes.object
};

export default BusinessFormPage;
