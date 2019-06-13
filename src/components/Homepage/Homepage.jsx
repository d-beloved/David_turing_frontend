import React, { Component, Fragment } from 'react';
import { Jumbotron, Container, Button, Col, Row } from 'react-bootstrap';
import cx from 'classnames';
import Styles from './homepage.module.css';
import ProductCard from '../../common/productCard/ProductCard';


class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
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
              <Button variant="primary">Learn more</Button>
            </p>
          </Container>
        </Jumbotron>
        <Container>
          <Row>
            <Col md="3">
              Filter
            </Col>
            <Col md="9">
              <ProductCard />
              <ProductCard />
            </Col>
            <Col md="3">
              <ProductCard />
              <ProductCard />
            </Col>
            <Col md="3">
              <ProductCard />
              <ProductCard />
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default Homepage;
