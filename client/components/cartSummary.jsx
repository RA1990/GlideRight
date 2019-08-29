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
    return <div className="noItems">No Items</div>;
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
    </div>
  );
}

export default CartSummary;
