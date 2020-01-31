import React from 'react';

import classes from './Search.module.css';

const search = (props) => {
  return (
    <div className={classes.Search}>
      <input name="search" placeholder="Buscar por nombre" type="text" onChange={props.changed} />
    </div>
  );
};

export default search;
