import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import useTranslation from 'next-translate/useTranslation';
import useAuth from 'hooks/auth/useAuth';

const LoginForm = () => {
  const { t } = useTranslation('common');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const initialValues = {
    username: '',
    password: '',
    rememberMe: false
  };
  const { loginUser } = useAuth();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(t('required.username')),
    password: Yup.string().required(t('required.password'))
  });

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      await loginUser.mutateAsync(values);
    } catch (error) {
      let _messageErrors;
      if (error.response) {
        const { data } = error.response;
        switch (data.code) {
          case 400:
            _messageErrors = Object.values(data.errors);
            break;
          case 401:
            _messageErrors = t(data.message.replace(/ /g, '-').toLowerCase().slice(0, -1));
            break;
          case 500:
            _messageErrors = data.message;
        }
      }
      toast.error(_messageErrors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ errors, touched }) => (
        <Form className="space-y-6">
          <div className="w-full ">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              {t('username')}
            </label>
            <div className="mt-1">
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

          <div className="flex items-center justify-between my-4">
            <label htmlFor="rememberMe" className="inline-flex items-center cursor-pointer">
              <Field
                id="rememberMe"
                className="w-5 h-5 text-gray-700 transition-all duration-150 ease-linear form-checkbox"
                type="checkbox"
                name="rememberMe"
              />
              <span className="ml-2 text-sm font-medium text-gray-700">{t('remember-me')}</span>
            </label>

            <div className="text-sm">
              <a href="#" className="font-medium text-gray-700 hover:text-primary-700">
                {t('forgot-password')}
              </a>
            </div>
          </div>

          <button
            className="justify-center w-full px-4 py-3 mt-6 font-medium leading-5 text-white transition duration-300 ease-in-out rounded-md bg-primary-500 hover:bg-primary-300"
            type="submit"
          >
            {loading ? '...' : t('account.login')}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
