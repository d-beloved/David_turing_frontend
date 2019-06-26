/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-state */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Jumbotron, Container, Row } from 'react-bootstrap';
import cx from 'classnames';
import { Pagination } from 'antd';
import Styles from './products.module.css';
import ProductCard from '../../common/productCard/ProductCard';
import { getProductIndepartment } from '../../actions/productAction';
import { getDepartments } from '../../actions/departmentAction';


class DepartmentProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      department_id: null
    };
  }

  componentDidMount = () => {
    const {
      fetchDepartmentProduct,
      fetchDepartment,
      match
    } = this.props;
    const id = match.params.department_id;
    this.setState({
      department_id: id
    })
    fetchDepartment(id);
    return fetchDepartmentProduct(id, 1, 16)
  }

  componentDidUpdate(prevProps) {
    const { fetchDepartmentProduct, fetchDepartment, match } = this.props;
    if (prevProps.match.params.department_id !== match.params.department_id) {
      fetchDepartment(match.params.department_id)
      return fetchDepartmentProduct(match.params.department_id, 1, 16);
    }
  }

  handlePageChange = (current, limit) => {
    const { fetchDepartmentProduct, match } = this.props;
    const id = match.params.department_id;
    fetchDepartmentProduct(id, current, limit)
  }

  render() {
    const { products, count, departments } = this.props;
    return (
      <Fragment>
        <Jumbotron fluid className={cx(Styles.head)}>
          <Container>
            <h1 className={cx("display-3", Styles.title)}>{departments.name}</h1>
          </Container>
        </Jumbotron>
        <Pagination
          onChange={this.handlePageChange}
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
      </Fragment>
    )
  }
}

DepartmentProduct.propTypes = {
  fetchDepartment: PropTypes.func,
  fetchDepartmentProduct: PropTypes.func,
  products: PropTypes.array,
  count: PropTypes.number,
  departments: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      department_id: PropTypes.string
    })
  }),
}

const mapStateToProps = state => ({
  products: state.products.data.rows,
  count: state.products.data.count,
  departments: state.department.department
})

const mapDispatchToProps = dispatch => ({
  fetchDepartment: (department_id) => dispatch(getDepartments(department_id)),
  fetchDepartmentProduct: (department_id, page, limit) => dispatch(getProductIndepartment(department_id, page, limit))
})

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentProduct);
