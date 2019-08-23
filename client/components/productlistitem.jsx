import React from 'react';

function ProductListItem(props) {
  const name = 'details';
  const params = { id: props.id };
  return (
    <div onClick={() => props.onClick(name, params)} className="card p-3">
      <img src={props.image} className="card-img-top" alt="item1" />
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <p className="card-text"><small className="text-muted">{props.price}</small></p>
        <p className="card-text">{props.shortDescription}</p>
      </div>
    </div>
  );

}

export default ProductListItem;
