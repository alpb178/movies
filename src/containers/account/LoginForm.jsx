/* eslint-disable react/react-in-jsx-scope */
import { APP_NAME, BUSINESS_PAGE, DASHBOARD_PAGE, FORGOT_PASSWORD_PAGE } from '@/lib/constants';
import { lottieOptions } from '@/lib/utils';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import { Field, Form, Formik } from 'formik';
import { signIn } from 'next-auth/react';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Lottie from 'react-lottie';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const LoginForm = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const initialValues = {
    username: '',
    password: '',
    rememberMe: false
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(t('required.username')),
    password: Yup.string().required(t('required.password'))
  });

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const res = await signIn('credentials', {
        redirect: false,
        username: values.username,
        password: values.password,
        rememberMe: values.rememberMe,
        callbackUrl: DASHBOARD_PAGE
      });
      if (res.ok) router.push(DASHBOARD_PAGE);
    } catch (error) {
      let _messageErrors = '';
      if (error.response) {
        const { status } = error.response;
        switch (status) {
          case 400:
            _messageErrors = t('error.400');
            break;
          case 401:
            _messageErrors = t('error.401');
            break;
          case 500:
            _messageErrors = t('error.500');
            break;
          default:
            _messageErrors = error.toString();
            break;
        }
      }

      toast.error(_messageErrors, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex-1 w-full h-full px-8 pb-4 bg-white sm:px-4 sm:rounded-lg">
      <h3 className="text-center form-header">{t('account.access')}</h3>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ errors, touched }) => (
          <Form className="space-y-10">
            <div className="space-y-10">
              <div className="space-y-6">
                <div className="w-full">
                  <Field
                    type="text"
                    name="username"
                    id="username"
                    placeholder={t('username')}
                    className={`text-field mt-2 ${
                      errors.username && touched.username
                        ? 'border-red-400 bg-red-100'
                        : 'border-transparent filled'
                    }`}
                    aria-describedby="username"
                  />
                  {errors.username && touched.username ? (
                    <p className="mt-2 text-red-600">{errors.username}</p>
                  ) : null}
                </div>

                <div className="flex flex-col w-full">
                  <div className="relative">
                    <Field
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      id="password"
                      placeholder={t('password')}
                      className={`text-field mt-2 ${
                        errors.password && touched.password
                          ? 'border-red-400 bg-red-100'
                          : 'border-transparent filled'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pt-2 pr-3"
                    >
                      {showPassword ? (
                        <EyeOffIcon className="w-6 h-6 text-gray-400" aria-hidden="true" />
                      ) : (
                        <EyeIcon className="w-6 h-6 text-gray-400" aria-hidden="true" />
                      )}
                    </button>
                  </div>

                  {errors.password && touched.password ? (
                    <p className="mt-2 text-red-600">{errors.password}</p>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-col justify-between space-y-8 sm:space-y-0 sm:items-center sm:flex-row">
                <label htmlFor="rememberMe" className="inline-flex items-center cursor-pointer">
                  <Field
                    id="rememberMe"
                    className="w-6 h-6 transition-all duration-150 ease-linear rounded-full text-primary-600"
                    type="checkbox"
                    name="rememberMe"
                  />
                  <span className="ml-4 font-medium text-gray-700">{t('remember-me')}</span>
                </label>

                <Link href={FORGOT_PASSWORD_PAGE}>
                  <a className="font-medium text-gray-700 duration-200 ease-in-out hover:text-primary-dark hover:text-blue-500">
                    {t('forgot-password')}
                  </a>
                </Link>
              </div>

              <div className="flex justify-center pt-4">
                <button type="submit" className="relative btn-contained" disabled={loading}>
                  {t('account.login')}
                  {loading ? (
                    <div className="absolute inset-0 z-40 w-full h-full rounded-full bg-primary-100">
                      <Lottie options={lottieOptions('simple')} width={72} />
                    </div>
                  ) : null}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>

      <div className="fixed inset-x-0 bottom-0 z-50 w-full mx-auto mt-8 bg-white border-t lg:max-w-2xl lg:mt-16 lg:relative">
        <div className="relative flex flex-col items-center justify-center my-4 space-y-2 text-base md:flex-row md:text-lg md:space-y-0">
          <span className="px-2 text-gray-700">{t('account.new', { app: APP_NAME })}</span>

          <Link href={BUSINESS_PAGE}>
            <a className="inline-flex justify-center px-1 font-medium">
              <span className="text-primary-600">{t('account.create')}</span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
