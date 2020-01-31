import React, { Component, Fragment } from "react";

import axios from "../../axios";

import classes from "./Detail.module.css";
import { withRouter } from "react-router-dom";

import Button from "../../components/Button/Button";
import Spinner from"../../components/UI/Spinner/Spinner";

class Detail extends Component {

  constructor() {
    this.state = {
      pokemon: null,
      loading: true
    };
  }
  

  componentDidMount() {
    console.log(this.props);

    console.log(this.props.match.params.id);
    //this.setState({loading:true});
    axios.get("/cards/" + this.props.match.params.id).then(response => {
      const pokemon = response.data.card;
      this.setState({ pokemon, loading: false });
      console.log(response);
    });

    //xios.get('/cards/+')
  }

  gotBack = () => {
    this.props.history.push({
      pathname: "/catalogo"
    });
  };
  render() {
    let detalle = <Spinner />;
    if (!this.state.loading) {
      const { imageUrl } = this.state.pokemon;
      detalle = (
        <article className={classes.Detail}>
          <div className={classes.Card}>
            <div className={classes.Image}>
              <img src={imageUrl} />
            </div>
          </div>
          <div className={classes.Content}>
            <div className={classes.Info}>
              <h1>{this.state.pokemon.name}</h1>
              {this.state.pokemon.types.map(el => (
                <label className={classes.Badge}> {el}</label>
              ))}

              {this.state.pokemon.attacks && (
                <Fragment>
                  <h3>Ataques: </h3>
                  <div
                    style={{
                      display: "flex",
                      flexFlow: "row wrap",
                      justifyContent: "center",
                      width: "80%",
                      margin: "auto"
                    }}
                  >
                    {this.state.pokemon.attacks.map(el => (
                      <div
                        style={{
                          width: "160px",
                          padding: "16px",
                          textAlign: "center",
                          borderLeft: "8px solid blue",
                          boxShadow: "0 2px 3px #ccc",
                          margin: "10px",
                          boxSizing: "border-box",
                          cursor: "pointer"
                        }}
                      >
                        <p>Nombre: {el.name + " "}</p>
                        <p>{el.cost[0]}</p>
                      </div>
                    ))}
                  </div>
                </Fragment>
              )}

              {this.state.pokemon.resistances && (
                <Fragment>
                  <h3 style={{ display: "inline" }}>Resistencias: </h3>
                  <div
                    style={{
                      display: "flex",
                      flexFlow: "row wrap",
                      justifyContent: "center",
                      width: "80%",
                      margin: "auto"
                    }}
                  >
                    {this.state.pokemon.resistances.map(el => (
                      <div
                        style={{
                          width: "160px",
                          padding: "16px",
                          textAlign: "center",
                          borderLeft: "8px solid blue",
                          boxShadow: "0 2px 3px #ccc",
                          margin: "10px",
                          boxSizing: "border-box",
                          cursor: "pointer"
                        }}
                      >
                        <p>Tipo: {el.type + " "}</p>
                        <p>Valor: {el.value}</p>
                      </div>
                    ))}
                  </div>
                </Fragment>
              )}

              {this.state.pokemon.weaknesses && (
                <Fragment>
                  <h3 style={{ display: "inline" }}>Debilidades: </h3>
                  <div
                    style={{
                      display: "flex",
                      flexFlow: "row wrap",
                      justifyContent: "center",
                      width: "80%",
                      margin: "auto"
                    }}
                  >
                    {this.state.pokemon.weaknesses &&
                      this.state.pokemon.weaknesses.map(el => (
                        <div
                          style={{
                            width: "160px",
                            padding: "16px",
                            textAlign: "center",
                            borderLeft: "8px solid blue",
                            boxShadow: "0 2px 3px #ccc",
                            margin: "10px",
                            boxSizing: "border-box",
                            cursor: "pointer"
                          }}
                        >
                          <p>Tipo: {el.type + " "}</p>
                          <p>Valor: {el.value}</p>
                        </div>
                      ))}
                  </div>
                </Fragment>
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
