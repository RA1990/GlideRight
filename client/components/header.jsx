import React from 'react';

function Header(props) {
  let cartCount = 0;
  props.cartItemCount.map(res => { cartCount += parseInt(res.count); });
  return (

    <React.Fragment>
      <nav className="fixed-top navbar navbar-expand-lg navbar-dark bg-dark">
        <div><img className="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQezCB2oLLvKdgFN2d5e1Nwf8_hd8pDnQVaqMlWMiuo_IcsUSyp" /></div>
        <div className="d-flex justify-content-between mt-5 mOfCart">
        </div>
        <div className="cart" onClick={() => props.setView('cart', {})}><div className="cartcount">{cartCount}</div>&#128722;</div>
      </nav>
    </React.Fragment>
  );

}

export default Header;
