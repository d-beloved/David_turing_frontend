/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import cookieParse from 'cookie-parse';
import { Table, Button } from 'react-bootstrap';
import { Icon } from 'antd';
import { deleteCartItem, emptyCart } from '../../actions/shoppingCartAction';

const API = process.env.REACT_APP_IMAGE_BASE_URL;

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
      <div>
        {cart.length}
        {' '}
        Item(s) in Your cart
      </div>
      <div
        value="Empty your cart"
      >
        <Icon
          type="delete"
          onClick={() => emptyCartItem(cartId)}
        />
      </div>
      <Table striped bordered hover>
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
        <tbody>
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
                <Icon
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
      <Button variant="primary" href="/catalog">Back to Shop</Button>
      <Button variant="danger" href="/checkout">Checkout</Button>
    </Fragment>
  )
}

const mapStateToProps = state => ({
  cart: state.getCartProduct.data
})

const mapDispatchToProps = dispatch => ({
  removeItem: (item_id) => dispatch(deleteCartItem(item_id)),
  emptyCartItem: (cartId) => dispatch(emptyCart(cartId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
