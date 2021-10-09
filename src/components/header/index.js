import React from 'react';
import PropTypes from 'prop-types';
// import { SearchBar } from 'components';
import { IconContext } from 'react-icons';
import { MdViewList as ListIcon, MdApps as GridIcon } from 'react-icons/md';
import useTranslation from 'next-translate/useTranslation';

const Header = ({ children, /*onSearch,*/ onCreate, onViewChange }) => {
  const { t } = useTranslation('common');

  return (
    <>
      <nav className="z-10 flex items-center w-full px-4 py-2 bg-white border-b border-gray-200 md:flex-row md:flex-no-wrap md:justify-start">
        <div className="flex flex-wrap items-center justify-between w-full mx-auto md:flex-no-wrap lg:px-4">
          <div className="flex flex-col items-center justify-end w-full sm:flex-row">
            {/* <SearchBar className="flex-grow w-full" handleSearch={onSearch} size="small" /> */}

            <div className="flex justify-between w-full py-2 md:w-auto">
              <div className={`${onViewChange ? 'sm:mx-4' : 'sm:ml-4'} z-40`}>{children}</div>

              {onViewChange && (
                <span className="relative z-0 inline-flex ml-0">
                  <button
                    type="button"
                    className="relative inline-flex items-center w-10 px-2 text-sm font-medium leading-5 text-gray-600 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-l-md hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-900"
                    onClick={() => onViewChange(true)}
                  >
                    <IconContext.Provider value={{ size: '2em' }}>
                      <ListIcon />
                    </IconContext.Provider>
                  </button>
                  <button
                    type="button"
                    className="relative inline-flex items-center w-10 px-2 py-1 -ml-px text-sm font-medium leading-5 text-gray-600 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-r-md hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-900"
                    onClick={() => onViewChange(false)}
                  >
                    <IconContext.Provider value={{ size: '2em' }}>
                      <GridIcon />
                    </IconContext.Provider>
                  </button>
                </span>
              )}

              {onCreate && (
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 ml-4 text-sm font-medium leading-5 text-white uppercase transition duration-300 ease-in-out border rounded-md sm:mt-0 bg-primary-500 hover:bg-white hover:text-primary focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 border-primary"
                  onClick={onCreate}
                >
                  {t('new')}
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

Header.defaultProps = {
  children: [],
  onSearch: () => {},
  onCreate: null,
  onViewChange: null
};

Header.propTypes = {
  children: PropTypes.array,
  onSearch: PropTypes.func,
  onCreate: PropTypes.func,
  onViewChange: PropTypes.func
};

export default Header;
