import React from 'react';
import AccessoriesListItem from './accessorieslistitem';

class AccessoriesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    this.getProduct();
  }

  getProduct() {
    fetch('/api/accessorieslist.php')
      .then(res => res.json())
      .then(res => this.setState({ products: res }));
  }

  render() {
    const products = this.state.products.map(singleProductData => {
      return (

        <AccessoriesListItem key={singleProductData.id}
          id={singleProductData.id}
          onClick={this.props.onClick}
          name={singleProductData.name}
          price={singleProductData.price}
          image={singleProductData.image}
          shortDescription={singleProductData.shortDescription}
        />

      );

    });

    return (
      <div className="container">
        <div className="row imagerow">
          {products}
        </div>
      </div>

    );
  }

}

export default AccessoriesList;
