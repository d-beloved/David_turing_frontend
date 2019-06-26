/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Jumbotron, Container, Row } from 'react-bootstrap';
import cx from 'classnames';
import { Breadcrumb, Pagination } from 'antd';
import Styles from './products.module.css';
import ProductCard from '../../common/productCard/ProductCard';
import { getProductInCategory } from '../../actions/productAction';
import { getCategory } from '../../actions/categoryAction';


class CategoryProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category_id: null
    };
  }

  componentDidMount = () => {
    const {
      fetchCategoryProduct,
      fetchCategory,
      match
    } = this.props;
    const id = match.params.category_id;
    this.setState({
      category_id: id
    })
    fetchCategory(id);
    return fetchCategoryProduct(id, 1, 16)
  }

  componentDidUpdate(prevProps) {
    const { fetchCategoryProduct, fetchCategory, match } = this.props;
    if (prevProps.match.params.category_id !== match.params.category_id) {
      fetchCategory(match.params.category_id)
      return fetchCategoryProduct(match.params.category_id, 1, 16);
    }
  }

  handlePageChange = (current, limit) => {
    const { fetchCategoryProduct } = this.props;
    fetchCategoryProduct(current, limit)
  }

  render() {
    const { products, count, category } = this.props;
    return (
      <Fragment>
        <Jumbotron fluid className={cx(Styles.head)}>
          <Container>
            <h1 className={cx("display-3", Styles.title)}>{category.name}</h1>
          </Container>
        </Jumbotron>
        <Breadcrumb separator=">">
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="">{category.name}</Breadcrumb.Item>
        </Breadcrumb>
        <Pagination
          onChange={this.handleProductPageChange}
          defaultCurrent={1}
          total={count}
          defaultPageSize={16}
        />
        <Container>
          <Row>
            { products && products.map(product => {
              const {product_id, thumbnail, name, price } = product;
              return (
                <ProductCard
                  key={product_id}
                  product_id={product_id}
                  thumbnail={thumbnail}
                  name={name}
                  price={price}
                />
              );
            })}
          </Row>
        </Container>
        <Pagination
          onChange={this.handleProductPageChange}
          defaultCurrent={1}
          total={count}
          defaultPageSize={16}
        />
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products.data.rows,
  count: state.products.data.count,
  category: state.category.category
})

const mapDispatchToProps = dispatch => ({
  fetchCategoryProduct: (category_id, page, limit) => dispatch(getProductInCategory(category_id, page, limit)),
  fetchCategory: (category_id) => dispatch(getCategory(category_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryProduct);
