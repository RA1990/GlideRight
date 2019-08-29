import React from 'react';
import Header from './header';
import ProductList from './productlist';
import ProductDetails from './product-details';
import CartSummary from './cartSummary';

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
    this.addToCart = this.addToCart.bind(this);
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

  addToCart(product) {
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    };
    fetch(`/api/cart.php`, req)
      .then(res => res.json())
      .then(countItem => {
        const allItems = this.state.cart.concat(countItem);
        this.setState({ cart: allItems });
      });
  }

  render() {

    if (this.state.view.name === 'cart') {
      return (
        <React.Fragment>
          <CartSummary cart={this.state.cart} setView={this.setView}/>
        </React.Fragment>
      );
    }
    if (this.state.view.name === 'catalog') {
      return (
        <React.Fragment>
          <Header cartItemCount={this.state.cart.length} setView={this.setView}/>
          <ProductList onClick={this.setView}/>
        </React.Fragment>
      );
    }
    if (this.state.view.name === 'details') {
      return (
        <React.Fragment>
          <Header cartItemCount={this.state.cart.length} setView={this.setView}/>
          <ProductDetails onClick={this.setView} params={this.state.view.params} cartItem={this.addToCart}/>
        </React.Fragment>
      );
    }
  }
}
