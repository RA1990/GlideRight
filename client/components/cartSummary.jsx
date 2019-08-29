import React from 'react';
import CartSummaryItem from './cartSummaryItem';

function getCartTotal(cartItems) {
  var total = 0;
  for (var cartItemIndex = 0; cartItemIndex < cartItems.length; cartItemIndex++) {
    total += cartItems[cartItemIndex].price;
  }
  return total;
}

function CartSummary(props) {
  if (props.cart.length === 0) {
    return (
      <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div><img className="frog" src="https://cdn.pixabay.com/photo/2016/01/29/22/04/frog-1168751_960_720.jpg" /></div>
      <div className='title'>Frog Sales</div>
      <div className="cart"><div className="cartcount" onClick={() => props.setView('cart', {})}>{props.cartItemCount}</div>&#128722;</div>
    </nav>
    <div className="container">
      <button className="btn btn-link mt-4" onClick={() => props.setView('catalog', {})}>
        {'<'}  Back to Catalog
      </button>
    </div>;
    <div>No Items</div>
    </>
    );
  }

  var items = props.cart.map((item, index) => {
    return (
      <CartSummaryItem key={index}
        image={item.image}
        name={item.name}
        price={item.price}
        shortDescription={item.shortDescription} />
    );

  });

  const total = getCartTotal(props.cart);
  return (
    <div className="container">
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
      <div className="col-md-4 checkouButton"> <button onClick={() => { props.setView('checkout', {}); }} type="button" className="btn btn-outline-dark" >Checkout</button>
      </div>
    </div>
  );
}

export default CartSummary;
