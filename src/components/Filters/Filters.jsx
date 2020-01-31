import React from 'react';

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

  return (
    <article className={classes.Filters}>
      <select onChange={props.changed}>
        {types.map((el) => (
          <option value={el}>{el}</option>
        ))}
      </select>
    </article>
  );
};

export default filters;
