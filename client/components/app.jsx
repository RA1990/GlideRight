import React from 'react';
import Header from './header';
import ProductListItem from './productlistitem';

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header title="shop"/>,
        <ProductListItem/>
      </React.Fragment>
    );
  }
}
