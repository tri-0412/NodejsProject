import axios from 'axios';
import React, { Component } from 'react';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/MyContext';
import '../css/productDetail.css';


const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

class ProductDetail extends Component {
  static contextType = MyContext;
  
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      txtQuantity: 1
    };
  }

  render() {
    const prod = this.state.product;
    
    if (prod != null) {
      return (
        <div className="align-center">
          <h2 className="text-center">Thông Tin Chi Tiết Sản Phẩm</h2>
          <figure className="caption-right">
            <img src={"data:image/jpg;base64," + prod.image} alt="" />
            <figcaption>
              <form>
                <table>
                  <tbody>
                    <tr>
                      <td align="right">Tên sản phẩm:</td>
                      <td>{prod.name}</td>
                    </tr>
                    <tr>
                      <td align="right">Giá từ:</td>
                      <td>{formatPrice(prod.price)} VNĐ</td>
                    </tr>
                    <tr>
                      <td align="right">Hãng:</td>
                      <td>{prod.category.name}</td>
                    </tr>
                    <tr>
                      <td align="right">Số lượng:</td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          max="99"
                          value={this.state.txtQuantity}
                          onChange={(e) => {
                            this.setState({ txtQuantity: e.target.value });
                          }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        <input
                          type="submit"
                          value="Thêm vào giỏ hàng"
                          onClick={(e) => this.btnAdd2CartClick(e)}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </figcaption>
          </figure>
        </div>
      );
    }
    return <div />;
  }

  // event-handlers
  btnAdd2CartClick(e) {
    e.preventDefault();
    const product = this.state.product;
    const quantity = parseInt(this.state.txtQuantity);
    if (quantity) {
      const mycart = this.context.mycart;
      const index = mycart.findIndex((x) => x.product._id === product._id);

      if (index === -1) {
        const newItem = { product: product, quantity: quantity };
        mycart.push(newItem);
      } else {
        mycart[index].quantity += quantity;
      }

      this.context.setMycart(mycart);
      alert('OK BABY!');
    } else {
      alert('Please input quantity');
    }
  }

  componentDidMount() {
    const params = this.props.params;
    this.apiGetProduct(params.id);
  }

  // apis
  apiGetProduct(id) {
    axios.get('/api/customer/products/' + id).then((res) => {
      const result = res.data;
      this.setState({ product: result });
    });
  }
}

export default withRouter(ProductDetail);
