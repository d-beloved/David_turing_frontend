import React, { Component } from 'react';
import { Card } from 'antd';
import Styles from './product.module.css';

const { Meta } = Card;

class ProductCard extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Card
        className={Styles.Card}
        hoverable
        style={{ width: 240 }}
        cover={(
          <img
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
        )}
      >
        <Meta title="Name of product" description="price" />
      </Card>
    );
  }
}

export default ProductCard;
