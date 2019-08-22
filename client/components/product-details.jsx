import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    // fetch('/api/products.php?id=1')
    //   .then(res => res.json())
    //   .then(res => this.setState({ product: res }))
    //   .then(res => console.log(this.state));
  }

  render() {

    return (
      <div className="card p-3">
        <img src={this.state.product} className="card-img-top" alt="item1" />
        <div className="card-body">
          <h5 className="card-title">{this.state.name}</h5>
          <p className="card-text"><small className="text-muted">{this.state.price}</small></p>
          <p className="card-text">{this.state.shortDescription}</p>
        </div>
      </div>
    );
  }

}

export default ProductDetails;
