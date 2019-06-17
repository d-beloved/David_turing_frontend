import React, { Component, Fragment } from 'react';
import cx from 'classnames';
import { Container, Row } from 'react-bootstrap';
import Styles from './productDetail.module.css';
import ProductCard from '../../common/productCard/ProductCard';

class ProductDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  render () {
    return (
      <Fragment>
        <div className='container'>
          <div className={Styles.card}>
            <div className="container-fluid">
              <div className={cx(Styles.wrapper, "row")}>
                <div className={cx(Styles.preview, "col-md-6")}>
                  <div className={cx(Styles['preview-pic'], Styles['tab-content'])}>
                    <img alt="preview" src="https://res.cloudinary.com/dbeloved/image/upload/v1556393299/product_images/wreath.gif" />
                  </div>
                </div>
                <div className={cx(Styles.details, "col-md-6")}>
                  <h3 className={Styles["product-title"]}>Name of the Product</h3>
                  <h4 className={Styles.price}>
                    {' '}
                    <span>$180</span>
                  </h4>
                  <p className={Styles["product-description"]}>Product description, can be anything you want as long as it is within the jurisdiction of power.</p>
                  <h5 className={Styles.colors}>
                    <p className={Styles['small-header']}>Colors</p>
                    <span className={cx(Styles.color, Styles.white)} />
                    <span className={cx(Styles.color, Styles.black)} />
                    <span className={cx(Styles.color, Styles.red)} />
                    <span className={cx(Styles.color, Styles.orange)} />
                    <span className={cx(Styles.color, Styles.yellow)} />
                    <span className={cx(Styles.color, Styles.green)} />
                    <span className={cx(Styles.color, Styles.blue)} />
                    <span className={cx(Styles.color, Styles.indigo)} />
                    <span className={cx(Styles.color, Styles.purple)} />
                  </h5>
                  <h5 className={Styles.sizes}>
                    <p className={Styles['small-header']}>Sizes</p>
                    <span className={Styles.size} data-toggle="tooltip" title="small">S</span>
                    <span className={Styles.size} data-toggle="tooltip" title="medium">M</span>
                    <span className={Styles.size} data-toggle="tooltip" title="large">L</span>
                    <span className={Styles.size} data-toggle="tooltip" title="xtra large">XL</span>
                    <span className={Styles.size} data-toggle="tooltip" title="xtra xtra large">XXL</span>
                  </h5>
                  <p className={Styles['small-header']}>Quantity</p>
                  <div className={Styles.qty}>
                    <span className={Styles.minus}>-</span>
                    <input type="number" className={cx(Styles.count, Styles.input)} name="qty" value="1" />
                    <span className={Styles.plus}>+</span>
                  </div>
                  <div className="action">
                    <button className={cx(Styles["add-to-cart"], "btn btn-default")} type="button">Add to cart</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Container>
          <div className={Styles.others}>You may also like</div>
          <Row>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default ProductDetails;
