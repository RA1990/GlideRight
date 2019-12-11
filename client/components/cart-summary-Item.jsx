import React from 'react';

class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.modal = this.modal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleYesButtonOnModal = this.handleYesButtonOnModal.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.modifyCartCount = this.modifyCartCount.bind(this);
    this.getProduct = this.getProduct.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.state = {
      modal: 'hide',
      itemToDelete: null,
      ProductId: parseInt(this.props.id),
      product: [],
      cartTotalQuantity: parseInt(this.props.count),
      price: parseInt(this.props.price),
      originalPrice: parseInt(this.props.price)
    };
  }
  componentDidUpdate() {
    if (this.state.modal === 'hide') {
      document.documentElement.classList.remove('overflow-control');
    } else {
      document.documentElement.classList.add('overflow-control');
    }
  }
  modal(event) {
    document.body.classList.remove('overflow-x-body');
    document.body.classList.add('overflow-control');
    this.setState({ modal: 'show', itemToDelete: event });
  }
  handleYesButtonOnModal() {
    this.deleteItem(this.state.itemToDelete);
    this.closeModal();
  }
  closeModal() {
    document.body.classList.add('overflow-x-body');
    document.body.classList.remove('overflow-control');
    this.setState({ modal: 'hide' });
    this.props.setView('cart', {});
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
    let itemsCount = this.props.cart.length;
    event.preventDefault();
    const currentparam = this.props.id;
    fetch(`/api/delete_item.php?id=` + currentparam)
      .then(res => res.json())
      .then(() => {
        if (itemsCount <= 1) {
          this.props.cartUpdatedCallback('catalog');
        } else {
          this.props.cartUpdatedCallback('cart');
        }
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
      <>
        <div className="modal font-fam" id={this.state.modal} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content modal-top delete-modal">
              <div className="modal-body">
                <p className="mr-5 text-dark">Are you sure you want to delete this Item</p>
              </div>
              <div className="modal-footer">
                <button onClick={this.handleYesButtonOnModal} type="button" className="btn btn-secondary modal-button position-absolute" data-dismiss="modal">Yes</button>
                <button className="btn btn-link btn-info text-light mr-5" onClick={this.closeModal}>
                  &#60;  Back to Catalog
                </button>
              </div>
            </div>
          </div>
        </div>
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
              <button onClick={() => this.modal(event)} type="button" className="delete btn btn-danger" >Delete</button>
              <p className="card-text badge badge-primary">{(this.state.originalPrice * this.state.cartTotalQuantity / 100).toFixed(2)}</p>
              <p className="card-text cart-sum-text">{this.props.shortDescription}</p>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default CartSummaryItem;
