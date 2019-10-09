import React from 'react';

function Header(props) {
  return (

    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div><img className="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQezCB2oLLvKdgFN2d5e1Nwf8_hd8pDnQVaqMlWMiuo_IcsUSyp" /></div>
        <div className="d-flex justify-content-between mt-5">
          <h3 className='title1' onClick={() => props.setView('catalog', {})}>Boards</h3>
        </div>
        <div className="cart"><div className="cartcount" onClick={() => props.setView('cart', {})}>{props.cartItemCount}</div>&#128722;</div>
      </nav>
    </React.Fragment>
  );

}

export default Header;
