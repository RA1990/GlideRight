import React from 'react';
import Header from './header';
import ProductList from './productlist';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      view: {
        'name': 'catalog',
        params: {}
      }
    };
    this.setView = this.setView.bind(this);
  }
  componentDidMount() {
    this.getCartItems();
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
          <Header cartItemCount={this.state.cart.length}/>
          <ProductList onClick={this.setView}/>
        </React.Fragment>
      );
    }
    if (this.state.view.name === 'details') {
      return (
        <React.Fragment>
          <Header cartItemCount={this.state.cart.length}/>
          <ProductDetails onClick={this.setView} params={this.state.view.params}/>
        </React.Fragment>
      );
    }
  }
}
