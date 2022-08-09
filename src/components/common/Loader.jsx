import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import Lottie from 'react-lottie';
import animationData from '/public/lottie/loading-spinner.json';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

export default function Loader({ height, width, fs = true }) {
  const { t } = useTranslation('common');

  return (
    <div
      className={clsx(
        fs ? 'absolute inset-0' : '',
        'bg-white z-50 flex items-center justify-center w-full'
      )}
    >
      <div className="flex flex-col items-center h-56 w-max">
        <Lottie options={defaultOptions} height={height} width={width} />
        <p className="text-lg font-medium text-gray-700">{t('loading')}</p>
      </div>
    </div>
  );
}

Loader.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number
};
