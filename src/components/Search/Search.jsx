/* eslint-disable react/require-default-props */
import React from 'react';

import PropTypes from 'prop-types';

import classes from './Search.module.css';

const search = (props) => {
  const { changed } = props;
  return (
    <div className={classes.Search}>
      <input name="search" placeholder="Buscar por nombre" type="text" onChange={changed} />
    </div>
  );
};

search.propTypes = {
  changed: PropTypes.func,
};

export default search;
