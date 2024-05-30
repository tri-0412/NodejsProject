import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import '../css/menu.css';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: ''
    };
  }
  render() {
    const cates = this.state.categories.map((item) => {
      return (
        <li key={item._id} className="menu"><Link to={'/product/category/' + item._id}>{item.name}</Link></li>
      );
    });
    return (
      <div id="app-container" className="border-bottom">
        <div className="float-left">
          <ul className="menu">
          <li className="menu"><Link to='/'>Trang Chủ</Link></li>
            {cates}
            <li className="menu"><Link to='/gmap'>Gmap</Link></li>
          </ul>
        </div>
        <div style={{ display: "inline" }} className="form-switch">
        <input className="form-check-input" type="checkbox" onChange={(e) => this.ckbChangeMode(e)} />&nbsp;Light/Dark mode
      </div>
        <div className="float-right">
        <form className="search">
        <input type="search" placeholder="Nhập từ khóa" className="keyword" value={this.state.txtKeyword} onChange={(e) => { this.setState({ txtKeyword: e.target.value }) }} />
        <input type="submit" value="Tìm kiếm" onClick={(e) => this.btnSearchClick(e)} />
        </form>
        </div>
        <div className="float-clear" />
      </div>
      
    );
  }
  componentDidMount() {
    this.apiGetCategories();
  }
  // event-handlers
  btnSearchClick(e) {
    e.preventDefault();
    this.props.navigate('/product/search/' + this.state.txtKeyword);
  }
  ckbChangeMode(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-bs-theme', 'light');
    }
  }
  // apis
  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}
export default withRouter(Menu);