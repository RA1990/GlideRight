import React from 'react';
import ProductListItem from './productlistitem';

class ProductList extends React.Component {
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
    fetch('/api/products.php')
      .then(res => res.json())
      .then(res => this.setState({ products: res }));
  }

  render() {
    const products = this.state.products.map(singleProductData => {
      return (

        <ProductListItem key={singleProductData.id}
          addTocart={this.props.cartItem}
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

export default ProductList;
