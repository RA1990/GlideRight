import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    fetch('/api/products.php?id=1')
      .then(res => res.json())
      .then(res => this.setState({ product: res }));
  }

  render() {

    return (
      <div className="card p-3">
        <img src={this.state.product.image} className="card-img-top" alt="item1" />
        <div className="card-body">
          <h5 className="card-title">{this.state.product.name}</h5>
          <p className="card-text"><small className="text-muted">{this.state.product.price}</small></p>
          <p className="card-text">{this.state.product.shortDescription}</p>
        </div>
      </div>
    );

  }

}

export default ProductDetails;
