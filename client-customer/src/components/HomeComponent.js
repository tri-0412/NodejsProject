import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import slideshow1 from '../images/slideshow1.jpg';
import slideshow2 from '../images/slideshow2.jpg';
import slideshow3 from '../images/slideshow3.jpg';
import slideshow4 from '../images/slideshow4.jpg';
import '../css/home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newprods: [],
      hotprods: [],
      hoveredProduct: null, // New state property to track hovered product
    };

    // Binding event handler functions
    this.handleProductHover = this.handleProductHover.bind(this);
    this.handleProductHoverEnd = this.handleProductHoverEnd.bind(this);
  }

  render() {
    const formatPrice = (price) => {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const isProductHovered = (productId) => {
      return this.state.hoveredProduct === productId;
    };

    const renderProduct = (item) => {
      if (!item || !item._id) {
        return null; // Trả về null nếu 'item' không tồn tại hoặc không có thuộc tính '_id'
      }
      return (
        <div
          key={item._id}
          className="inline"
          onMouseEnter={() => this.handleProductHover(item._id)}
          onMouseLeave={this.handleProductHoverEnd}
        >
          <figure>
            <Link to={'/product/' + item._id}>
              <img
                src={'data:image/jpg;base64,' + item.image}
                width="300px"
                height="300px"
                alt=""
              />
            </Link>
            <figcaption className="text-center">
              <div>{item.name}</div>
                <div>Giá từ: {formatPrice(item.price)} VNĐ</div>
                    {isProductHovered(item._id) && (
                    <Link to={'/product/' + item._id} className="add-to-cart-link">
                      Thêm vào giỏ hàng
                    </Link>
                      )}
              </figcaption>
          </figure>
        </div>
      );
    };

    const newprods = this.state.newprods.map(renderProduct);

    const hotprods = this.state.hotprods.map(renderProduct);

    // Slick settings for the slideshow
    const slideshowSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
    };

    return (
      <div>
        <Slider {...slideshowSettings}>
          <div>
            <img src={slideshow1} alt="Slide 1" />
          </div>
          <div>
            <img src={slideshow2} alt="Slide 2" />
          </div>
          <div>
            <img src={slideshow3} alt="Slide 3" />
          </div>
          <div>
            <img src={slideshow4} alt="Slide 4" />
          </div>
        </Slider>

        <div className="align-center">
          <h2 className="text-center">Sản Phẩm Mới</h2>
          {newprods}
        </div>

        {this.state.hotprods.length > 0 ? (
          <div className="align-center">
            <h2 className="text-center">Sản Phẩm Nổi Bật</h2>
            {hotprods}
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }

  componentDidMount() {
    this.apiGetNewProducts();
    this.apiGetHotProducts();
  }

  // APIs
  apiGetNewProducts() {
    axios.get('/api/customer/products/new').then((res) => {
      const result = res.data;
      this.setState({ newprods: result });
    });
  }

  apiGetHotProducts() {
    axios.get('/api/customer/products/hot').then((res) => {
      const result = res.data;
      this.setState({ hotprods: result });
    });
  }

  // Event handlers for hover
  handleProductHover(productId) {
    this.setState({ hoveredProduct: productId });
  }

  handleProductHoverEnd() {
    this.setState({ hoveredProduct: null });
  }
}

export default Home;
