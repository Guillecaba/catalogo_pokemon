import React, { Component } from 'react';

import Card from '../../../components/Card/Card';
import {Link} from 'react-router-dom';

import classes from './Cards.module.css';

import axios from '../../../axios';
import Spinner from '../../../components/UI/Spinner/Spinner';

class Cards extends Component {
  state = {
    pokemones:[],
    error:false,
    loading:false,
  }
  componentDidMount() {
    this.setState({loading:true})
    
    
   /*  if ( this.props.name != ""){
      axios.get('/cards?name='+this.props.name)
        .then((response)=> {
          const pokemones = response.data.cards
          console.log(pokemones);
        
          this.setState({pokemones,loading:false})
        }).catch((error)=>{
          this.setState({error:true,loading:false});
        })
    }else { */
      axios.get('/cards?subtype=Basic')
      .then((response) => {
        console.log(response);
        
        const pokemones = response.data.cards
        console.log(pokemones);
        
        this.setState({pokemones,loading:false})
      })
      .catch((error) => {
        this.setState({error:true,loading:false});
      });
      
    }

    shouldComponentUpdate(nextProps) {
      return ((nextProps.name != this.props.name || nextProps.name == "" ) || (nextProps.type != this.props.type || nextProps.type == "None"));
    }

    componentDidUpdate(prevProps) {
      console.log('[componentDidUpdate]: ',this.props.type)

      let separator ="?";

      let url = '/cards'

      let filters = {};

      if(this.props.name !="") {
        filters = {...filters,name:this.props.name}
      }
      if(this.props.type!="None" ){
        filters = {...filters,types:this.props.type}
      }

      for (let k in filters) {
        if (filters[k] ==null){
          continue
        }
        url = url + separator + k + "=" + filters[k]
        separator = "&"
      }

     
      if(this.props.name != prevProps.name || this.props.type != prevProps.type)
        axios.get(url)
          .then((response)=> {
            const pokemones = response.data.cards
            console.log(pokemones);
            this.setState({pokemones})
          
            
          }).catch((error)=>{
            this.setState({error:true});
          })
      
    }
  render() {
    let cards = <Spinner />
    if ( !this.state.error && !this.state.loading ) {
      cards = this.state.pokemones.map( pokemon => {
        return(
          <Link to={'/detalle/'+pokemon.id} key={pokemon.id}  >
           <Card 
              imageUrl={pokemon.imageUrl}
              name={pokemon.name}
            />
          </Link>
          
        )
      })
    }
    return (
      <div>
        <section className={classes.Cards}>
          {cards}
        </section>
        
      </div>
    );
  }
}
export default Cards;
