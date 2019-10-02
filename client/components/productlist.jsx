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
        <div className="round" key={singleProductData.id}>
          <ProductListItem
            id={singleProductData.id}
            onClick={this.props.onClick}
            name={singleProductData.name}
            price={singleProductData.price}
            image={singleProductData.image}
            shortDescription={singleProductData.shortDescription}
          />
        </div>

      );

    });

    return (
      <div className="container">
        <div className="d-inline-flex flex-wrap justify-content-center pb-2">
          {products}
        </div>
      </div>

    );
  }

}

export default ProductList;
