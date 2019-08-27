import React from 'react';

function Header(props) {

  return (

    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div><img className="frog" src="https://cdn.pixabay.com/photo/2016/01/29/22/04/frog-1168751_960_720.jpg"/></div>
        <div className='title'>Frog Sales</div>
        <div className="cart">&#128722;</div>
      </nav>
    </React.Fragment>
  );

}

export default Header;
