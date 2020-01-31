/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import Search from '../../components/Search/Search';
import Filters from '../../components/Filters/Filters';
import Cards from './Cards/Cards';

import classes from './Catalogo.module.css';

class Catalogo extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      select: 'None',
    };
  }


  inputSelectHandler(event) {
    const select = event.target.value;

    this.setState({ select });
  }

  inputNameHandler(event) {
    const name = event.target.value;
    this.setState({ name });
  }

  render() {
    const { name, select } = this.state;
    return (
      <div style={{ marginTop: '80px' }}>
        <div className={classes.Header}>
          <Filters changed={(event) => this.inputSelectHandler(event)} />
          <Search changed={(event) => this.inputNameHandler(event)} />
        </div>
        <Cards name={name} type={select} />
      </div>
    );
  }
}


export default Catalogo;
