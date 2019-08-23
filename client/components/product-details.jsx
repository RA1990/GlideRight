import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount(props) {
    const currentparam = this.props.params.id;
    fetch('/api/products.php?id=' + currentparam)
      .then(res => res.json())
      .then(res => this.setState({ product: res }));
  }

  render() {

    const product = this.state.product;
    if (this.state.product != null) {

      return (
        <React.Fragment>
          <a href="">back to catlog</a>
          <div key={product.id} className="card p-3">
            <img src={product.image} className="card-img-top" alt="item1" />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{product.shortDescription}</p>
              <p className="card-text"><span className="badge badge-primary">${(product.price / 100).toFixed(2)}</span></p>
            </div>
          </div>
        </React.Fragment>
      );

    }
    return null;
  }

}

export default ProductDetails;
