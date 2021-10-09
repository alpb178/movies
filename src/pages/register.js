import React from 'react';
import Link from 'next/link';
import Auth from 'layouts/Auth.js';
import useTranslation from 'next-translate/useTranslation';
import useAuth from 'hooks/auth/useAuth';
import RegisterForm from 'containers/account/RegisterForm';

const Register = () => {
  const { t } = useTranslation('common');
  useAuth({
    redirectIfFound: true
  });

  return (
    <>
      <div className="container flex flex-col items-center justify-center w-full h-full pt-4 mx-auto lg:w-1/3 lg:pb-6">
        <div className="relative flex flex-col w-full min-w-0 break-words">
          <div className="flex flex-col items-center justify-center">
            <Link href="/">
              <a className="px-4">
                <img className="w-full h-auto mb-8" src="logo/backpackpool.svg" alt="Logo" />
              </a>
            </Link>
          </div>

          <div className="flex-auto px-4 py-8 bg-white border-t shadow-md lg:border-0 sm:rounded-lg lg:px-8">
            <div className="">
              <h4 className="text-2xl font-medium text-gray-800">{t('account.create')}</h4>
              <p className="mb-8 text-gray-600">{}</p>
            </div>

            <RegisterForm />

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 text-gray-500 bg-white">{t('account.already')}</span>
                </div>
              </div>

              <div className="mt-6">
                <Link href="/login">
                  <a className="inline-flex justify-center w-full px-4 py-3 font-medium text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
                    <span className="">{t('account.login')}</span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Register.layout = Auth;

export default Register;
