/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import Styles from './product.module.css';

const API = process.env.REACT_APP_IMAGE_BASE_URL;

const { Meta } = Card;

const ProductCard = (props) => {
  const { thumbnail, price, name, product_id } = props;
  const image = `${API}/`+thumbnail;
  const pricing = "$"+price;
    return (
      <Card
        className={Styles.Card}
        hoverable
        style={{ width: 240 }}
        cover={(
          <img
            alt={name}
            src={image}
          />
        )}
      >
        <Meta title={name} description={pricing} />
        <Link to={`/catalog/product/${product_id}`}>
          <div className={Styles.middle}>
            <div className={Styles.text}>View Details</div>
          </div>
        </Link>
      </Card>
    );
}

export default ProductCard;
