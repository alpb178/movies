import React from 'react';
import PropTypes from 'prop-types';

const Clean = ({ children }) => <>{children}</>;

Clean.defaultProps = {
  children: []
};

Clean.propTypes = {
  children: PropTypes.node
};

export default Clean;
