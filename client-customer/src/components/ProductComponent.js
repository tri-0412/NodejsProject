import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import '../css/product.css';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      hoveredProduct: null, // New state property to track hovered product
    };
  }

  // Event handlers for hover
  handleProductHover(productId) {
    this.setState({ hoveredProduct: productId });
  }

  handleProductHoverEnd() {
    this.setState({ hoveredProduct: null });
  }

  render() {
    const formatPrice = (price) => {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const prods = this.state.products.map((item) => {
      return (
        <div
          key={item._id}
          className="inline"
          onMouseEnter={() => this.handleProductHover(item._id)}
          onMouseLeave={() => this.handleProductHoverEnd()}
        >
          <figure>
            <Link to={'/product/' + item._id}>
              <img src={"data:image/jpg;base64," + item.image} width="300px" height="300px" alt="" />
            </Link>
            <figcaption className="text-center">
              <div>{item.name}</div>
              <div>Giá từ {formatPrice(item.price)} VNĐ</div>
                {this.state.hoveredProduct === item._id && (
              <div>
                <Link to={'/product/' + item._id} className="add-to-cart-link">
                  Thêm vào giỏ hàng
                </Link>
              </div>
              )}
          </figcaption>
          </figure>
        </div>
      );
    });

    return (
      <div className="text-center">
        <h2 className="text-center">DANH SÁCH SẢN PHẨM</h2>
        {prods}
      </div>
    );
  }

  componentDidMount() {
    const params = this.props.params;
    if (params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }

  componentDidUpdate(prevProps) {
    const params = this.props.params;
    if (params.cid && params.cid !== prevProps.params.cid) {
      this.apiGetProductsByCatID(params.cid);
    }
  }

  // APIs
  apiGetProductsByCatID(cid) {
    axios.get('/api/customer/products/category/' + cid).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }

  apiGetProductsByKeyword(keyword) {
    axios.get('/api/customer/products/search/' + keyword).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }
}

export default withRouter(Product);
