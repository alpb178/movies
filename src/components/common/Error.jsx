/* eslint-disable react/react-in-jsx-scope */
import useTranslation from 'next-translate/useTranslation';

const Error = () => {
  const { t } = useTranslation('common');

  return (
    <div className="flex flex-col justify-center w-full h-full px-4 mx-auto space-y-24 max-w-7xl sm:px-6 lg:py-20 lg:px-8">
      <div className="flex flex-col space-y-4">
        <p className="text-2xl font-medium tracking-wide text-primary-700">Error</p>
        <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {/* {t('error.404.label')} */}
        </h2>
        <p className="mt-2 text-lg text-gray-500">{t('error.404.content')}</p>
      </div>
      <div className="w-max">
        <a href="/" className="btn-outlined primary">
          {t('try-again')}
        </a>
      </div>
    </div>
  );
};

export default Error;
