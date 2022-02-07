import { Field, Form, Formik } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { connect } from 'react-redux';
import { createUser } from 'redux/actions';
import * as Yup from 'yup';

const RegisterForm = ({ onCreateUser }) => {
  const { t } = useTranslation('common');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const initialValues = {
    name: '',
    surname: '',
    username: '',
    password: '',
    email: '',
    phone: '',
    rols: ['Cliente Básico']
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(t('required.username')),
    password: Yup.string().required(t('required.password')),
    email: Yup.string().required(t('required.email')),
    phone: Yup.string().required(t('required.phone'))
  });

  const onSubmit = (values) => {
    try {
      setLoading(true);
      delete values['repeat-password'];
      onCreateUser(values);
    } catch (error) {
      // let _messageErrors = [trans.unknownUserErrorMsg];
      // if (error.response) {
      //   const { data, status } = error.response;
      //   switch (status) {
      //     case 400:
      //       _messageErrors = Object.values(data.errors);
      //       break;
      //     case 401:
      //       _messageErrors = [data.title];
      //       break;
      //     case 500:
      //       _messageErrors = [data.title];
      //   }
      // }
      // setErrorMessages(_messageErrors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ errors, touched }) => (
        <Form className="space-y-6">
          <div className="flex flex-col space-y-6 sm:space-y-0 sm:space-x-4 sm:flex-row">
            <div className="w-full ">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                {t('name')}
              </label>
              <div className="mt-1">
                <Field
                  type="text"
                  name="name"
                  id="name"
                  className={`block w-full rounded-md focus:ring-green-500 focus:border-green-500 sm:text-sm ${
                    errors.name && touched.name ? 'border-red-400' : 'border-gray-300'
                  }`}
                  aria-describedby="name"
                />
                {errors.name && touched.name ? (
                  <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                ) : null}
              </div>
            </div>

            <div className="w-full">
              <label htmlFor="surname" className="block text-sm font-medium text-gray-700">
                {t('surname')}
              </label>
              <div className="mt-1">
                <Field
                  type="text"
                  name="surname"
                  id="surname"
                  className={`block w-full rounded-md focus:ring-green-500 focus:border-green-500 sm:text-sm ${
                    errors.surname && touched.surname ? 'border-red-400' : 'border-gray-300'
                  }`}
                  aria-describedby="surname"
                />
                {errors.surname && touched.surname ? (
                  <p className="mt-2 text-sm text-red-600">{errors.surname}</p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="w-full sm:w-1/2">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              {t('username')}
            </label>
            <div className="mt-1 mr-2">
              <Field
                type="text"
                name="username"
                id="username"
                className={`block w-full rounded-md focus:ring-green-500 focus:border-green-500 sm:text-sm ${
                  errors.username && touched.username ? 'border-red-400' : 'border-gray-300'
                }`}
                aria-describedby="username"
              />
              {errors.username && touched.username ? (
                <p className="mt-2 text-sm text-red-600">{errors.username}</p>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col space-y-6 sm:space-y-0 sm:space-x-4 sm:flex-row">
            <div className="w-full">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t('email')}
              </label>
              <div className="mt-1">
                <Field
                  type="text"
                  name="email"
                  id="email"
                  className={`block w-full rounded-md focus:ring-green-500 focus:border-green-500 sm:text-sm ${
                    errors.email && touched.email ? 'border-red-400' : 'border-gray-300'
                  }`}
                  aria-describedby="email"
                />
                {errors.email && touched.email ? (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                ) : null}
              </div>
            </div>

            <div className="w-full">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                {t('phone')}
              </label>
              <div className="mt-1">
                <Field
                  type="text"
                  name="phone"
                  id="phone"
                  className={`block w-full rounded-md focus:ring-green-500 focus:border-green-500 sm:text-sm ${
                    errors.phone && touched.phone ? 'border-red-400' : 'border-gray-300'
                  }`}
                  aria-describedby="phone"
                />
                {errors.phone && touched.phone ? (
                  <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-6 sm:space-y-0 sm:space-x-4 sm:flex-row">
            <div className="flex flex-col w-full">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {t('password')}
              </label>
              <div className="relative mt-1 rounded-md">
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
              {errors.password && touched.password ? (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              ) : null}
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {t('repeat-password')}
              </label>
              <div className="relative mt-1 rounded-md">
                <Field
                  type={showPassword ? 'text' : 'password'}
                  id="repeat-password"
                  name="repeat-password"
                  className={`block w-full  rounded-md focus:ring-green-500 focus:border-green-500 sm:text-sm ${
                    errors.password && touched.password ? 'border-red-400' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.password && touched.password ? (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              ) : null}
            </div>
          </div>

          <button
            type="submit"
            className="justify-center w-full px-4 py-3 mt-6 font-medium leading-5 text-white transition duration-300 ease-in-out rounded-md bg-primary-500 hover:bg-primary-300"
          >
            {loading ? '...' : t('account.create')}
          </button>
        </Form>
      )}
    </Formik>
  );
};

RegisterForm.propTypes = {
  onCreateUser: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  onCreateUser: (user) => dispatch(createUser(user))
});

export default connect(null, mapDispatchToProps)(RegisterForm);
