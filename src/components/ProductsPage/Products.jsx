/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Jumbotron, Container, Row } from 'react-bootstrap';
import cx from 'classnames';
import { Pagination } from 'antd';
import Loader from '../../common/Loader';
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
    const { products, count, loading } = this.props;
    return (
      <Fragment>
        <Jumbotron fluid className={cx(Styles.head)}>
          <Container>
            <h1 className={cx("display-3", Styles.title)}>All Products</h1>
          </Container>
        </Jumbotron>
        <Pagination
          onChange={this.handleProductPageChange}
          defaultCurrent={1}
          total={count}
          defaultPageSize={16}
        />
        <Container>
          {loading ? (
            <Row className={Styles.row}>
              <div className="d-flex">
                <div className="row d-flex justify-content-center">
                  <Loader size="50px" />
                </div>
              </div>
            </Row>
          ) : (
            <Row className={Styles.row}>
              {products &&
                products.map(product => {
                  const { product_id, thumbnail, name, price } = product;
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
          )}
        </Container>
      </Fragment>
    );
  }
}

ProductsPage.propTypes = {
  fetchProducts: PropTypes.func,
  products: PropTypes.array,
  count: PropTypes.number,
  loading: PropTypes.bool
}

const mapStateToProps = state => ({
  products: state.products.data.rows,
  count: state.products.data.count,
  loading: state.products.isLoading
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: (page, limit) => dispatch(getAllProducts(page, limit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);
