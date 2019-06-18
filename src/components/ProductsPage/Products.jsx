/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Jumbotron, Container, Row } from 'react-bootstrap';
import cx from 'classnames';
import { Breadcrumb, Pagination } from 'antd';
import Styles from './products.module.css';
import ProductCard from '../../common/productCard/ProductCard';
import { getAllProducts } from '../../actions/productAction';

class ProductsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    const {
      fetchProducts
    } = this.props;
    return fetchProducts(1, 16);
  }

  handleProductPageChange = (current, limit) => {
    const { fetchProducts } = this.props;
    fetchProducts(current, limit);
  }

  render() {
    const { products, count } = this.props;
    return (
      <Fragment>
        <Jumbotron fluid className={cx(Styles.head)}>
          <Container>
            <h1 className={cx("display-3", Styles.title)}>All Products</h1>
          </Container>
        </Jumbotron>
        <Breadcrumb separator=">">
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="">All Products</Breadcrumb.Item>
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
    );
  }
}

ProductsPage.propTypes = {
  fetchProducts: PropTypes.func,
  products: PropTypes.array,
  count: PropTypes.number
}

const mapStateToProps = state => ({
  products: state.products.data.rows,
  count: state.products.data.count
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: (page, limit) => dispatch(getAllProducts(page, limit))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);
