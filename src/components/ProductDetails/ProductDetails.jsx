/* eslint-disable react/no-unused-state */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cx from 'classnames';
import cookieParse from 'cookie-parse';
import { Container, Row } from 'react-bootstrap';
import Styles from './productDetail.module.css';
import ProductCard from '../../common/productCard/ProductCard';
import { getAllProducts, getOneProduct } from '../../actions/productAction';
import { getProductAttribute } from '../../actions/attributeAction';
import { addProductToCart } from '../../actions/shoppingCartAction';
import * as types from '../../actions/actionTypes';
import ShowMessage from '../../utils/showMessage';

const API = process.env.REACT_APP_IMAGE_BASE_URL;

class ProductDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      color: 'Select color',
      size: 'Select size',
      quantity: 1,
      showSuccessMessage: false,
      product_id: null
    };
  }

  componentDidMount = () => {
    const {
      fetchProductDetail,
      fetchProductAttributes,
      fetchProducts,
      match
    } = this.props;
    const id = match.params.product_id;
    this.setState({
      product_id: id
    })
    fetchProductDetail(id);
    fetchProductAttributes(id);
    return fetchProducts(1, 4);
  }

  componentDidUpdate(prevProps) {
    const { fetchProductDetail, match, fetchProductAttributes } = this.props;
    if (prevProps.match.params.product_id !== match.params.product_id) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        color: 'Select color',
        size: 'Select size',
        quantity: 1,
      })
      fetchProductAttributes(match.params.product_id);
      return fetchProductDetail(match.params.product_id);
    }
  }

  handleColor = (event) => {
    event.preventDefault();
    this.setState({
      color: event.target.name
    });
  }

  handleSize = (event) => {
    event.preventDefault();
    this.setState({
      size: event.target.value
    });
  }

  handleDecreaseQuantity = (event) => {
    event.preventDefault();
    const { quantity } = this.state;
    const newState = quantity - 1;
    this.setState({
      quantity: newState
    });
  }

  handleIncreaseQuantity = (event) => {
    event.preventDefault();
    const { quantity } = this.state;
    const newState = quantity + 1;
    this.setState({
      quantity: newState
    });
  }

  handleAddToCart = async (event) => {
    const {
      color, size, quantity, product_id
    } = this.state;
    const { addToCart } = this.props;
    const { cartId } = cookieParse.parse(document.cookie);
    const attributes = `${size},${color}`;
    const itemData = { product_id, quantity, cartId, attributes };
    event.preventDefault();
    const status = await addToCart(itemData);
      if (status.type === types.ADD_TO_CART_SUCCESS) {
        this.setState({
          quantity: 1,
          size: 'Select size',
          color: 'Select color',
          showSuccessMessage: true,
        });
      }
  };

  closeMessage = () => {
    this.setState({
      showSuccessMessage: false,
    });
  }

  render () {
    const { products, productDetail, attributes } = this.props;
    const { image, name, price, description } = productDetail;
    const { size, color, quantity, showSuccessMessage } = this.state;
    const productImage = `${API}/`+image;

    return (
      <Fragment>
        <div className='container'>
          { showSuccessMessage ? (
            <ShowMessage
              openMessage={showSuccessMessage}
              onClose={this.closeMessage}
            />
          ) : null }
          <div className={Styles.card}>
            <div className="container-fluid">
              <div className={cx(Styles.wrapper, "row")}>
                <div className={cx(Styles.preview, "col-md-6")}>
                  <div className={cx(Styles['preview-pic'], Styles['tab-content'])}>
                    <img alt="preview" src={productImage} />
                  </div>
                </div>
                <div className={cx(Styles.details, "col-md-6")}>
                  <h3 className={Styles["product-title"]}>{name}</h3>
                  <h4 className={Styles.price}>
                    {' '}
                    <span>
                      $
                      {price}
                    </span>
                  </h4>
                  <p className={Styles["product-description"]}>{description}</p>
                  <h5 className={Styles.colors}>
                    <p className={Styles['small-header']}>{color}</p>
                    { attributes && attributes.map(attribute => {
                      const { attribute_value_id, attribute_value, attribute_name } = attribute;
                      if (attribute_name === 'Color') {
                        return (
                          <span key={attribute_value_id}>
                            <input
                              className={Styles.color}
                              style={{ backgroundColor: attribute_value }}
                              type='button'
                              onClick={this.handleColor}
                              name={attribute_value}
                            />
                            {' '}
                          </span>
                        );
                      }
                      return null;
                    })}
                  </h5>
                  <h5 className={Styles.sizes}>
                    <p className={Styles['small-header']}>{size}</p>
                    { attributes && attributes.map(attribute => {
                      const { attribute_value_id, attribute_value, attribute_name } = attribute;
                      if (attribute_name === 'Size') {
                        return (
                          <span key={attribute_value_id}>
                            <input
                              className={Styles.size}
                              type='button'
                              data-toggle="tooltip"
                              onClick={this.handleSize}
                              title={attribute_value}
                              value={attribute_value}
                            />
                            {' '}
                          </span>
                        );
                      }
                      return null;
                    })}
                  </h5>
                  <p className={Styles['small-header']}>Quantity</p>
                  <div className={Styles.qty}>
                    <span>
                      <input
                        className={Styles.minus}
                        type="button"
                        onClick={this.handleDecreaseQuantity}
                        value="-"
                        disabled={
                          quantity === 1
                        }
                      />
                    </span>
                    <input type="button" className={cx(Styles.count, Styles.input)} name="qty" value={quantity} />
                    <span>
                      <input
                        className={Styles.plus}
                        type="button"
                        onClick={this.handleIncreaseQuantity}
                        value="+"
                        disabled={
                          quantity === 10
                        }
                      />
                    </span>
                  </div>
                  <div className="action">
                    <button
                      className={Styles.btn}
                      type="button"
                      onClick={this.handleAddToCart}
                      disabled={
                        color === null
                        || color === 'Select color'
                        || size === null
                        || size === 'Select size'
                      }
                    >
                    Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Container>
          <div className={Styles.others}>You may also like</div>
          <Row className={Styles.row}>
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
    );
  }
}

ProductDetails.propTypes = {
  fetchProducts: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  fetchProductDetail: PropTypes.func.isRequired,
  product_id: PropTypes.number.isRequired,
  productDetail: PropTypes.object.isRequired,
  fetchProductAttributes: PropTypes.func.isRequired,
  attributes: PropTypes.array.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      product_id: PropTypes.string
    })
  }),
  addToCart: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  products: state.products.data.rows,
  productDetail: state.products.oneProduct,
  attributes: state.attributes.data
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: (page, limit) => dispatch(getAllProducts(page, limit)),
  fetchProductDetail: (product_id) => dispatch(getOneProduct(product_id)),
  fetchProductAttributes: (product_id) => dispatch(getProductAttribute(product_id)),
  addToCart: (itemData) => dispatch(addProductToCart(itemData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
