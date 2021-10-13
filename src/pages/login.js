import React from 'react';
import Link from 'next/link';
import Auth from 'layouts/Auth.js';
import useTranslation from 'next-translate/useTranslation';
import useAuth from 'hooks/auth/useAuth';
import LoginForm from 'containers/account/LoginForm';

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

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-500 bg-white">{t('account.new')}</span>
              </div>
            </div>

            <div className="mt-6">
              <Link href="/register">
                <a className="inline-flex justify-center w-full px-4 py-3 font-medium text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
                  <span className="">{t('account.create')}</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.layout = Auth;

export default Login;
