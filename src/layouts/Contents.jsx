import React, { Component, Fragment } from 'react';
import Router from '../router/Router';

class Contents extends Component {
  render() {
    return <Fragment>{Router.genRouter()}</Fragment>;
  }
}
Contents.propTypes = {};
Contents.defaultProps = {
  isShop: false,
};
export default Contents;
