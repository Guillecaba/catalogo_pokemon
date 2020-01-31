/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

import Proptypes from 'prop-types';

import classes from './Backdrop.css';


const backdrop = (props) => {
  const { show, clicked } = props;
  return (
    show ? <div className={classes.Backdrop} onClick={clicked} /> : null
  );
};

backdrop.propTypes = {
  clicked: Proptypes.func,
  show: Proptypes.bool,
};

export default backdrop;
