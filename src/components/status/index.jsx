const { default: clsx } = require('clsx');
const { default: useTranslation } = require('next-translate/useTranslation');

const Status = ({ data, className }) => {
  const { t } = useTranslation('common');

  const colorize = () => {
    switch (data) {
      case 'OPEN':
        return 'bg-green-100 text-green-700';
      case 'CLOSE':
        return 'bg-red-100 text-red-700';
    }
  };
  return (
    <div className={clsx(colorize(), className ? className : 'rounded-full px-4 p-1 text-sm')}>
      {t(`form.common.status.${data.toLowerCase()}`)}
    </div>
  );
};

export default Status;
