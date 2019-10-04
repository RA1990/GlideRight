import React from 'react';

function SwagListItem(props) {
  const name = 'swagdetails';
  const params = { id: props.id };
  return (
    <div onClick={() => props.onClick(name, params)} className="card col-md-3 mb-3 zoom">
      <div className="card-body">
        <img src={props.image} className="card-img-top" alt="item1" />
        <h5 className="card-title">{props.name}</h5>
        <p className="card-text">{props.shortDescription}</p>
        <p className="card-text"><span className="badge badge-primary" >${(props.price / 100).toFixed(2)}</span></p>
      </div>
    </div>
  );

}

export default SwagListItem;
