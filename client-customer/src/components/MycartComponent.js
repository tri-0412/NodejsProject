import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CartUtil from '../utils/CartUtil';
import axios from 'axios';
import withRouter from '../utils/withRouter';
import '../css/mycart.css';

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

class Mycart extends Component {
  static contextType = MyContext;

  render() {
    const mycart = this.context.mycart.map((item, index) => (
      <div key={item.product._id} className="product-item">
        <span className="product-info">{index + 1}</span>
        <span className="product-info">{item.product.name}</span>
        <span className="product-info">{item.product.category.name}</span>
        <img src={`data:image/jpg;base64,${item.product.image}`} alt="" className="product-image" />
        <span className="product-info">{formatPrice(item.product.price)} VNĐ</span>
        <span className="product-info">{item.quantity}</span>
        <span className="product-info">{formatPrice(item.product.price * item.quantity)} VNĐ</span>
        <span className="link" onClick={() => this.lnkRemoveClick(item.product._id)}>Xóa</span>
      </div>
    ));

    return (
      <div className="table-container">
        <h2 className="table-title">Danh sách giỏ hàng</h2>
        <div className="product-list">
          <div className="product-item header">
            <span>STT</span>
            <span>Tên sản phẩm</span>
            <span>Loại sản phẩm</span>
            <span>Hình ảnh</span>
            <span>Giá</span>
            <span>Số lượng</span>
            <span>Tổng</span>
            <span>‎</span>
          </div>
          {mycart}
        </div>
        <div className="total-section">
          <div className="total-info">
            <span>Tổng cộng</span>
            <span>{formatPrice(CartUtil.getTotal(this.context.mycart))} VNĐ</span>
          </div>
          <span className="link" onClick={() => this.lnkCheckoutClick()}>Xác nhận</span>
        </div>
      </div>
    );
  }

  lnkRemoveClick(id) {
    const mycart = this.context.mycart;
    const index = mycart.findIndex(x => x.product._id === id);
    if (index !== -1) {
      mycart.splice(index, 1);
      this.context.setMycart([...mycart]); // Create a new array to trigger a state update
    }
  }

  lnkCheckoutClick() {
    if (window.confirm('ARE YOU SURE?')) {
      if (this.context.mycart.length > 0) {
        const total = CartUtil.getTotal(this.context.mycart);
        const items = this.context.mycart;
        const customer = this.context.customer;
        if (customer) {
          this.apiCheckout(total, items, customer);
        } else {
          this.props.navigate('/login');
        }
      } else {
        alert('Your cart is empty');
      }
    }
  }

  apiCheckout(total, items, customer) {
    const body = { total: total, items: items, customer: customer };
    const config = { headers: { 'x-access-token': this.context.token } };

    axios.post('/api/customer/checkout', body, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
        this.context.setMycart([]);
        this.props.navigate('/home');
      } else {
        alert('SORRY BABY!');
      }
    });
  }
}

export default withRouter(Mycart);
