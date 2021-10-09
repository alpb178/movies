import React from 'react';
import PropTypes from 'prop-types';
import { lang } from 'utils';
import useTranslation from 'next-translate/useTranslation';

const SimpleListItem = ({ data, handleClick, handleDelete }) => {
  const { t, lang: language } = useTranslation('common');

  return (
    <li className="border-t border-gray-200">
      <button
        type="button"
        onClick={handleClick}
        className="block w-full transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
      >
        <div className="flex items-center py-4 pl-2 pr-4 sm:pr-6">
          <div className="flex items-center flex-1 min-w-0">
            <div className="flex-1 min-w-0 px-4 md:grid md:grid-cols-2 md:gap-4 justify-items-start">
              {data.name.includes('{') ? (
                <div
                  className={`text-sm leading-5 font-medium truncate ${
                    !JSON.parse(data.name)[language] && 'text-gray-400'
                  }`}
                >
                  {JSON.parse(data.name)[language] || t('no-name', { lang: lang[language] })}
                </div>
              ) : (
                <div className="text-sm font-medium leading-5 truncate">{data.name}</div>
              )}
            </div>
          </div>
          <div>
            <button
              type="button"
              className="px-4 py-1 text-sm font-medium leading-5 text-red-700 border border-red-200 rounded-md hover:bg-red-400 hover:text-red-100 focus:outline-none focus:border-red-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
            >
              {t('delete')}
            </button>
          </div>
        </div>
      </button>
    </li>
  );
};

SimpleListItem.propTypes = {
  data: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default SimpleListItem;
