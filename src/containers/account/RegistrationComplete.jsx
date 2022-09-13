import { APP_NAME } from '@/lib/constants';
import useTranslation from 'next-translate/useTranslation';

const RegistrationComplete = () => {
  const { t } = useTranslation('common');

  return (
    <div className="container w-full h-full max-w-2xl mx-auto mt-8 mb-4">
      <div className="space-y-4 text-center">
        <h3 className="mt-2 text-2xl font-semibold text-center text-gray-800 md:leading-normal sm:text-3xl md:text-4xl">
          {t('account.register.complete.title', { name: APP_NAME })}
        </h3>
        {/* <p className="mt-2 text-base text-center text-gray-600 md:text-lg">
          {t('account.register.complete.content')}
        </p> */}
      </div>

      {/* <div className="flex items-center justify-center w-full py-8">
        <div className="h-64 w-max">
          <Lottie options={lottieOptions('simple')} />
        </div>
      </div> */}

      <p className="mt-2 text-base text-center text-gray-600 md:text-lg">
        {t('account.register.complete.instructions')}
      </p>

      <div className="fixed inset-x-0 bottom-0 max-w-2xl mx-auto mt-8 bg-white border-t lg:relative">
        <div className="relative flex flex-col items-center justify-center my-4 space-y-2 text-base md:flex-row md:text-lg md:space-y-0">
          <span className="px-2 text-gray-700">{t('account.register.complete.no-email')}</span>

          <button
            className="inline-flex justify-center px-1 font-medium text-primary-600 hover:text-primary-800"
            onClick={() => {}}
          >
            {t('account.register.complete.resend-email')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationComplete;
