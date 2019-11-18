import React from 'react';
import CartSummaryItem from './cart-summary-item';

function getCartTotal(cartItems) {
  let total = 0;
  for (let cartItemIndex = 0; cartItemIndex < cartItems.length; cartItemIndex++) {
    total += parseInt(cartItems[cartItemIndex].price * cartItems[cartItemIndex].count);
  }
  return total;
}

function CartSummary(props) {
  if (props.cart.length === 0) {
    return (
      <>
        <div className="container mt">
          <button className="btn btn-link btn-warning text-light adjust-no-item-button" onClick={() => props.setView('catalog', {})}>
            &#60;  Back to Catalog
          </button>
        </div>;
    <div>
      <span className=" mt-5 d-block p-2 bg-dark text-white text-center no-item">No Items</span>
    </div>
      </>
    );
  }

  let items = props.cart.map((item, index) => {
    return (
      <CartSummaryItem key={index}
        id={item.id}
        setView={props.setView}
        addToCart={props.addToCart}
        cartUpdatedCallback={props.cartUpdatedCallback}
        count={item.count}
        image={item.image}
        name={item.name}
        price={item.price}
        shortDescription={item.shortDescription} />
    );
  });

  const total = getCartTotal(props.cart);
  return (

    <div className="container textcolor text-light">
      <h1 className="myCartTitle mt-3 mb-5 ml-2">My Cart</h1>
      <div className="card-space-item">
        <button className="btn btn-link btn-warning text-light" onClick={() => props.setView('catalog', {})}>
          &#60;  Back to Catalog
        </button>
        {items}
      </div>
      <p className="itemTotal">
        Total Price ${(total / 100).toFixed(2)}
      </p>
      <div className="col-md-4 checkout-button"> <button onClick={() => { props.setView('checkout', {}); }} type="button" className="checkout-btn btn  btn-primary" >Checkout</button>
      </div>
    </div>
  );
}

export default CartSummary;
