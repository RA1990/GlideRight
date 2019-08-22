import React from 'react';
import Header from './header';
import ProductListItem from './productlistitem';
import ProductList from './productlist';

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header title="shop"/>,
        <ProductList />,
        <ProductListItem/>
      </React.Fragment>
    );
  }
}
