/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button
} from 'react-bootstrap';
import Styles from './header.module.css';
import { getAllDepartments } from '../../actions/departmentAction';
import { getCartProduct } from '../../actions/shoppingCartAction';


class Header extends  Component {
  componentDidMount = () => {
    const {
      listDepartment,
      getCartItems
    } = this.props;
    getCartItems();
    return listDepartment();
  }
  render() {
    const { department, cart, ...rest } = this.props;
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/" className={Styles.header}>SHOPMATE</Navbar.Brand>
        <Navbar.Toggle {...rest} aria-controls="basic-navbar-nav" />
        <Navbar.Collapse {...rest} id="basic-navbar-nav">
          <Nav variant="pill" className={cx(Styles.navigation, "mr-auto")}>
            {department.length > 0 && department.map(items => (
              (
                <Nav.Item key={items.department_id}>
                  <Nav.Link id="basic-nav-dropdown">{items.name}</Nav.Link>
                </Nav.Item>
              )
            ))}
          </Nav>
          <Form inline>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Link
            to="/cart"
            className={Styles.bag}
          >
            <i className={cx('fas fa-shopping-bag', Styles.shopcart)} />
            <span className={cx(Styles.badge, Styles.lblCartCount, 'badge-danger')}>{cart.length}</span>
          </Link>
          <a href="/signin" className={Styles.bag}>Sign in</a>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

Header.propTypes = {
  listDepartment: PropTypes.func,
  department: PropTypes.array,
  getCartItems: PropTypes.func,
  cart: PropTypes.array
}

const mapStateToProps = state => ({
  department: state.department.data,
  cart: state.getCartProduct.data,
});

const mapDispatchToProps = dispatch => ({
  listDepartment: () => dispatch(getAllDepartments()),
  getCartItems: () => dispatch(getCartProduct())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
