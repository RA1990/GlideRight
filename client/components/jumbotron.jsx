import React from 'react';

function Jumbo(props) {
  return (
    <React.Fragment>
      <div className="jumbotron jumbo">
        <div className="overlay"></div>
        <div className="container">
          <h1 className="display-3 mb-1">JUST <br></br>SKATE</h1>
          <p className="lead">start<span> your glide</span></p>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Jumbo;
