import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { lang } from 'utils';
import useTranslation from 'next-translate/useTranslation';

const SimpleCard = ({ data }) => {
  const { t, lang: language } = useTranslation('common');

  return (
    <div className="flex items-center justify-between w-full p-6 space-x-6">
      <Link href="#">
        <div className="flex-1 truncate">
          <h3 className="text-sm font-medium leading-5 text-gray-900 truncate">
            {data.name.includes('{') ? (
              <div className={`${!JSON.parse(data.name)[language] && 'text-gray-400'}`}>
                {JSON.parse(data.name)[language] || t('no-name', { lang: lang[language] })}
              </div>
            ) : (
              data.name
            )}
          </h3>
        </div>
      </Link>
    </div>
  );
};

SimpleCard.propTypes = {
  data: PropTypes.object.isRequired
};

export default SimpleCard;
