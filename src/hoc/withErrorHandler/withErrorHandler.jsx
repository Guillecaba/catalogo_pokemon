/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';


const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        error: null,
      };

      this.reqInterceptor = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      this.resIncerceptor = axios.interceptors.response.use((res) => res, (error) => {
        this.setState({ error });
      });
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resIncerceptor);
    }

    errorConfirmedHandler() {
      this.setState({ error: null });
    }

    render() {
      const { error } = this.state;
      return (
        <>
          <Modal show={error} modalClosed={this.errorConfirmedHandler}>
            {error ? error.message : null}
          </Modal>

          <WrappedComponent {...this.props} />
        </>
      );
    }
  };
};

export default withErrorHandler;
