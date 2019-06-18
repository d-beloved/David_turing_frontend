/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Jumbotron, Container, Button, Col, Row } from 'react-bootstrap';
import cx from 'classnames';
import { Collapse, Icon } from 'antd';
import Styles from './homepage.module.css';
import ProductCard from '../../common/productCard/ProductCard';
import { getAllProducts } from '../../actions/productAction';
import { getAllCategories } from '../../actions/categoryAction'
import { getAllDepartments } from '../../actions/departmentAction'

const Panel = Collapse.Panel;

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
    // const featuredProducts = products.slice(8, 15);
    // for (let i = 0; i < 6; i++) {
    //   console.log('holla', feat);
    //   const product = products[(Math.floor(Math.random()*10) + 1)];
    //   featuredProducts.push(product);
    // }
    return (
      <Fragment>
        <Jumbotron fluid className={cx(Styles.head)}>
          <Container>
            <h1 className={cx("display-3", Styles.title)}>Hello, world!</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component
              for calling extra attention to featured content or
              information.
            </p>
            <p>
              <Button href="/catalog" variant="primary">Go Shopping</Button>
            </p>
          </Container>
        </Jumbotron>
        <Row>
          <Col md="4" className={Styles.filter}>
            <Collapse
              defaultActiveKey={['1', '2']}
              bordered={false}
              expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
            >
              <div>FILTER</div>
              <Panel header="Departments" key="1" className={Styles.customPanelStyle}>
                { departments && departments.map(department => {
                  const { department_id, name } = department;
                  return (
                    <p key={department_id}>{name}</p>
                  )
                })}
              </Panel>
              <Panel header="Categories" key="2" className={Styles.customPanelStyle}>
                { categories && categories.map(category => {
                  const { name, category_id } = category;
                  return (
                    <p key={category_id}>{name}</p>
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
          <Container>
            <h1 className={cx("display-3", Styles.title)}>Hello, world!</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component
              for calling extra attention to featured content or
              information.
            </p>
            <p>
              <Button href="/products" variant="primary">Shop</Button>
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
