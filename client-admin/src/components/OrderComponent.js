import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import '../css/order.css';

class Order extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      order: null,
    };
  }

  renderOrders() {
    return (
      <table className="order-list">
        <thead>
          <tr>
            <th>ID</th>
            <th>Creation Date</th>
            <th>Customer Name</th>
            <th>Customer Phone</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.state.orders.map((item) => (
            <tr key={item._id} className="order-item" onClick={() => this.trItemClick(item)}>
              <td>{item._id}</td>
              <td>{new Date(item.cdate).toLocaleString()}</td>
              <td>{item.customer.name}</td>
              <td>{item.customer.phone}</td>
              <td>{item.total}</td>
              <td>{item.status}</td>
              <td>
                {item.status === 'PENDING' && (
                  <div>
                    <span className="link" onClick={() => this.lnkApproveClick(item._id)}>
                      APPROVE
                    </span>{' '}
                    ||{' '}
                    <span className="link" onClick={() => this.lnkCancelClick(item._id)}>
                      CANCEL
                    </span>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  renderOrderDetails() {
    if (this.state.order) {
      return (
        <table className="order-detail">
          <thead>
            <tr>
              <th>No.</th>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {this.state.order.items.map((item, index) => (
              <tr key={item.product._id} className="order-detail-item">
                <td>{index + 1}</td>
                <td>{item.product._id}</td>
                <td>{item.product.name}</td>
                <td>
                  <img src={`data:image/jpg;base64,${item.product.image}`} width="70px" height="70px" alt="" />
                </td>
                <td>{item.product.price}</td>
                <td>{item.quantity}</td>
                <td>{item.product.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    return null;
  }

  render() {
    return (
      <div>
        <div className="align-center">
          <h2 className="text-center">ORDER LIST</h2>
          {this.renderOrders()}
        </div>
        {this.state.order && (
          <div className="align-center">
            <h2 className="text-center">ORDER DETAIL</h2>
            {this.renderOrderDetails()}
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    this.apiGetOrders();
  }

  lnkApproveClick(id) {
    this.apiPutOrderStatus(id, 'APPROVED');
  }

  lnkCancelClick(id) {
    this.apiPutOrderStatus(id, 'CANCELED');
  }

  apiPutOrderStatus(id, status) {
    const body = { status: status };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put(`/api/admin/orders/status/${id}`, body, config).then((res) => {
      const result = res.data;
      if (result) {
        this.apiGetOrders();
      } else {
        alert('SORRY BABY!');
      }
    });
  }

  trItemClick(item) {
    this.setState({ order: item });
  }

  apiGetOrders() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/orders', config).then((res) => {
      const result = res.data;
      this.setState({ orders: result });
    });
  }
}

export default Order;
