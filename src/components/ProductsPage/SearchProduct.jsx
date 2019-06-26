/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-state */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Jumbotron, Container, Row } from 'react-bootstrap';
import cx from 'classnames';
import { Pagination } from 'antd';
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

  handlePageChange = (decodedString, current, limit) => {
    const { fetchDepartmentProduct } = this.props;
    fetchDepartmentProduct(decodedString, current, limit)
  }

  render() {
    const { products, count } = this.props;
    return (
      <Fragment>
        <Jumbotron fluid className={cx(Styles.head)}>
          <Container>
            <h1 className={cx("display-3", Styles.title)}>Search Results</h1>
          </Container>
        </Jumbotron>
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
  count: state.products.data.count
})

const mapDispatchToProps = dispatch => ({
  fetchSearchResult: (query_string, page, limit) => dispatch(searchForProduct(query_string, page, limit))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchProduct);
