import React from 'react';
import PropTypes from 'prop-types';

const EmptyState = ({ text }) => {
  return (
    <div className="flex items-center justify-center w-full h-full p-8 text-2xl text-gray-400">
      {text}
    </div>
  );
};

EmptyState.propTypes = {
  text: PropTypes.string
};

export default EmptyState;
