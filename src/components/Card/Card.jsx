import React from 'react';

import classes from './Card.module.css';

const card = (props) => {
  const { imageUrl, name } = props;
  return (
    <article className={classes.Card}>
      <img src={imageUrl} alt="imagen de pokemon" />
      <h1>{name}</h1>
    </article>
  );
};


export default card;
