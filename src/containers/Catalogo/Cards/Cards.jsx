/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from '../../../components/Card/Card';

import classes from './Cards.module.css';


import axios from '../../../axios';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/Button/Button';


import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

class Cards extends Component {
  constructor() {
    super();
    this.state = {
      pokemones: [],
      error: false,
      loading: false,
      next: null,
    };
    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true });
    axios.get('/cards?subtype=Basic')
      .then((response) => {
        const { link } = response.headers;
        let linkArray = link.split(',');
        linkArray = linkArray[1].split(';');
        let loadMoreUrl;
        if (linkArray[1] === ' rel="next"') {
          loadMoreUrl = linkArray[0].replace('<https://api.pokemontcg.io/v1/', '').replace('>', '');
        } else {
          loadMoreUrl = null;
        }
        const pokemones = response.data.cards;
        this.setState({ pokemones, loading: false, next: loadMoreUrl });
      })
      .catch(() => {
        this.setState({ error: true, loading: false });
      });
  }


  shouldComponentUpdate(nextProps) {
    // eslint-disable-next-line react/prop-types
    const { name, type } = this.props;
    // eslint-disable-next-line react/prop-types
    return ((nextProps.name !== name || nextProps.name === '') || (nextProps.type !== type || nextProps.type === 'None'));
  }

  componentDidUpdate(prevProps) {
    // eslint-disable-next-line react/prop-types
    const { name, type } = this.props;
    let separator = '?';
    let url = '/cards';
    let filters = {};
    if (name !== '') {
      filters = { ...filters, name };
    }
    if (type !== 'None') {
      filters = { ...filters, types: type };
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const k in filters) {
      if (filters[k] == null) {
        // eslint-disable-next-line no-continue
        continue;
      }
      url = `${url + separator + k}=${filters[k]}`;
      separator = '&';
    }


    // eslint-disable-next-line react/prop-types
    if (name !== prevProps.name || type !== prevProps.type) {
      axios.get(url)
        .then((response) => {
          const pokemones = response.data.cards;
          this.setState({ pokemones });
        }).catch(() => {
          this.setState({ error: true });
        });
    }
  }

  loadMore() {
    // eslint-disable-next-line react/destructuring-assignment
    axios.get(this.state.next.trim()).then((response) => {
      const { pokemones } = this.state;
      const array = pokemones.concat(response.data.cards);
      const { link } = response.headers;
      let linkArray = link.split(',');
      linkArray = linkArray.filter((el) => el.split(';')[1] === ' rel="next"');
      const loadMoreUrl = linkArray[0].replace('<https://api.pokemontcg.io/v1/', '').replace('>', '');
      this.setState({ pokemones: array, next: loadMoreUrl });
    }).catch(() => {
    });
  }

  render() {
    const {
      error,
      loading,
      pokemones,
      next,
    } = this.state;
    let cards = <Spinner />;
    if (!error && !loading) {
      cards = pokemones.map((pokemon) => {
        return (
          <Link to={`/detalle/${pokemon.id}`} key={pokemon.id}>
            <Card
              imageUrl={pokemon.imageUrl}
              name={pokemon.name}
            />
          </Link>

        );
      });
    }
    return (
      <div>
        <section className={classes.Cards}>
          {cards}
        </section>
        {next && (
          <div style={{ textAlign: 'center' }}>
            <Button clicked={this.loadMore}>Cargar más</Button>
          </div>
        ) }


      </div>
    );
  }
}

Cards.propsTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
};


export default withErrorHandler(Cards, axios);
