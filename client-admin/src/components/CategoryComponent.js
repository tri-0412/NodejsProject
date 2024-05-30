// Category.jsx

import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import CategoryDetail from './CategoryDetailComponent';
import '../css/category.css';

class Category extends Component {
  static contextType = MyContext;
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      itemSelected: null
    };
  }

  render() {
    const categoryItems = this.state.categories.map((item) => (
      <div
        key={item._id}
        className={`category-item ${this.isSelected(item) ? 'selected-item' : ''}`}
        onClick={() => this.handleItemClick(item)}
      >
        <div>ID: {item._id}</div>
        <div>Name: {item.name}</div>
      </div>
    ));

    return (
      <div className="outer-container">
      <div className="category-container">
        <div className="float-left">
          <h2 className="category-heading">CATEGORY LIST</h2>
          {categoryItems}
        </div>
        <div className="inline" />
        <CategoryDetail item={this.state.itemSelected} updateCategories={this.updateCategories} />
        <div className="float-clear" />
      </div>
      </div>
    );
  }

  updateCategories = (categories) => {
    this.setState({ categories: categories });
  };

  componentDidMount() {
    this.apiGetCategories();
  }

  handleItemClick(item) {
    this.setState({ itemSelected: item });
  }

  isSelected(item) {
    return this.state.itemSelected && this.state.itemSelected._id === item._id;
  }

  apiGetCategories() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/categories', config).then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }
}

export default Category;
