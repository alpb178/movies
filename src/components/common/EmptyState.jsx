import React from 'react';
import PropTypes from 'prop-types';

const EmptyState = ({ children, text }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8 space-y-6 text-2xl text-gray-400">
      <p>{text}</p>
      {children}
    </div>
  );
};

EmptyState.propTypes = {
  children: PropTypes.array,
  text: PropTypes.string
};

export default EmptyState;
