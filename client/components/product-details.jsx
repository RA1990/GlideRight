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

    const firstProduct = this.state.product;
    if (this.state.product != null) {
      return (
        <div className="container">
          <div className="card p-5" key={firstProduct.id}>
            <div><button onClick={() => this.props.onClick('catalog', {})}>
              {'<'}  Back to Catalog
            </button></div>

            <div className="row">
              <div className="col-12 col-md-8"><img src={firstProduct.image} /></div>
              <div className="col-6 col-md-4"><h5>{firstProduct.name}</h5>
                <p className="card-text">{firstProduct.shortDescription}</p>
                <h4 className="card-text badge badge-pill badge-primary">${(firstProduct.price / 100).toFixed(2)}</h4>
                <br/>
                <button className="addCart" onClick={() => { this.props.cartItem(this.state.product); } }>Add to Cart</button>
              </div>

            </div>
            <p className="card-text mt-4">{firstProduct.longDescription}</p>
          </div>
        </div>
      );
    }
    return null;
  }

}

export default ProductDetails;
