/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import cookieParse from 'cookie-parse';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import Styles from './shoppingCart.module.css'
import { deleteCartItem, emptyCart } from '../../actions/shoppingCartAction';

const API = process.env.REACT_APP_IMAGE_BASE_URL;

const cartDelete = {
  color: 'red'
};


function Cart(props) {
  const { cart, emptyCartItem, removeItem } = props;
  const { cartId } = cookieParse.parse(document.cookie);

  if(!cart.length) {
    return(
      <div>Your Cart is Empty, pls visit the store to get your favorite items</div>
    );
  }

  return (
    <Fragment>
      <div className={Styles.flexible}>
        <div className={Styles.heading}>
          {cart.length}
          {' '}
          Item(s) in Your cart
        </div>
        <div
          className={Styles.empty}
          value="Empty your cart"
          tooltip="empty the cart"
        >
          Empty the cart
          <br />
          {' '}
          <Icon
            type="delete"
            onClick={() => emptyCartItem(cartId)}
          />
        </div>
      </div>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Item</th>
            <th />
            <th>Size</th>
            <th>Color</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody className={Styles.name}>
          {cart && cart.map(item => (
            <tr
              key={item.item_id}
            >
              <td>
                <img
                  alt={item.name}
                  src={`${API}/`+item.image}
                />
              </td>
              <td>
                {item.name}
                {'   '}
                <br />
                <Icon
                  styles={cartDelete}
                  type="delete"
                  onClick={() => removeItem(item.item_id)}
                />
              </td>
              <td>{item.attributes.split(',')[0]}</td>
              <td>{item.attributes.split(',')[1]}</td>
              <td>{item.quantity}</td>
              <td>
                $
                {item.subtotal}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className={Styles.flexible}>
        <div>
          <Link
            className={Styles.catalog}
            to='/catalog'
            type='text'
          >
          Continue Shopping
          </Link>
        </div>
        <div>
          <Link
            className={Styles.checkout}
            to='/checkout'
            type='text'
          >
            Checkout
          </Link>
        </div>
      </div>
    </Fragment>
  )
}

const mapStateToProps = state => ({
  cart: state.cart.data
})

const mapDispatchToProps = dispatch => ({
  removeItem: (item_id) => dispatch(deleteCartItem(item_id)),
  emptyCartItem: (cartId) => dispatch(emptyCart(cartId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
