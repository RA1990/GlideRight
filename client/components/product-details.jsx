import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    fetch('/api/products.php?id=')
      .then(res => res.json())
      .then(res => this.setState({ product: res }));
  }

  render() {
    // console.log(this.state.product);

    // if (this.state.product != null) {
    //   this.state.product.map(key => {
    //     key;
    //     console.log(key.name);
    //     return (
    //       <div key={key.id} className="card p-3">
    //         <img src={key.image} className="card-img-top" alt="item1" />
    //         <div className="card-body">
    //           <h5 className="card-title">{key.name}</h5>
    //           <p className="card-text"><small className="text-muted">{key.price}</small></p>
    //           <p className="card-text">{key.shortDescription}</p>
    //         </div>
    //       </div>
    //     );
    //   });
    // }
    return null;
  }

}

export default ProductDetails;
