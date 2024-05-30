import React, { Component } from 'react';
import axios from 'axios';
import DashboardStats from './DashboardStats';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../css/home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryCount: 0,
      productCount: 0,
      orderCount: 0,
      customerCount: 0,
    };
  }

  fetchData() {
    axios.get('/api/admin/categories/count')
      .then((res) => {
        this.setState({ categoryCount: res.data.count });
      })
      .catch((error) => {
        console.error('Error fetching category count:', error);
      });

    axios.get('/api/admin/products/count')
      .then((res) => {
        this.setState({ productCount: res.data.count });
      })
      .catch((error) => {
        console.error('Error fetching product count:', error);
      });

    axios.get('/api/admin/orders/count')
      .then((res) => {
        this.setState({ orderCount: res.data.count });
      })
      .catch((error) => {
        console.error('Error fetching order count:', error);
      });

    axios.get('/api/admin/customers/count')
      .then((res) => {
        this.setState({ customerCount: res.data.count });
      })
      .catch((error) => {
        console.error('Error fetching customer count:', error);
      });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div className="align-center">
        <h2 className="text-center">ADMIN HOME</h2>
        <img src="https://media.giphy.com/media/11shDO8NnZDYpa/giphy.gif" width="800px" height="400px" alt="" />
        <div className="dashboard-stats-container">
          <Link to="/admin/category">
            <DashboardStats title="Categories" count={this.state.categoryCount} />
          </Link>
          <Link to="/admin/product">
            <DashboardStats title="Products" count={this.state.productCount} />
          </Link>
          <Link to="/admin/order">
            <DashboardStats title="Orders" count={this.state.orderCount} />
          </Link>
          <Link to="/admin/customer">
            <DashboardStats title="Customers" count={this.state.customerCount} />
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
