import React, { Component } from 'react';

import Search from '../../components/Search/Search';
import Filters from '../../components/Filters/Filters';
import Cards from './Cards/Cards';

import classes from './Catalogo.module.css'
import { render } from '@testing-library/react';

class Catalogo extends Component{
  state= {
    name:"",
    select:"None"
  }

  inputSelectHandler = (event) =>{
    console.log(event.target.value);
    const select = event.target.value;

    this.setState({select})

    
  }

  inputNameHandler = (event) => {
    console.log('[inputNameHandler]',event.target.value=='')
    console.log(event.target.value)
    const name = event.target.value;
    this.setState({name})
  }
  render(){
    return (
      <div style={{marginTop:'80px'}}>
      <div className={classes.Header}>
        <Filters changed={(event)=> this.inputSelectHandler(event)} />
        <Search changed={(event)=>this.inputNameHandler(event)} />
      </div>
      <Cards name={this.state.name} type={this.state.select} />
    </div>
    );
  }
}


export default Catalogo;
