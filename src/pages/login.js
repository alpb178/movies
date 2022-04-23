import LoginForm from 'containers/account/LoginForm';
import useAuth from 'hooks/auth/useAuth';
import Auth from 'layouts/Auth.js';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

const Login = () => {
  const { t } = useTranslation('common');

  useAuth({
    redirectIfFound: true,
    redirectTo: '/register'
  });

  return (
    <div className="container flex flex-col items-center justify-center w-full h-screen max-w-sm mx-auto">
      <div className="relative w-full min-w-0 break-words">
        <div className="flex flex-col items-center justify-center">
          <a href="/" className="px-4">
            <img
              className="w-20 h-auto mb-8"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
              alt="Logo"
            />
          </a>
        </div>

        <div className="flex-auto px-4 py-8 bg-white shadow sm:rounded-lg lg:px-8">
          <div className="">
            <h4 className="text-2xl font-medium text-gray-800">{t('account.access')}</h4>
            <p className="mb-8 text-gray-600">{}</p>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
};

Login.layout = Auth;

export default Login;
