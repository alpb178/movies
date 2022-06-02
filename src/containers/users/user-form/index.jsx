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

  const validationSchema = Yup.object().shape({
    /* username: Yup.string().required(t('required.username')),
    name: Yup.string().required(t('required.name')),
    surname: Yup.string().required(t('required.surname')),
    password: Yup.string().required(t('required.password')),
    email: Yup.string().required(t('required.email')),
    phone: Yup.string().required(t('required.phone'))*/
  });

  const { data: users, isLoading: isLoadingUsers } = useUsers({
    args: { id: userId },
    options: { keepPreviousData: true, enabled: userId !== 'create' }
  });

  const onSubmit = async (values) => {
    delete values['repeat-password'];
    values.status = values.status.id;
    let method = POST;

    let message = t('inserted.male', { entity: t('users', { count: 1 }) });
    if (users) {
      method = PUT;
      values.id = userId;
      delete values['password'];
      message = t('updated.male', { entity: t('users', { count: 1 }) });
    }
    try {
      setLoading(true);

      await saveUser({
        args: values,
        options: {
          method
        }
      });

      await toast(message);
      router.push(USERS_PAGE);
    } catch (error) {
      toast.error(error.toString());
    } finally {
      setLoading(false);
    }
  };

  const initialValues = {
    firstName: users?.firstName || '',
    lastName: users?.lastName || '',
    email: users?.email || '',
    mobile: users?.mobile || '',
    password: users?.password || '',
    birthdate: users?.birthdate || '',
    bio: users?.bio || '',
    status: users?.status || ''
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
              <p className="mb-8 form-header">
                {isNaN(userId) ? t('form.user.title.create') : t('form.user.title.update')}
              </p>

              <div className="flex flex-col space-y-8 lg:space-y-0 lg:space-x-12 lg:flex-row">
                <div className="w-full">
                  <label htmlFor="name">{t('form.common.label.name')}</label>
                  <Field
                    name="firstName"
                    id="firstName"
                    placeholder={t('form.user.placeholder.firstName')}
                    className="autocomplete-field"
                  />
                </div>

                <div className="w-full">
                  <label htmlFor="name">{t('surname')}</label>
                  <Field
                    name="lastName"
                    placeholder={t('form.user.placeholder.lastName')}
                    defaultValue={users?.lastName}
                    className="autocomplete-field"
                  />
                </div>

                <div className="w-full">
                  <label htmlFor="name">{t('email')}</label>
                  <Field
                    name="email"
                    placeholder={t('form.user.placeholder.email')}
                    className="autocomplete-field"
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-8 lg:space-y-8 lg:space-x-12 lg:flex-row">
                <div className="w-full mt-8 ">
                  <label htmlFor="name">{t('phone')}</label>
                  <Field
                    label="mobile"
                    name="mobile"
                    placeholder={t('form.user.placeholder.mobile')}
                    className="autocomplete-field"
                  />
                </div>

                <div className="w-full ">
                  <label htmlFor="name">{t('birthdate')}</label>
                  <BirthDateForm user={users} />
                </div>

                <div className="w-full mt-8">
                  <label htmlFor="name">{t('status')}</label>
                  <AutocompleteField
                    name="status"
                    placeholder={t('form.user.placeholder.status')}
                    options={status}
                    optionLabels={['id']}
                    keysToMatch={['id']}
                    className="w-full p-4 py-3 border border-l-0 rounded-r-md"
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
                        className={`block w-full  rounded-md focus:ring-green-500 focus:border-green-500 sm:text-sm ${
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
                  </div>
                  <div className="w-full">
                    <label htmlFor="name">{t('repeat-password')}</label>
                    <div className="relative  rounded-md ">
                      <Field
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        id="password"
                        className={`block w-full  rounded-md focus:ring-green-500 focus:border-green-500 sm:text-sm ${
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
