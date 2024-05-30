import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import MyContext from '../contexts/MyContext';
import '../css/inform.css';

class Inform extends Component {
  static contextType = MyContext; // using this.context to access global state

  render() {
    return (
      <div className="border-bottom">
        <div className="float-left">
          {this.context.token === '' ? (
            <div className='inform'>
              <Link to='/login'>Đăng Nhập</Link> | <Link to='/signup'>Đăng Ký</Link> | <Link to='/active'>Kích Hoạt</Link>
            </div>
          ) : (
            <div className='inform'>
              Xin chào, <b>{this.context.customer.name}</b> | <Link to='/home' onClick={() => this.lnkLogoutClick()}>Đăng xuất</Link>
            </div>
          )}
        </div>
        <div className="float-right">
          <Link to='/mycart'>
            <FontAwesomeIcon icon={faShoppingCart} /> 
            &nbsp;<b>{this.context.mycart.length}</b> 
          </Link>
        </div>
        <div className="float-clear" />
      </div>
    );
  }

  // event-handlers
  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setCustomer(null);
    this.context.setMycart([]);
  }
}

export default Inform;
