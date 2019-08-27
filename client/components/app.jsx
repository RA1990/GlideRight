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
        params: {},
        cart: []
      }
    };
    this.setView = this.setView.bind(this);
  }
  setView(name, params) {

    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  getCartItems() {
    fetch(`/api/cart.php`)
      .then(res => res.json())
      .then(response => this.setState({ cart: response }));
  }

  render() {
    if (this.state.view.name === 'catalog') {
      return (
        <React.Fragment>
          <Header/>
          <ProductList onClick={this.setView}/>
        </React.Fragment>
      );
    }
    if (this.state.view.name === 'details') {
      return (
        <React.Fragment>
          <Header />
          <ProductDetails onClick={this.setView} params={this.state.view.params}/>
        </React.Fragment>
      );
    }
  }
}
