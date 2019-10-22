import React from 'react';
import CartSummaryItem from './cartSummaryItem';

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
    <div className="container">
      <button className="btn btn-link mt-4" onClick={() => props.setView('catalog', {})}>
        {'<'}  Back to Catalog
      </button>
    </div>;
    <div>
      <span className=" mt-5 d-block p-2 bg-dark text-white text-center noItem">No Items</span>
    </div>
    </>
    );
  }

  let items = props.cart.map((item, index) => {
    return (
      <CartSummaryItem key={index}
        id={item.id}
        addToCart={props.addToCart}
        count={item.count}
        image={item.image}
        name={item.name}
        price={item.price}
        shortDescription={item.shortDescription} />
    );
  });

  const total = getCartTotal(props.cart);
  return (

    <div className="container textcolor">
      <button className="btn btn-link mt-4" onClick={() => props.setView('catalog', {})}>
        {'<'}  Back to Catalog
      </button>
      <h1 className="myCartTitle mt-3 mb-5 ml-2">My Cart</h1>
      <div className="cardSpaceItem">
        {items}
      </div>
      <p className="itemTotal">
        Item Total ${(total / 100).toFixed(2)}
      </p>
      <div className="col-md-4 checkouButton"> <button onClick={() => { props.setView('checkout', {}); }} type="button" className="btn  btn-primary" >Checkout</button>
      </div>
    </div>
  );
}

export default CartSummary;
