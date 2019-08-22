import React from 'react';
import Header from './header';
import ProductList from './productlist';
import ProductDetails from './product-details';

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header/>
        <ProductDetails/>
        <ProductList />
      </React.Fragment>
    );
  }
}
