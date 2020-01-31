/* eslint-disable react/require-default-props */
import React from 'react';

import PropTypes from 'prop-types';

import classes from './Filters.module.css';

const filters = (props) => {
  const types = [
    'None',
    'Colorless',
    'Darkness',
    'Dragon',
    'Fairy',
    'Fighting',
    'Fire',
    'Grass',
    'Lightning',
    'Metal',
    'Psychic',
    'Water',


  ];

  const { changed } = props;

  return (
    <article className={classes.Filters}>
      <select onChange={changed}>
        {types.map((el) => (
          <option value={el}>{el}</option>
        ))}
      </select>
    </article>
  );
};

filters.propTypes = {
  changed: PropTypes.func,
};

export default filters;
