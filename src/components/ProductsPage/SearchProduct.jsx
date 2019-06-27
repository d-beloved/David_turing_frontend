/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-state */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Jumbotron, Container, Row } from 'react-bootstrap';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { Pagination } from 'antd';
import Loader from '../../common/Loader';
import Styles from './products.module.css';
import ProductCard from '../../common/productCard/ProductCard';
import { searchForProduct } from '../../actions/productAction';


class SearchProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  componentDidMount = () => {
    const {
      fetchSearchResult
    } = this.props;

    const { search } = window.location;
    const decodedString = decodeURIComponent(search.substring(1));

    return fetchSearchResult(decodedString, 1, 16)
  }

  componentDidUpdate(prevProps) {
    const { fetchSearchResult, location: { pathname } } = this.props;
    if (pathname !== prevProps.location.pathname) {
      return fetchSearchResult();
    }
  }

  handlePageChange = (current, limit) => {
    const { fetchDepartmentProduct, location: { pathname }} = this.props;
    fetchDepartmentProduct(pathname, current, limit)
  }

  render() {
    const { products, count, loading } = this.props;
    return (
      <Fragment>
        <Jumbotron fluid className={cx(Styles.head)}>
          <Container>
            <h1 className={cx("display-3", Styles.title)}>
              Search Results
            </h1>
          </Container>
        </Jumbotron>
        {products && products.length ? (
          <Pagination
            onChange={this.handlePageChange}
            defaultCurrent={1}
            total={count}
            defaultPageSize={16}
          />
        ) : null}
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
              {products && products.length ? (
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
                })
              ) : (
                <div>
                  <div className={Styles.how}>
                    Your search is empty, we don&lsquo;t have that item in the store
                  </div>
                  <Link
                    className={Styles.catalog}
                    to="/catalog"
                    type="text"
                  >
                    Back to Shop
                  </Link>
                </div>
              )}
            </Row>
          )}
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products.data.rows,
  count: state.products.data.count,
  loading: state.products.isLoading
})

const mapDispatchToProps = dispatch => ({
  fetchSearchResult: (query_string, page, limit) => dispatch(searchForProduct(query_string, page, limit))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchProduct);
