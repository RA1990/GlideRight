import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.modal = this.modal.bind(this);
    this.getCartTotal = this.getCartTotal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOrder = this.handleOrder.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.enableOrderButton = this.enableOrderButton.bind(this);
    this.state = {
      modal: 'show',
      buttonClass: 'arrow-control',
      inputs: {
        customerName: {
          placeholder: 'enter name',
          regex: /^[a-zA-Z\-'\s]+$/,
          error: 'name must be a letter and longer than 2 characters',
          displayedError: '',
          value: '',
          displayClass: 'text-secondary'
        },
        creditCardInfo: {
          placeholder: 'enter credit card 16 digits no space',
          regex: /^[0-9]{16}$/,
          error: 'number must be 16 digits no spaces',
          displayedError: '',
          value: '',
          displayClass: 'text-secondary'
        },
        shippingInfo: {
          placeholder: 'Your address, aka: 123 Any St, CA 90210',
          regex: /^[0-9]{1,5} +[a-zA-Z0-9 -.]{1,},? +[A-Z]{2} +[0-9]{5}$/,
          error: 'invaild address',
          displayedError: '',
          value: '',
          displayClass: 'text-secondary'
        }
      },
      placeOrder: false
    };
  }
  componentDidMount() {
    document.body.classList.remove('overflow-x-body');
    document.body.classList.add('overflow-control');
  }
  modal() {
    document.body.classList.add('overflow-x-body');
    document.body.classList.remove('overflow-control');
    this.setState({ modal: 'hide' });
  }
  handleOrder() {
    for (let inputKey in this.state.inputs) {
      if (this.state.inputs[inputKey].displayClass === 'text-danger' || this.state.inputs[inputKey].displayClass === 'text-secondary') {
        return;
      }
    }
    this.setState({ placeOrder: true });
    fetch(`/api/delete_all_items.php`)
      .then(res => res.json())
      .then(() => {
        this.props.cartUpdatedCallback('checkout');
      });

  }

  handleInputChange(event) {
    const input = event.target;
    const value = input.value;
    const inputName = input.getAttribute('name');
    const newState = { ...this.state };
    const currentTest = newState.inputs[inputName].regex;
    if (currentTest.test(value)) {
      newState.inputs[inputName].displayClass = 'text-success';
      newState.inputs[inputName].displayedError = '';
    } else {
      newState.inputs[inputName].displayClass = 'text-danger';
      newState.inputs[inputName].displayedError = newState.inputs[inputName].error;
    }
    newState.inputs[inputName].value = value;
    this.setState(newState);
    this.enableOrderButton();
  }

  handleSubmit(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

  getCartTotal() {
    let cartTotalItem = this.props.allItems;
    let total = 0;
    for (let cartItemIndex = 0; cartItemIndex < cartTotalItem.length; cartItemIndex++) {
      total += parseInt(cartTotalItem[cartItemIndex].price * cartTotalItem[cartItemIndex].count);
    }
    return total;
  }
  enableOrderButton() {
    let successCounter = 0;
    for (let inputKey in this.state.inputs) {
      if (this.state.inputs[inputKey].displayClass === 'text-success') {
        successCounter += 1;
      }
    }
    if (successCounter === 3) {
      this.setState({ buttonClass: 'pass' });
    }
  }

  render() {
    if (this.state.placeOrder === true) {
      return (
        <>
          <div className="container mt font-fam">
            <button className="btn btn-link btn-info text-light" onClick={() => this.props.setView('catalog', {})}>
              &#60;  Back to Catalog
            </button>
          </div>;
    <div className=" mt-5 d-block p-2 bg-dark text-white text-center checkout font-fam">
      <span>Thank You For Ordering</span>
      <h2>Your Order Number is </h2>
      <h2>{Math.floor(Math.random() * 1000000000)}</h2>
    </div>
        </>
      );
    }
    const input = this.state.inputs;
    return (
      <>
        <div className="modal font-fam" id={this.state.modal} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content modal-top">
              <div className="modal-body">
                <p className="mr-5">This is a demo site there are no products for sale</p>
              </div>
              <div className="modal-footer">
                <button onClick={this.modal} type="button" className="btn btn-secondary modal-button" data-dismiss="modal">I Agree</button>
              </div>
            </div>
          </div>
        </div>
        <div className="checkout-container font-fam">
          <div className="container checkout-text-color">
            <h1 className="checkout-text-color">Checkout</h1>
            <p className="checkout-text-color">Order Total:${(this.getCartTotal() / 100).toFixed(2)}</p>
            <form className="checkout-text-color" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label >Name</label>
                <input onKeyDownCapture={this.handleSubmit} onChange={this.handleInputChange} name="customerName" type="text" pattern="[a-zA-Z\-'\s]+" value={input.customerName.value} className={'fs form-control ' + input.customerName.displayClass} placeholder="enter name" required />
                <div className="input-error">{input.customerName.displayedError}</div>
              </div>

              <div className="form-group">
                <label>Credit Card</label>
                <input onKeyDownCapture={this.handleSubmit} onChange={this.handleInputChange} name="creditCardInfo" type="text" pattern="^\d{13}$" value={input.creditCardInfo.value} className={'fs form-control ' + input.creditCardInfo.displayClass} placeholder="enter credit card 16 digits no space" required />
                <div className="input-error">{input.creditCardInfo.displayedError}</div>
              </div>

              <div className="form-group">
                <label>Shipping Address</label>
                <textarea onKeyDownCapture={this.handleSubmit} onChange={this.handleInputChange} name="shippingInfo" pattern="^\s*\S+(?:\s+\S+){2}\s*\S+\s*\S+\s*\S+$" value={input.shippingInfo.value} className={'fs form-control ' + input.shippingInfo.displayClass} placeholder={input.shippingInfo.placeholder} rows="3"></textarea>
                <div className="input-error">{input.shippingInfo.displayedError}</div>
              </div>

              <div className="container">
                <div className="row">
                  <div className="col">
                    <button className="btn btn-link btn-info text-light continue-to-shop-button" onClick={() => this.props.setView('catalog', {})}>
                      &#60; continue shopping
                    </button>
                  </div>
                  <div className="col">
                    <button onClick={this.handleOrder} type="button" className={'btn place-order btn-primary ' + this.state.buttonClass}>Place Order</button>
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
