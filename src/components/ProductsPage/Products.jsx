import React, { Component, Fragment } from 'react';
import { Jumbotron, Container, Row } from 'react-bootstrap';
import cx from 'classnames';
import { Breadcrumb, Pagination } from 'antd';
import Styles from './products.module.css';
import ProductCard from '../../common/productCard/ProductCard';

class ProductsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
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
        <Pagination defaultCurrent={1} total={50} />
        <Row>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </Row>
        <Pagination defaultCurrent={1} total={50} />
      </Fragment>
    );
  }
}

export default ProductsPage;
