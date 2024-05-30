import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import ProductDetail from './ProductDetailComponent';
import axios from 'axios';
import '../css/product.css'

class Product extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      noPages: 0,
      curPage: 1,
      itemSelected: null,
    };
  }

  render() {
    const prods = this.state.products.map((item) => (
      <div key={item._id} className="product-item" onClick={() => this.trItemClick(item)}>
        <div className="product-info">
          <span>ID: {item._id}</span>
          <span>Name: {item.name}</span>
          <span>Price: {item.price}</span>
          <span>Creation date: {new Date(item.cdate).toLocaleString()}</span>
          <span>Category: {item.category.name}</span>
        </div>
        <img src={`data:image/jpg;base64,${item.image}`} alt="" />
      </div>
    ));

    const pagination = Array.from({ length: this.state.noPages }, (_, index) => (
      <span
        key={index}
        className={index + 1 === this.state.curPage ? 'pagination-item active' : 'pagination-item'}
        onClick={() => this.lnkPageClick(index + 1)}
      >
        {index + 1}
      </span>
    ));

    return (
      <div className="product-container">
        <div className="product-list">
          <h2 className="text-center">PRODUCT LIST</h2>
          {prods}
          <div className="pagination">{pagination}</div>
        </div>
        <div className="product-detail">
          <ProductDetail item={this.state.itemSelected} curPage={this.state.curPage} updateProducts={this.updateProducts} />
        </div>
      </div>
    );
  }

  updateProducts = (products, noPages, curPage) => {
    this.setState({ products, noPages, curPage });
  };

  componentDidMount() {
    this.apiGetProducts(this.state.curPage);
  }

  lnkPageClick(index) {
    this.apiGetProducts(index);
  }

  trItemClick(item) {
    this.setState({ itemSelected: item });
  }

  apiGetProducts(page) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get(`/api/admin/products?page=${page}`, config).then((res) => {
      const result = res.data;
      this.setState({ products: result.products, noPages: result.noPages, curPage: result.curPage });
    });
  }
}


export default Product;
