/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({ size }) => (
  <i
    className="fas fa-spinner fa-spin"
    style={{ fontSize: size, color: '#f18275' }}
  />
);

Loader.propTypes = {
  size: PropTypes.string
}

export default Loader;
