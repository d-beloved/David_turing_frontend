import React, { Component, Fragment } from 'react';
import { Jumbotron, Container, Button, Col, Row } from 'react-bootstrap';
import cx from 'classnames';
import { Collapse, Icon } from 'antd';
import Styles from './homepage.module.css';
import ProductCard from '../../common/productCard/ProductCard';

const Panel = Collapse.Panel;

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
                <p>Department 1</p>
                <p>Department 2</p>
                <p>Department 3</p>
              </Panel>
              <Panel header="Categories" key="2" className={Styles.customPanelStyle}>
                <p>Category 1</p>
                <p>Category 2</p>
                <p>Category 3</p>
                <p>Category 4</p>
                <p>Category 5</p>
                <p>Category 6</p>
                <p>Category 7</p>
              </Panel>
            </Collapse>
          </Col>
          <Col md="8">
            <Row>
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
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

export default Homepage;
