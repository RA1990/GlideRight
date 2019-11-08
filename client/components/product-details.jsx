import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      cartQuantity: 1,
      price: 0,
      originalPrice: 0
    };
    this.minusQuantityOfProduct = this.minusQuantityOfProduct.bind(this);
    this.addQuantityOfProduct = this.addQuantityOfProduct.bind(this);
  }

  componentDidMount(props) {
    const currentparam = this.props.id;
    fetch('/api/products.php?id=' + currentparam)
      .then(res => res.json())
      .then(res => res[0])
      .then(res => {
        this.setState({
          product: res,
          price: res.price,
          originalPrice: res.price
        });
      });
  }
  addQuantityOfProduct() {
    if (this.state.cartQuantity < 1 || this.state.cartQuantity === 10) {
      return undefined;
    } else {
      this.setState({
        cartQuantity: this.state.cartQuantity += 1,
        price: parseInt(this.state.originalPrice) * parseInt(this.state.cartQuantity)
      });
    }
  }
  minusQuantityOfProduct() {
    if (this.state.cartQuantity <= 1) {
      return undefined;
    }
    this.setState({
      cartQuantity: this.state.cartQuantity -= 1,
      price: parseInt(this.state.product.price) * parseInt(this.state.cartQuantity)
    });
  }

  render() {
    const firstProduct = this.state.product;
    if (this.state.product != null) {
      return (
        <div className="container mod">
          <div className="card p-5 marginForModel" key={firstProduct.id}>
            <div><button className="btn btn-primary btc" onClick={() => this.props.click()}>
              &#60;  Back to Catalog
            </button></div>

            <div className="row">
              <div className="col-12 col-md-8 p2"><img className="prodet"src={firstProduct.image} /></div>
              <div className="col-6 col-md-4"><h5 className="productName">{firstProduct.name}</h5>
                <div className="input-group inputWidth">
                  <span className="input-group-btn">
                    <button onClick={this.minusQuantityOfProduct} type="button" className="btn btn-danger btn-number" data-type="minus" data-field="quant[2]">
                      <span className="glyphicon glyphicon-minus">-</span>
                    </button>
                  </span>
                  <input type="text" name="quant[2]" className="form-control input-number text-center" value={this.state.cartQuantity} min="1" max="10"/>
                  <span className="input-group-btn">
                    <button onClick={this.addQuantityOfProduct} type="button" className="btn btn-success btn-number" data-type="plus" data-field="quant[2]">
                      <span className="glyphicon glyphicon-plus">+</span>
                    </button>
                  </span>
                </div>
                <p className="card-text shortText">{firstProduct.shortDescription}</p>
                <h4 className="card-text badge badge-pill badge-primary">${(this.state.price / 100).toFixed(2)}</h4>
                <br/>
                <button className="addCart" onClick={() => { this.props.add(this.state.product, this.state.cartQuantity); this.props.click(); } } >Add to Cart</button>
              </div>
            </div>
            <p className="card-text mt-4 longText">{firstProduct.longDescription}</p>
          </div>
        </div>
      );
    }
    return null;
  }

}

export default ProductDetails;
