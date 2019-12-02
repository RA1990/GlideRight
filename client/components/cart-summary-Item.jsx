import React from 'react';

class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.getCartItems = this.getCartItems.bind(this);
    this.modifyCartCount = this.modifyCartCount.bind(this);
    this.getProduct = this.getProduct.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.state = {
      ProductId: parseInt(this.props.id),
      product: [],
      cartTotalQuantity: parseInt(this.props.count),
      price: parseInt(this.props.price),
      originalPrice: parseInt(this.props.price)
    };
  }

  getProduct() {
    let currentparam = this.props.id;
    (fetch('/api/products.php?id=' + currentparam)
      .then(res => res.json())
      .then(res => res[0])
      .then(res => this.setState({ product: res })));
  }

  componentDidMount(props) {
    this.getProduct();
  }

  deleteItem(event) {
    event.preventDefault();
    const currentparam = this.props.id;
    fetch(`/api/delete_item.php?id=` + currentparam)
      .then(res => res.json())
      .then(res => {
        this.props.cartUpdatedCallback('catalog');
      });
  }

  getCartItems() {
    fetch(`/api/cart.php`)
      .then(res => res.json())
      .then(response => this.setState({ product: response }));
  }
  modifyCartCount(countDelta) {
    let newAmount = this.state.cartTotalQuantity + countDelta;
    if (newAmount < 1 || newAmount > 9) {
      return;
    }
    this.props.addToCart(this.state.product, countDelta, 'cart');
    this.setState({
      cartTotalQuantity: newAmount,
      price: parseInt(this.state.originalPrice) * parseInt(newAmount)
    });
  }

  render() {

    return (
      <div className="container">
        <div className="card-body row ">
          <div className="col-12 col-md-3">
            <img src={this.props.image} className="card-img summaryImg" alt="item" />
          </div>
          <div className="col-6 col-md-4 short">
            <h5 className="card-title">{this.props.name}</h5>
            <div className="plus-minus-button input-group">
              <span className="input-group-btn">
                <button onClick={() => this.modifyCartCount(-1)} type="button" className="btn btn-danger btn-number" data-type="minus" data-field="quant[2]">
                  <span className="glyphicon glyphicon-minus">-</span>
                </button>
              </span>
              <input type="text" name="quant[2]" className="form-control input-number text-center" value={this.state.cartTotalQuantity} min="1" max="10" />
              <span className="input-group-btn">
                <button onClick={() => this.modifyCartCount(1)} type="button" className="btn btn-success btn-number" data-type="plus" data-field="quant[2]">
                  <span className="glyphicon glyphicon-plus">+</span>
                </button>
              </span>
            </div>
            <button onClick={() => this.deleteItem(event)} type="button" className="delete btn btn-danger" >Delete</button>
            <p className="card-text badge badge-primary">{(this.state.originalPrice * this.state.cartTotalQuantity / 100).toFixed(2)}</p>
            <p className="card-text cart-sum-text">{this.props.shortDescription}</p>
          </div>
        </div>
      </div>
    );
  }
}
export default CartSummaryItem;
