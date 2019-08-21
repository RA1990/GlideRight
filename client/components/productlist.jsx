import React from 'react';

function ProductListItem(props) {

  return (
    <React.Fragment>
      <div className="card mb-3">
        <img src="https://bit.ly/2JtVNE6" className="card-img-top" alt="item1"/>
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
        </div>
      </div>
    </React.Fragment>
  );

}

export default ProductListItem;
