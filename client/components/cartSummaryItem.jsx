import React from 'react';

class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: parseInt(this.props.id),
      product: [],
      cartTotalQuantity: parseInt(this.props.count),
      price: parseInt(this.props.price),
      originalPrice: parseInt(this.props.price)
    };

    this.subQuantityOfProduct = this.subQuantityOfProduct.bind(this);
    this.plusQuantityOfProduct = this.plusQuantityOfProduct.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.subFromCart = this.subFromCart.bind(this);
    this.addCart = this.addCart.bind(this);
    this.getProduct = this.getProduct.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  getProduct() {
    let currentparam = this.props.id;
    (fetch('/api/products.php?id=' + currentparam)
      .then(res => res.json())
      .then(res => res[0])
      .then(res => this.setState({ product: res })));
    setTimeout(
      function () {
        this.getCartItems();
      }
        .bind(this),
      990000
    );

  }

  componentDidMount(props) {
    this.getProduct();
  }

  deleteItem(event) {
    event.preventDefault();
    let newcart = null;
    const currentparam = this.props.id;
    fetch(`/api/deleteitem.php?id=` + currentparam)
      .then(res => res.json())
      .then(res => {
        newcart = res;
        newcart.splice(0, 1);
      })
      .then(response => this.setState({ product: newcart }))
      .then(res => window.location.reload());
  }

  getCartItems() {
    fetch(`/api/cart.php`)
      .then(res => res.json())
      .then(response => this.setState({ product: response }));
  }

  subFromCart(product, id) {
    if (this.state.cartTotalQuantity <= 1) {
      return undefined;
    } else {
      this.props.addToCart(product, id);
    }
  }

  addCart(product, id) {
    if (this.state.cartTotalQuantity > 9) {
      return undefined;
    } else {
      this.props.addToCart(product, id);
    }
  }

  plusQuantityOfProduct() {
    const addcart = () => { this.addCart(this.state.product, 1); };
    addcart();
    if (this.state.cartTotalQuantity > 9) {
      return;
    }
    this.setState({
      cartTotalQuantity: this.state.cartTotalQuantity + 1,
      price: parseInt(this.state.originalPrice) * parseInt(this.state.cartTotalQuantity)
    });
    this.getProduct();
  }

  subQuantityOfProduct() {
    const addcart = () => this.subFromCart(this.state.product, 99);
    addcart();
    if (this.state.cartTotalQuantity <= 1) {
      return;
    }
    this.setState({
      cartTotalQuantity: this.state.cartTotalQuantity - 1,
      price: parseInt(this.state.originalPrice) * parseInt(this.state.cartTotalQuantity)
    });
    this.getProduct();
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
            <div className="plusMinusButton input-group">
              <span className="input-group-btn">
                <button onClick={this.subQuantityOfProduct} type="button" className="btn btn-danger btn-number" data-type="minus" data-field="quant[2]">
                  <span className="glyphicon glyphicon-minus">-</span>
                </button>
              </span>
              <input type="text" name="quant[2]" className="form-control input-number" value={this.state.cartTotalQuantity} min="1" max="10" />
              <span className="input-group-btn">
                <button onClick={this.plusQuantityOfProduct} type="button" className="btn btn-success btn-number" data-type="plus" data-field="quant[2]">
                  <span className="glyphicon glyphicon-plus">+</span>
                </button>
              </span>
            </div>
            <button onClick={() => this.deleteItem(event)} type="button" className="delete btn btn-danger" >Delete</button>
            <p className="card-text badge badge-primary">{(this.state.originalPrice * this.state.cartTotalQuantity / 100).toFixed(2)}</p>
            <p className="card-text">{this.props.shortDescription}</p>
          </div>
        </div>
      </div>
    );
  }
}
export default CartSummaryItem;
