import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount(props) {

    fetch('/api/products.php?id=1')
      .then(res => res.json())
      .then(res => this.setState({ product: res }));
  }

  render() {

    const product = this.state.product;
    if (this.state.product != null) {

      return (
        <div key={product.id} className="card p-3">
          <img src={product.image} className="card-img-top" alt="item1" />
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text"><small className="text-muted">{product.price}</small></p>
            <p className="card-text">{product.shortDescription}</p>
          </div>
        </div>
      );

    }
    return null;
  }

}

export default ProductDetails;
