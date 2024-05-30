// Myorders.jsx

import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import MyContext from '../contexts/MyContext';
import '../css/myorders.css';

class Myorders extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: null
    };
  }

  render() {
    if (this.context.token === '') return <Navigate replace to='/login' />;
    
    const orders = this.state.orders.map((item) => (
      <div key={item._id} className="order" onClick={() => this.handleOrderClick(item)}>
        <div className="order-info">
          <div className="order-date">{new Date(item.cdate).toLocaleString()}</div>
          <div className="order-customer">{item.customer.name}</div>
          <div className="order-phone">{item.customer.phone}</div>
          <div className="order-total">{item.total}</div>
          <div className="order-status">{item.status}</div>
        </div>
      </div>
    ));

    const items = this.state.order?.items.map((item, index) => (
      <div key={item.product._id} className="order-item">
        <div className="item-info">
          <div className="item-number">{index + 1}</div>
          <div className="item-name">{item.product.name}</div>
          <div className="item-price">{item.product.price}</div>
          <div className="item-quantity">{item.quantity}</div>
          <div className="item-total">{item.product.price * item.quantity}</div>
        </div>
        <div className="item-image">
          <img src={`data:image/jpg;base64,${item.product.image}`} alt="" />
        </div>
      </div>
    ));

    return (
      <div className="my-orders">
        <div className="order-list">
          <h2>Đơn Đặt Hàng</h2>
          <div className="order-items-header">
              <div>Ngày đặt hàng</div>
              <div>Tên </div>
              <div>SĐT</div>
              <div>Tổng</div>
              <div>Trạng thái</div>
            </div>
          {orders}
        </div>
        {this.state.order && (
          <div className="order-details">
            <h2>Chi tiết đơn hàng</h2>
            <div className="order-items-header">
              <div>STT</div>
              <div>Tên xe</div>
              <div>Giá xe</div>
              <div>Số lượng</div>
              <div>Tổng giá</div>
            </div>
            {items}
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    if (this.context.customer) {
      const cid = this.context.customer._id;
      this.apiGetOrdersByCustID(cid);
    }
  }

  handleOrderClick(item) {
    this.setState({ order: item });
  }

  apiGetOrdersByCustID(cid) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get(`/api/customer/orders/customer/${cid}`, config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    });
  }
}

export default Myorders;
