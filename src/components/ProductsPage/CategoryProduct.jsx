/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Jumbotron, Container, Row } from 'react-bootstrap';
import cx from 'classnames';
import { Pagination } from 'antd';
import Loader from '../../common/Loader';
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
    const { fetchCategoryProduct, match } = this.props;
    const id = match.params.category_id;
    fetchCategoryProduct(id, current, limit)
  }

  render() {
    const { products, count, category, loading } = this.props;
    return (
      <Fragment>
        <Jumbotron fluid className={cx(Styles.head)}>
          <Container>
            <h1 className={cx("display-3", Styles.title)}>
              {category.name}
            </h1>
          </Container>
        </Jumbotron>
        <Pagination
          onChange={this.handlePageChange}
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

const mapStateToProps = state => ({
  products: state.products.data.rows,
  count: state.products.data.count,
  category: state.category.category,
  loading: state.products.isLoading
})

const mapDispatchToProps = dispatch => ({
  fetchCategoryProduct: (category_id, page, limit) => dispatch(getProductInCategory(category_id, page, limit)),
  fetchCategory: (category_id) => dispatch(getCategory(category_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryProduct);
