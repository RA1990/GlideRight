import React from 'react';
import SwagListItem from './swaglistitem';

class SwagList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    this.getProduct();
  }

  getProduct() {
    fetch('/api/swaglist.php')
      .then(res => res.json())
      .then(res => this.setState({ products: res }));
  }

  render() {
    const products = this.state.products.map(singleProductData => {
      return (

        <SwagListItem key={singleProductData.id}
          id={singleProductData.id}
          onClick={this.props.onClick}
          name={singleProductData.name}
          price={singleProductData.price}
          image={singleProductData.image}
          shortDescription={singleProductData.shortDescription}
        />

      );

    });

    return (
      <div className="container">
        <div className="row imagerow">
          {products}
        </div>
      </div>

    );
  }

}

export default SwagList;
