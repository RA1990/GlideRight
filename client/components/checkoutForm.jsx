import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.modal = this.modal.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCreditCardChange = this.handleCreditCardChange.bind(this);
    this.handleShippingAddressInfo = this.handleShippingAddressInfo.bind(this);
    this.getCartTotal = this.getCartTotal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOrder = this.handleOrder.bind(this);
    this.state = {
      modal: 'show',
      text1: 'text-secondary',
      text2: 'text-secondary',
      text3: 'text-secondary',
      placeOrder: false,
      'customerName': '',
      'creditCardInfo': '',
      'shippingAddressInfo': ''
    };
  }
  componentDidMount() {
    window.scroll({
      top: 0,
      left: 100,
      behavior: 'smooth'
    });
  }
  modal() {
    this.setState({ modal: 'hide' });
  }
  handleOrder() {

    if (this.state.text1 === 'text-danger' || this.state.text2 === 'text-danger') {
      return;
    }
    if (this.state.text1 === 'text-secondary' || this.state.text2 === 'text-secondary') {
      return;
    }
    if (this.state.text3 === 'text-secondary' || this.state.text3 === 'text-danger') {
      return;
    }

    this.setState({ placeOrder: true });
  }

  handleNameChange(event) {
    this.setState({ customerName: event.target.value });
    let name = this.state.customerName;
    if (!name.match(/^([a-zA-Z\-'\s]+)$/)) {
      this.setState({ text1: 'text-danger' });
    } else {
      this.setState({ text1: 'text-success' });
    }

  }

  handleCreditCardChange(event) {
    this.setState({ creditCardInfo: event.target.value });
    let credit = this.state.creditCardInfo;
    if (!credit.match(/^(^\d{13}$)$/)) {
      this.setState({ text2: 'text-danger' });
    } else {
      this.setState({ text2: 'text-success' });
    }
  }

  handleShippingAddressInfo(event) {
    this.setState({ shippingAddressInfo: event.target.value });
    let address = this.state.shippingAddressInfo;
    if (!address.match(/^(^\s*\S+(?:\s+\S+){2}\s*\S+\s*\S+\s*\S+$)$/)) {
      this.setState({ text3: 'text-danger' });
    } else {
      this.setState({ text3: 'text-success' });
    }
  }

  handleSubmit(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

  getCartTotal() {
    let cartTotalItem = this.props.allItems;
    let total = 0;
    for (let i = 0; i < cartTotalItem.length; i++) {
      total += parseInt(cartTotalItem[i].price * cartTotalItem[i].count);
    }
    return total;
  }

  render() {
    if (this.state.placeOrder === true) {
      return (
      <>
        <div className="container mt">
          <button className="btn btn-link  mt-4" onClick={() => this.props.setView('catalog', {})}>
            {'<'}  Back to Catalog
          </button>
        </div>;
    <div className=" mt-5 d-block p-2 bg-dark text-white text-center checkout">
      <span>Thank You For Ordering</span>
      <h2>Your Order Number is </h2>
      <h2>{ Math.floor(Math.random() * 1000000000) }</h2>
    </div>
      </>
      );
    }

    return (
      <>
        <div className="modal" id={this.state.modal} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content modaltop">
              <div className="modal-body">
                <p className="mr-5">This is a demo site there are no products for sale</p>
              </div>
              <div className="modal-footer">
                <button onClick={this.modal} type="button" className="btn btn-secondary modalButton" data-dismiss="modal">I Agree</button>
              </div>
            </div>
          </div>
        </div>
        <div className="checkoutContainer">
          <div className="container checkoutTextColor">
            <h1 className="checkoutTextColor">Checkout</h1>
            <p className="checkoutTextColor">Order Total:${(this.getCartTotal() / 100).toFixed(2)}</p>
            <form className="checkoutTextColor" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label >Name</label>
                <input onKeyDown={this.handleSubmit} name="customerName" type="text" pattern="[a-zA-Z\-'\s]+" value={this.state.customerName} onChange={this.handleNameChange} className={'fs form-control ' + this.state.text1} id="exampleFormControlInput1" placeholder="enter name" required/>
              </div>

              <div className="form-group">
                <label>Credit Card</label>
                <input onKeyDown={this.handleSubmit} name="creditCardInfo" type="text" pattern="^\d{13}$" value={this.state.creditCardInfo} onChange={this.handleCreditCardChange} className={'fs form-control ' + this.state.text2} id="exampleFormControlInput1" placeholder="enter credit card 13 digits no space" required/>
              </div>

              <div className="form-group">
                <label>Shipping Address</label>
                <textarea onKeyDown={this.handleSubmit} pattern="^\s*\S+(?:\s+\S+){2}\s*\S+\s*\S+\s*\S+$" value={this.state.shippingAddressInfo} onChange={this.handleShippingAddressInfo} className={'fs form-control ' + this.state.text3} id="exampleFormControlTextarea1" placeholder="27461 San Bernardino Redlands, CA 92374" rows="3"></textarea>
              </div>

              <div className="container">
                <div className="row">
                  <div className="col">
                    <button className="btn btn-link mt-4" onClick={() => this.props.setView('catalog', {})}>
                      &#60; continue shopping
                    </button>
                  </div>
                  <div className="col">
                    <button onClick={this.handleOrder} type="button" className="btn placeOrder btn-primary">Place Order</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>

    );
  }

}
