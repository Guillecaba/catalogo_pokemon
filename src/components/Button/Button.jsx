/* eslint-disable react/require-default-props */
import React from 'react';

import PropTypes from 'prop-types';

import classes from './Button.module.css';

const button = (props) => {
  const { clicked, children } = props;
  return (
    <button type="button" onClick={clicked} className={classes.Button}>{children}</button>
  );
};

button.propTypes = {
  clicked: PropTypes.func,
  children: PropTypes.node,

};


export default button;
