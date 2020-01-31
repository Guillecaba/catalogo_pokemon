/* eslint-disable react/require-default-props */
import React from 'react';

import PropTypes from 'prop-types';


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

card.propTypes = {
  imageUrl: PropTypes.string,
  name: PropTypes.string,
};


export default card;
