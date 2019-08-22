import React from 'react';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  getProduct() {
    fetch('/api/products.php')
      .then(res => res.json());

  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm">
          One of three columns
          </div>
          <div className="col-sm">
          One of three columns
          </div>
          <div className="col-sm">
          One of three columns
          </div>
        </div>
      </div>

    );
  }

}

export default ProductList;
