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
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  render() {
    if (this.state.view.name === 'catalog' || this.state.view.name === 'details') {
      return (
        <React.Fragment>
          <Header/>
          <ProductList setView={this.setView} viewParams={this.state.view.params}/>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Header />
        <ProductDetails />
      </React.Fragment>
    );
  }
}
