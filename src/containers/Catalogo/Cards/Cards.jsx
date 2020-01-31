import React, { Component } from 'react';

import Card from '../../../components/Card/Card';
import {Link} from 'react-router-dom';

import classes from './Cards.module.css';

import axios from '../../../axios';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/Button/Button';

class Cards extends Component {
  state = {
    pokemones:[],
    error:false,
    loading:false,
    next:null
  }
  componentDidMount() {
    this.setState({loading:true})
      axios.get('/cards?subtype=Basic')
      .then((response) => {
        console.log(response);
        let link = response.headers.link;
        let linkArray = link.split(',')
        linkArray = linkArray[1].split(';')
        console.log(linkArray)
        let loadMoreUrl;
        if( linkArray[1] ==' rel="next"'){
          loadMoreUrl = linkArray[0].replace('<https://api.pokemontcg.io/v1/','').replace('>','');
          console.log(loadMoreUrl)
         
        }else{
          loadMoreUrl = null;
        }    
        const pokemones = response.data.cards
        console.log(pokemones);
        
        this.setState({pokemones,loading:false,next:loadMoreUrl})
      })
      .catch((error) => {
        this.setState({error:true,loading:false});
      });
      
    }

    loadMore = () => {
      axios.get(this.state.next.trim()).then((response) => {
        const pokemones =this.state.pokemones;
        const array = pokemones.concat(response.data.cards);
        console.log(array)
        let link = response.headers.link;
        let linkArray = link.split(',')
        linkArray = linkArray.filter(el=> el.split(';')[1] ==' rel="next"')
        console.log(linkArray)
        let loadMoreUrl;
        loadMoreUrl = linkArray[0].replace('<https://api.pokemontcg.io/v1/','').replace('>','');
        console.log(loadMoreUrl)
         


        this.setState({pokemones:array,next:loadMoreUrl})        
        
        console.log(pokemones);
    
      }).catch((error)=>{
        console.log('error');
        
      })
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
        {this.state.next &&(
          <div style={{textAlign:'center'}}>
          <Button clicked = {this.loadMore}>Cargar más</Button>
        </div>
        ) }
        
       
        
      </div>
    );
  }
}
export default Cards;
