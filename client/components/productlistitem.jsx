import React from 'react';

function ProductListItem(props) {
  const name = 'details';
  const params = { id: props.id };
  return (
    <div onClick={() => props.onClick(name, params)} className="card container pt-3 mr-2 pb-1 rounded view">
      <img src={props.image} className="card-img-top" alt="item1" />
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <p className="card-text">{props.shortDescription}</p>
        <p className="card-text"><span className="badge badge-primary" >${(props.price / 100).toFixed(2)}</span></p>
      </div>
    </div>
  );

}

export default ProductListItem;
