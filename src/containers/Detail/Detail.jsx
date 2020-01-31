/* eslint-disable linebreak-style */
import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';
import axios from '../../axios';

import classes from './Detail.module.css';

import Button from '../../components/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

class Detail extends Component {
  constructor() {
    super();
    this.state = {
      pokemon: null,
      loading: true,
    };
    this.gotBack = this.gotBack.bind(this);
  }


  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    const { match } = this.props;
    // eslint-disable-next-line react/prop-types
    axios.get(`/cards/${match.params.id}`).then((response) => {
      const pokemon = response.data.card;
      this.setState({ pokemon, loading: false });
    });

    // xios.get('/cards/+')
  }

  gotBack() {
    // eslint-disable-next-line react/prop-types
    const { history } = this.props;
    // eslint-disable-next-line react/prop-types
    history.push({
      pathname: '/catalogo',
    });
  }

  render() {
    const { loading, pokemon } = this.state;
    let detalle = <Spinner />;
    if (!loading) {
      const { imageUrl } = pokemon;
      detalle = (
        <article className={classes.Detail}>
          <div className={classes.Card}>
            <div className={classes.Image}>
              <img src={imageUrl} alt="Imagen" />
            </div>
          </div>
          <div className={classes.Content}>
            <div className={classes.Info}>
              <h1>{pokemon.name}</h1>
              {pokemon.types.map((el) => (
                // eslint-disable-next-line jsx-a11y/label-has-associated-control
                <label className={classes.Badge}>
                  {' '}
                  {el}
                </label>
              ))}

              {pokemon.attacks && (
                <>
                  <h3>Ataques: </h3>
                  <div
                    style={{
                      display: 'flex',
                      flexFlow: 'row wrap',
                      justifyContent: 'center',
                      width: '80%',
                      margin: 'auto',
                    }}
                  >
                    {pokemon.attacks.map((el) => (
                      <div
                        style={{
                          width: '160px',
                          padding: '16px',
                          textAlign: 'center',
                          borderLeft: '8px solid blue',
                          boxShadow: '0 2px 3px #ccc',
                          margin: '10px',
                          boxSizing: 'border-box',
                          cursor: 'pointer',
                        }}
                      >
                        <p>
                          Nombre:
                          {`${el.name} `}
                        </p>
                        <p>{el.cost[0]}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {pokemon.resistances && (
                <>
                  <h3 style={{ display: 'inline' }}>Resistencias: </h3>
                  <div
                    style={{
                      display: 'flex',
                      flexFlow: 'row wrap',
                      justifyContent: 'center',
                      width: '80%',
                      margin: 'auto',
                    }}
                  >
                    {pokemon.resistances.map((el) => (
                      <div
                        style={{
                          width: '160px',
                          padding: '16px',
                          textAlign: 'center',
                          borderLeft: '8px solid blue',
                          boxShadow: '0 2px 3px #ccc',
                          margin: '10px',
                          boxSizing: 'border-box',
                          cursor: 'pointer',
                        }}
                      >
                        <p>
Tipo:
                          {`${el.type} `}
                        </p>
                        <p>
Valor:
                          {el.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {pokemon.weaknesses && (
                <>
                  <h3 style={{ display: 'inline' }}>Debilidades: </h3>
                  <div
                    style={{
                      display: 'flex',
                      flexFlow: 'row wrap',
                      justifyContent: 'center',
                      width: '80%',
                      margin: 'auto',
                    }}
                  >
                    {pokemon.weaknesses
                      && pokemon.weaknesses.map((el) => (
                        <div
                          style={{
                            width: '160px',
                            padding: '16px',
                            textAlign: 'center',
                            borderLeft: '8px solid blue',
                            boxShadow: '0 2px 3px #ccc',
                            margin: '10px',
                            boxSizing: 'border-box',
                            cursor: 'pointer',
                          }}
                        >
                          <p>
Tipo:
                            {`${el.type} `}
                          </p>
                          <p>
Valor:
                            {el.value}
                          </p>
                        </div>
                      ))}
                  </div>
                </>
              )}

              <Button clicked={this.gotBack}>Volver al catálogo</Button>
            </div>
          </div>
        </article>
      );
    }
    return <div>{detalle}</div>;
  }
}

export default withRouter(Detail);
