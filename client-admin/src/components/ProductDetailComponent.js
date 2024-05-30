// ProductDetail.jsx

import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
// import '../css/productDetail.css'; 

class ProductDetail extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtID: '',
      txtName: '',
      txtPrice: 0,
      cmbCategory: '',
      imgProduct: '',
    };
  }

  render() {
    const categoryOptions = this.state.categories?.map((cate) => (
      <option key={cate._id} value={cate._id} selected={cate._id === this.props.item?.category?._id}>
        {cate.name}
      </option>
    ));

    return (
      <div className="product-detail-container">
        <h2 className="product-detail-heading">PRODUCT DETAIL</h2>
        <form className="product-detail-form">
          <div className="form-group">
            <label>ID</label>
            <input type="text" value={this.state.txtID} onChange={(e) => this.handleInputChange('txtID', e)} readOnly={true} />
          </div>
          <div className="form-group">
            <label>Name</label>
            <input type="text" value={this.state.txtName} onChange={(e) => this.handleInputChange('txtName', e)} />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input type="text" value={this.state.txtPrice} onChange={(e) => this.handleInputChange('txtPrice', e)} />
          </div>
          <div className="form-group">
            <label>Image</label>
            <input type="file" name="fileImage" accept="image/jpeg, image/png, image/gif" onChange={(e) => this.previewImage(e)} />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select onChange={(e) => this.handleInputChange('cmbCategory', e)}>{categoryOptions}</select>
          </div>
          <div className="form-group">
            <button type="button" onClick={(e) => this.btnAddClick(e)}>ADD NEW</button>
            <button type="button" onClick={(e) => this.btnUpdateClick(e)}>UPDATE</button>
            <button type="button" onClick={(e) => this.btnDeleteClick(e)}>DELETE</button>
          </div>
          <div className="form-group">
            <img src={this.state.imgProduct} width="300px" height="300px" alt="" />
          </div>
        </form>
      </div>
    );
  }

  componentDidMount() {
    this.apiGetCategories();
  }

  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({
        txtID: this.props?.item?._id,
        txtName: this.props?.item?.name,
        txtPrice: this.props?.item?.price,
        cmbCategory: this.props?.item?.category?._id,
        imgProduct: 'data:image/jpg;base64,' + this.props.item?.image,
      });
    }
  }

  handleInputChange(field, e) {
    this.setState({ [field]: e.target.value });
  }

  previewImage(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        this.setState({ imgProduct: evt.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  btnAddClick(e) {
    e.preventDefault();
    const { txtName, txtPrice, cmbCategory, imgProduct } = this.state;
    if (txtName && txtPrice && cmbCategory && imgProduct) {
      const prod = { name: txtName, price: parseInt(txtPrice), category: cmbCategory, image: imgProduct.replace(/^data:image\/[a-z]+;base64,/, '') };
      this.apiPostProduct(prod);
    } else {
      alert('Please input all required fields.');
    }
  }

  btnUpdateClick(e) {
    e.preventDefault();
    const { txtID, txtName, txtPrice, cmbCategory, imgProduct } = this.state;
    if (txtID && txtName && txtPrice && cmbCategory && imgProduct) {
      const prod = { name: txtName, price: parseInt(txtPrice), category: cmbCategory, image: imgProduct.replace(/^data:image\/[a-z]+;base64,/, '') };
      this.apiPutProduct(txtID, prod);
    } else {
      alert('Please input all required fields.');
    }
  }

  btnDeleteClick(e) {
    e.preventDefault();
    if (window.confirm('ARE YOU SURE?')) {
      const id = this.state.txtID;
      if (id) {
        this.apiDeleteProduct(id);
      } else {
        alert('Please input ID.');
      }
    }
  }

  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }

  apiPostProduct(prod) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/products', prod, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
        this.apiGetProducts();
      } else {
        alert('SORRY BABY!');
      }
    });
  }

  apiGetProducts() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/products?page=' + this.props.curPage, config).then((res) => {
      const result = res.data;
      this.props.updateProducts(result.products, result.noPages, result.curPage);
      if (result.products.length !== 0) {
        this.props.updateProducts(result.products, result.noPages, result.curPage);
      } else {
        const curPage = this.props.curPage - 1;
        axios.get('/api/admin/products?page=' + curPage, config).then((res) => {
          const result = res.data;
          this.props.updateProducts(result.products, result.noPages, curPage);
        });
      }
    });
  }

  apiDeleteProduct(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete('/api/admin/products/' + id, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
        this.apiGetProducts();
      } else {
        alert('SORRY BABY!');
      }
    });
  }

  apiPutProduct(id, prod) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/products/' + id, prod, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
        this.apiGetProducts();
      } else {
        alert('SORRY BABY!');
      }
    });
  }
}

export default ProductDetail;
