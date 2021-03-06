
import React from 'react';

export default class ProductDtails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.toggleStatusClick = this.toggleStatusClick.bind(this);
  }

  componentDidMount() {
    fetch(`/api/products/${this.props.params.productId}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ product: res });
      })
      .catch(err => console.error(err));
  }

  handleBackClick() {
    this.props.setView('productList', null);
  }

  handleEditClick() {
    this.props.setView('addEditProduct', this.props.params);
  }

  toggleStatusClick(e) {
    this.state.product.status = !this.state.product.status;
    this.setState({ product: this.state.product });
    fetch(`/api/products/${this.props.params.productId}`, {
      method: 'PATCH'
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ product: res });
      })
      .catch(err => console.error(err));
  }

  render() {
    return this.state.product

      ? <div className='container'>
        <div className='row card p-2'>
          <div className="back-arrow w-100 p-2 cursor text-muted font-italic d-flex justify-content-end" onClick={this.handleBackClick} >
            Back to Product List -&gt;
          </div>
          <div className="row justify-content-center m-2">
            <img className="col-6 card-img-left border" src={this.state.product.imageUrl} alt={this.state.product.name} />
            <div className="col-6 my-4 pl-5">
              <p className="card-text">{
                this.state.product.status
                  ? <span className="text-success font-weight-bold">Active</span>
                  : <span className="text-danger font-weight-bold">Discontinued</span>
              }</p>
              <p className="card-text">Sku: {this.state.product.sku}</p>
              <p className="card-text">Color: {this.state.product.color}</p>
              <p className="card-text">Qyt: {this.state.product.qty}</p>
            </div>
          </div>
          <div className="col-12 text-center my-2">
            <div className="row justify-content-start m-1 p-1">Name: {this.state.product.name}</div>
            <div className="row justify-content-start m-1 p-1">Category: {this.state.product.categoryName}</div>
            <div className="row justify-content-start m-1 p-1">Category: {this.state.product.supplierName}</div>
            <div className="row justify-content-start m-1 p-1">Cost: {`$${this.state.product.cost}`}</div>
            <div className="row justify-content-start m-1 p-1">Shipping Cost: {`$${this.state.product.shippingCost}`}</div>
            <div className="row justify-content-start m-1 p-1">Size: {this.state.product.size}</div>
            <div className="row justify-content-start m-1 p-1">Location: {this.state.product.location}</div>
          </div>
          {
            this.state.product.status
              ? <div className="row justify-content-between m-1 p-2">
                <button className="btn-blue" onClick={this.handleEditClick}>Edit</button>
                <button className="btn-red" onClick={this.toggleStatusClick}>Discontinue</button>
              </div>
              : <div className="row justify-content-between m-1 p-2">
                <button className="btn-grey" disabled>Edit</button>
                <button className="btn-green" onClick={this.toggleStatusClick}>Active</button>
              </div>
          }
        </div>
      </div>
      : null;
  }
}
