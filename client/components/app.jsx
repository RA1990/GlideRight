import React from 'react';
import Header from './header';
import ProductList from './productlist';
import ProductDetails from './product-details';
import CartSummary from './cartSummary';
import CheckoutForm from './checkoutForm';
import Jumbo from './jumbotron';
import Footer from './footer';
import AccessoriesList from './accessorieslist';
import AccessoriesDetails from './accessories-details';
import SwagList from './swaglist';
import SwagDetails from './swag-details';
import JumboAccessories from './accessjumbo';
import JumboSwag from './swagjumbo';

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

  placeOrder(userOrderInfo) {

    const userOrder = {
      'name': userOrderInfo.customerName,
      'creditCard': userOrderInfo.creditCardInfo,
      'shippingAddress': userOrderInfo.shippingAddressInfo,
      'cart': this.state.cart
    };

    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userOrder)
    };

    fetch('/api/orders.php', req)
      .then(res => res.json())
      .then(orderItem => {
        this.setState({ cart: [] });
        this.setState({ name: 'catalog', params: {} });
      });
  }

  render() {
    if (this.state.view.name === 'accessdetails') {
      return (
        <React.Fragment>
          <Header cartItemCount={this.state.cart.length} setView={this.setView} />
          <AccessoriesDetails onClick={this.setView} params={this.state.view.params} cartItem={this.addToCart} />
        </React.Fragment>
      );
    }
    if (this.state.view.name === 'swagdetails') {
      return (
        <React.Fragment>
          <Header cartItemCount={this.state.cart.length} setView={this.setView} />
          <SwagDetails onClick={this.setView} params={this.state.view.params} cartItem={this.addToCart} />
        </React.Fragment>
      );
    }
    if (this.state.view.name === 'swag') {
      return (
        <React.Fragment>
          <Header cartItemCount={this.state.cart.length} setView={this.setView} />
          <JumboSwag />
          <SwagList onClick={this.setView} />
          <Footer />
        </React.Fragment>
      );
    }
    if (this.state.view.name === 'accessories') {
      return (
        <React.Fragment>
          <Header cartItemCount={this.state.cart.length} setView={this.setView} />
          <JumboAccessories />
          <AccessoriesList onClick={this.setView}/>
          <Footer />
        </React.Fragment>
      );
    }
    if (this.state.view.name === 'checkout') {
      return (
        <div>
          <Header cartItemCount={this.state.cart.length} setView={this.setView} />
          <CheckoutForm userPaymentInfo={this.placeOrder} setView={this.setView} allItems={this.state.cart} />
          <Footer/>
        </div>
      );
    }
    if (this.state.view.name === 'cart') {
      return (
        <React.Fragment>
          <Header cartItemCount={this.state.cart.length} setView={this.setView} />
          <CartSummary cart={this.state.cart} setView={this.setView}/>
          <Footer />
        </React.Fragment>
      );
    }
    if (this.state.view.name === 'catalog') {
      return (
        <React.Fragment>
          <Header cartItemCount={this.state.cart.length} setView={this.setView}/>
          <Jumbo/>
          <ProductList onClick={this.setView}/>
          <Footer/>
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
