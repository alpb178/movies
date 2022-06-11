import Loading from '@/components/common/Loader';
import AutocompleteField from '@/components/form/AutocompleteField';
import useUsers, { saveUser } from '@/hooks/user/useUsers';
import { Field, Form, Formik } from 'formik';
import { POST, PUT, USERS_PAGE } from 'lib/constants';
import useTranslation from 'next-translate/useTranslation';
import router from 'next/router';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import BirthDateForm from './BirthDateForm';

const UsersForm = ({ userId }) => {
  const { t } = useTranslation('common');

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [status] = useState([{ id: 'PENDING' }, { id: 'ACTIVE' }, { id: 'INACTIVE' }]);

  const { data: users, isLoading: isLoadingUsers } = useUsers({
    args: { id: userId },
    options: { keepPreviousData: true, enabled: userId !== 'create' }
  });

  const validateBirthdate = (value) => {
    const currentYear = new Date().getFullYear();
    const selectYear = new Date(value).getFullYear();
    if (currentYear - selectYear >= 18) return true;
    else return false;
  };

  const validatePassword = () => {
    if (users) return false;
    else return true;
  };

  const initialValues = {
    firstName: users?.firstName || '',
    lastName: users?.lastName || '',
    email: users?.email || '',
    mobile: users?.mobile || '',
    password: users?.password || '',
    repeatPassword: '',
    birthdate: users?.birthdate || '',
    bio: users?.bio || '',
    status: { id: users?.status } || ''
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(t('required.name')),
    lastName: Yup.string().required(t('required.surname')),
    email: Yup.string().required(t('required.email')),
    mobile: Yup.string().required(t('required.phone')),
    status: Yup.object().nullable().required(t('required.status')),
    //  birthdate: Yup.date().nullable().test('birthdate', 'Fecha Invalida', validateBirthdate),
    password: Yup.string()
      .ensure()
      .when('create', {
        is: validatePassword,
        then: Yup.string()
          .oneOf([Yup.ref('repeatPassword'), null], t('required.password-compare'))
          .required(t('required.password'))
      }),
    repeatPassword: Yup.string()
      .ensure()
      .when('create', {
        is: validatePassword,
        then: Yup.string()
          .oneOf([Yup.ref('password'), null], t('required.password-compare'))
          .required(t('required.password-confirm'))
      })
  });

  const onSubmit = async (values) => {
    let usersSendApi = {};
    let method = POST;

    try {
      usersSendApi.bio = values.bio;
      usersSendApi.birthdate = values.birthdate;
      usersSendApi.email = values.email;
      usersSendApi.firstName = values.firstName;
      usersSendApi.lastName = values.lastName;
      usersSendApi.mobile = values.mobile;
      usersSendApi.status = values.status.id;
      let message = t('inserted.male', { entity: t('users', { count: 1 }) });
      if (!users) {
        usersSendApi.password = values.password;
      } else {
        method = PUT;
        usersSendApi.id = userId;
        message = t('updated.male', { entity: t('users', { count: 1 }) });
      }
      setLoading(true);
      await saveUser({
        args: usersSendApi,
        options: {
          method
        }
      });

      toast(message);
      router.push(USERS_PAGE);
    } catch (error) {
      toast.error(error.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isLoadingUsers ? (
        <Loading />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form className="p-6 space-y-6 text-lg">
              {console.log(errors)}
              <p className="mb-8 form-header">
                {isNaN(userId) ? t('form.user.title.create') : t('form.user.title.update')}
              </p>
              <div className="flex flex-col space-y-8 lg:space-y-0 lg:space-x-12 lg:flex-row">
                <div className="w-full">
                  <label htmlFor="firstName">{t('form.common.label.name')}</label>
                  <Field
                    name="firstName"
                    id="firstName"
                    placeholder={t('form.user.placeholder.firstName')}
                    className={`autocomplete-field ${
                      errors?.firstName && touched?.firstName ? 'border-red-400' : 'border-gray-300'
                    }`}
                  />
                  {errors?.firstName && touched?.firstName ? (
                    <p className="mt-4 text-red-600">{errors?.firstName}</p>
                  ) : null}
                </div>

                <div className="w-full">
                  <label htmlFor="surname">{t('surname')}</label>
                  <Field
                    name="lastName"
                    placeholder={t('form.user.placeholder.lastName')}
                    className={`autocomplete-field ${
                      errors?.lastName && touched?.lastName ? 'border-red-400' : 'border-gray-300'
                    }`}
                  />
                  {errors?.lastName && touched?.lastName ? (
                    <p className="mt-4 text-red-600">{errors?.lastName}</p>
                  ) : null}
                </div>

                <div className="w-full">
                  <label htmlFor="email">{t('email')}</label>
                  <Field
                    name="email"
                    placeholder={t('form.user.placeholder.email')}
                    className={`autocomplete-field ${
                      errors?.email && touched?.email ? 'border-red-400' : 'border-gray-300'
                    }`}
                  />
                  {errors?.email && touched?.email ? (
                    <p className="mt-4 text-red-600">{errors?.email}</p>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col space-y-8 lg:space-y-8 lg:space-x-12 lg:flex-row">
                <div className="w-full mt-8 ">
                  <label htmlFor="mobile">{t('phone')}</label>
                  <Field
                    name="mobile"
                    placeholder={t('form.user.placeholder.mobile')}
                    className={`autocomplete-field ${
                      errors?.mobile && touched?.mobile ? 'border-red-400' : 'border-gray-300'
                    }`}
                  />
                  {errors?.mobile && touched?.mobile ? (
                    <p className="mt-4 text-red-600">{errors?.mobile}</p>
                  ) : null}
                </div>

                <div className="w-full ">
                  <label htmlFor="name">{t('birthdate')}</label>
                  <BirthDateForm user={users} />
                  {errors?.birthdate && touched?.birthdate ? (
                    <p className="mt-4 text-red-600">{errors?.birthdate}</p>
                  ) : null}
                </div>

                <div className="w-full mt-8">
                  <label htmlFor="status">{t('status')}</label>
                  <AutocompleteField
                    name="status"
                    placeholder={t('form.user.placeholder.status')}
                    options={status}
                    optionLabels={['id']}
                    keysToMatch={['id']}
                    className="autocomplete-field"
                    aria-describedby="flight"
                    defaultValue={status.find((item) => item.id === users?.status)}
                  />
                </div>
              </div>
              {!isNaN(userId) || (
                <div className="flex  flex-col space-y-8 lg:space-y-8 lg:space-x-12 lg:flex-row">
                  <div className="w-full mt-8">
                    <label htmlFor="name">{t('password')}</label>
                    <div className="relative  rounded-md">
                      <Field
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        id="password"
                        className={`autocomplete-field w-full  rounded-md focus:ring-green-500 focus:border-green-500 sm:text-sm ${
                          errors.password && touched.password ? 'border-red-400' : 'border-gray-300'
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
                    {errors?.password && touched?.password ? (
                      <p className="mt-4 text-red-600">{errors?.password}</p>
                    ) : null}
                  </div>
                  <div className="w-full">
                    <label htmlFor="name">{t('repeat-password')}</label>
                    <div className="relative  rounded-md ">
                      <Field
                        type={showPassword ? 'text' : 'repeatPassword'}
                        name="repeatPassword"
                        id="repeatPassword"
                        className={`autocomplete-field w-full  rounded-md focus:ring-green-500 focus:border-green-500 sm:text-sm ${
                          errors.repeatPassword && touched.repeatPassword
                            ? 'border-red-400'
                            : 'border-gray-300'
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
                    {errors?.repeatPassword && touched?.repeatPassword ? (
                      <p className="mt-4 text-red-600">{errors?.repeatPassword}</p>
                    ) : null}
                  </div>
                </div>
              )}
              <div className="flex  flex-col space-y-8 lg:space-y-8 lg:space-x-12 lg:flex-row">
                <div className="w-full mt-5">
                  <label htmlFor="name">{t('bio')}</label>
                  <Field
                    as="textarea"
                    name="bio"
                    id="bio"
                    rows={3}
                    placeholder={t('form.user.placeholder.bio')}
                    className="text-lg text-field"
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

UsersForm.defaultProps = {
  userId: null
};

UsersForm.propTypes = {
  userId: PropTypes.string
};

export default UsersForm;
