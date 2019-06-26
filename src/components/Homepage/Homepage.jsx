/* eslint-disable react/jsx-key */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Jumbotron, Container, Button, Col, Row } from 'react-bootstrap';
import cx from 'classnames';
import { Collapse } from 'antd';
import Styles from './homepage.module.css';
import ProductCard from '../../common/productCard/ProductCard';
import { getAllProducts } from '../../actions/productAction';
import { getAllCategories } from '../../actions/categoryAction'
import { getAllDepartments } from '../../actions/departmentAction'

const Panel = Collapse.Panel;

const filterStyle = {
  color: '#f62f5e'
};

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    const {
      fetchProducts,
      fetchCategory,
      fetchDepartment
    } = this.props;
    fetchProducts(1, 6);
    fetchDepartment();
    return fetchCategory();
  }

  render() {
    const { products, categories, departments } = this.props;
    return (
      <Fragment>
        <Jumbotron fluid className={cx(Styles.head)}>
          <Container className={Styles.topText}>
            <h1 className={cx("display-3", Styles.title)}>Amazing Shirts at amazing prices</h1>
            <p className={Styles.subtitle}>
              Get nice t-shirts at amazing prices
              <br />
              with discount on every 2 items purchased
              <br />
              Visit the store now...
            </p>
            <p>
              <Button className={Styles.btn} href="/catalog" variant="primary">Go Shopping</Button>
            </p>
          </Container>
        </Jumbotron>
        <Row>
          <Col md="4" className={Styles.filter}>
            <Collapse
              defaultActiveKey={['1', '2']}
              bordered={false}
            >
              <div className={Styles.filHead}>FILTER</div>
              <Panel header="Departments" key="1" className={Styles.customPanelStyle} showArrow={false}>
                { departments && departments.map(department => {
                  const { department_id, name } = department;
                  return (
                    <Link
                      key={department_id.toString()}
                      to={`/catalog/department/${department_id}`}
                    >
                      <p style={filterStyle}>{name}</p>
                    </Link>
                  )
                })}
              </Panel>
              <Panel header="Categories" key="2" className={Styles.customPanelStyle} showArrow={false}>
                { categories && categories.map(category => {
                  const { name, category_id } = category;
                  return (
                    <Link
                      key={category_id.toString()}
                      to={`/catalog/category/${category_id}`}
                    >
                      <p style={filterStyle}>{name}</p>
                    </Link>
                  );
                })}
              </Panel>
            </Collapse>
          </Col>
          <Col md="8">
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
          </Col>
        </Row>
        <Jumbotron fluid className={cx(Styles.bottom)}>
          <Container className={Styles.topText}>
            <h1 className={cx("display-3", Styles.title)}>Check premium items</h1>
            <p className={Styles.subtitle}>
              And they come at unbelievable prices
            </p>
            <p>
              <Button className={Styles.btn} href="/catalog" variant="primary">Go to Shop</Button>
            </p>
          </Container>
        </Jumbotron>
      </Fragment>
    );
  }
}

Homepage.propTypes = {
  fetchProducts: PropTypes.func,
  products: PropTypes.array,
  categories: PropTypes.array,
  departments: PropTypes.array,
  fetchCategory: PropTypes.func,
  fetchDepartment: PropTypes.func
}

const mapStateToProps = state => ({
  products: state.products.data.rows,
  categories: state.category.data.rows,
  departments: state.department.data
});

const mapDispatchToProps = dispatch => ({
  fetchProducts: (page, limit) => dispatch(getAllProducts(page, limit)),
  fetchCategory: () => dispatch(getAllCategories()),
  fetchDepartment: () => dispatch(getAllDepartments())
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
