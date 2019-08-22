import React from 'react';
import Header from './header';
import ProductList from './productlist';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        'name': 'catalog',
        params: {}
      }
    };
  }
  setView(name, params) {

  }

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
