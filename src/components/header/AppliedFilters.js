import React from 'react';
import PropTypes from 'prop-types';

const AppliedFilters = ({ filters, parseFilterName, onRemoveFilter }) => (
  <div className="mx-4 my-2 lg:mx-4">
    {filters &&
      Object.entries(filters).map(
        (filter) =>
          filter[1] && (
            <span className="inline-flex items-center px-3 py-1 mr-2 text-sm font-medium leading-5 text-gray-700 bg-gray-200 rounded-full">
              {`${parseFilterName(filter[0]) || filter[0]}: ${filter[1]}`}
              <button
                type="button"
                className="inline-flex flex-shrink-0 m-2 mr-0 text-gray-700 focus:outline-none focus:text-gray-800"
                aria-label="Remove filter"
                onClick={() => onRemoveFilter(filter)}
              >
                <svg className="w-2 h-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                  <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                </svg>
              </button>
            </span>
          )
      )}
  </div>
);

AppliedFilters.defaultProps = {
  parseFilterName: () => {}
};

AppliedFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  parseFilterName: PropTypes.func,
  onRemoveFilter: PropTypes.func.isRequired
};

export default AppliedFilters;
