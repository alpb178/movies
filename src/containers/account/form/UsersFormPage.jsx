import Wizard from '@/components/form/Wizards';
import { Field } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

const UsersFormPage = ({ parentState }) => {
  const { t } = useTranslation('common');

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Wizard.Page>
      {() => (
        <div className="relative flex-1 w-full h-full px-8 pb-4 bg-white sm:px-4 sm:rounded-lg">
          <h3 className="text-center form-header">{t('form.user.title.create')}</h3>
          <div className="flex flex-col space-y-8 lg:space-y-0 lg:space-x-12 lg:flex-row">
            <div className="items-center  m-2">
              <p className="text-2xl">{t('form.common.label.name')}</p>
              <Field
                name="firstName"
                id="firstName"
                placeholder={t('form.common.placeholder.name')}
                className={`text-field text-xl mt-2 ${
                  parentState?.errors?.firstName && parentState?.touched?.firstName
                    ? 'border-red-400 bg-red-100'
                    : 'border-transparent filled'
                }`}
              />
              {parentState?.errors?.firstName && parentState?.touched?.firstName ? (
                <p className="mt-1 text-red-500">{parentState?.errors?.firstName}</p>
              ) : null}
            </div>

            <div className="flex flex-col   space-y-8 lg:space-y-0 lg:space-x-12 lg:flex-row">
              <div className="items-center m-2">
                <p className="text-2xl">{t('form.common.label.lastName')}</p>

                <Field
                  name="lastName"
                  placeholder={t('form.common.placeholder.lastName')}
                  className={`text-field text-xl mt-2 ${
                    parentState?.errors?.lastName && parentState?.touched?.lastName
                      ? 'border-red-400 bg-red-100'
                      : 'border-transparent filled'
                  }`}
                />
                {parentState?.errors?.lastName && parentState?.touched?.lastName ? (
                  <p className="mt-1 text-red-500">{parentState?.errors?.lastName}</p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="flex flex-col  mt-6 space-y-8 lg:space-y-0 lg:space-x-12 lg:flex-row">
            <div className="items-center m-2">
              <p className="text-2xl">{t('form.common.label.email')}</p>

              <Field
                name="email"
                className={`text-field text-xl mt-2 ${
                  parentState?.errors?.email && parentState?.touched?.email
                    ? 'border-red-400 bg-red-100'
                    : 'border-transparent filled'
                }`}
                placeholder={t('form.common.placeholder.email')}
              />
              {parentState?.errors?.email && parentState?.touched?.email ? (
                <p className="mt-1 text-red-500">{parentState?.errors?.email}</p>
              ) : null}
            </div>

            <div className="items-center m-2">
              <p className="text-2xl">{t('form.common.label.phone')}</p>

              <Field
                name="mobile"
                className={`text-field text-xl mt-2 ${
                  parentState?.errors?.mobile && parentState?.touched?.mobile
                    ? 'border-red-400 bg-red-100'
                    : 'border-transparent filled'
                }`}
                placeholder={t('form.common.placeholder.phone')}
              />
              {parentState?.errors?.mobile && parentState?.touched?.mobile ? (
                <p className="mt-1 text-red-500">{parentState?.errors?.mobile}</p>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col  mt-6 space-y-8 lg:space-y-0 lg:space-x-12 lg:flex-row">
            <div className="items-center mt-8  m-2">
              <p className="text-2xl">{t('form.common.label.password')}</p>

              <div className="relative  rounded-md">
                <Field
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  className={`text-field text-xl mt-2 ${
                    parentState?.errors?.password && parentState?.touched?.password
                      ? 'border-red-400 bg-red-100'
                      : 'border-transparent filled'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword ? (
                    <IoMdEye className="w-5 h-5 text-gray-400" aria-hidden="true" />
                  ) : (
                    <IoMdEyeOff className="w-5 h-5 text-gray-400" aria-hidden="true" />
                  )}
                </button>
              </div>
              {parentState?.errors?.password && parentState?.touched?.password ? (
                <p className="mt-1 text-red-500">{parentState?.errors?.password}</p>
              ) : null}
            </div>

            <div className="items-center m-2">
              <p className="text-2xl">{t('form.common.label.repeat-password')}</p>

              <div className="relative  rounded-md ">
                <Field
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  className={`text-field text-xl mt-2 ${
                    parentState?.errors?.password && parentState?.touched?.password
                      ? 'border-red-400 bg-red-100'
                      : 'border-transparent filled'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword ? (
                    <IoMdEye className="w-5 h-5 text-gray-400" aria-hidden="true" />
                  ) : (
                    <IoMdEyeOff className="w-5 h-5 text-gray-400" aria-hidden="true" />
                  )}
                </button>
              </div>
              {parentState?.errors?.password && parentState?.touched?.password ? (
                <p className="mt-1 text-red-500">{parentState?.errors?.password}</p>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </Wizard.Page>
  );
};

UsersFormPage.propTypes = {
  parentState: PropTypes.object
};

export default UsersFormPage;
