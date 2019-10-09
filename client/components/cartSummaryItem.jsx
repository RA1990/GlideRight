import React from 'react';

class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartTotalQuantity: props.count
    };

    this.subQuantityOfProduct = this.subQuantityOfProduct.bind(this);
    this.plusQuantityOfProduct = this.plusQuantityOfProduct.bind(this);
  }
  addToCart(product, count) {
    const addToCart = [];
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product: product,
        count: count
      })
    };
    addToCart.push(fetch(`/api/checkout_add.php`, req)
      .then(req => req.json()));
    Promise.allSettled(addToCart).then(this.getCartItems);
  }
  plusQuantityOfProduct() {
    if (this.state.cartQuantity < 0 || this.state.cartTotalQuantity === 10) {
      return;
    }

    this.setState({ cartTotalQuantity: parseInt(this.state.cartTotalQuantity) + 1 });
  }
  subQuantityOfProduct() {
    if (this.state.cartTotalQuantity <= 1) {
      return 'g';
    }
    return 'h';
  }
  render() {

    return (
      <div className="container border">
        <div className="card-body row ">
          <div className="col-12 col-md-3">
            <img src={this.props.image} className="card-img summaryImg" alt="item" />
          </div>
          <div className="col-6 col-md-4 short">
            <h5 className="card-title">{this.props.name}</h5>
            <div className="input-group">
              <span className="input-group-btn">
                <button onClick={this.subQuantityOfProduct} type="button" className="btn btn-danger btn-number" data-type="minus" data-field="quant[2]">
                  <span className="glyphicon glyphicon-minus">-</span>
                </button>
              </span>
              <input type="text" name="quant[2]" className="form-control input-number" value={this.state.cartTotalQuantity} min="1" max="10" />
              <span className="input-group-btn">
                <button onClick={this.plusQuantityOfProduct} type="button" className="btn btn-success btn-number" data-type="plus" data-field="quant[2]">
                  <span onClick={() => this.props.addToCart(this.state.product, this.state.cartTotalQuantity)} className="glyphicon glyphicon-plus">+</span>
                </button>
              </span>
            </div>
            <p className="card-text badge badge-primary">{(this.props.price / 100).toFixed(2)}</p>
            <p className="card-text">{this.props.shortDescription}</p>
          </div>
        </div>
      </div>
    );
  }
}
export default CartSummaryItem;
