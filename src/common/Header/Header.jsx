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
import { logout } from '../../actions/authAction';


class Header extends  Component {
  componentDidMount = () => {
    const {
      listDepartment,
      getCartItems
    } = this.props;
    getCartItems();
    return listDepartment();
  }

  handleLogout = () => {
    const { logoutUser } = this.props;
    logoutUser();
  }

  render() {
    const { department, cart, isAuthenticated, ...rest } = this.props;
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
          {isAuthenticated ? (
            <Link to='/' onClick={this.handleLogout}>LogOut</Link>
          ) : <Link to='/signin' className={Styles.bag}>Sign In</Link>}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

Header.propTypes = {
  listDepartment: PropTypes.func,
  department: PropTypes.array,
  getCartItems: PropTypes.func,
  cart: PropTypes.array,
  logoutUser: PropTypes.func,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  department: state.department.data,
  cart: state.getCartProduct.data,
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  listDepartment: () => dispatch(getAllDepartments()),
  getCartItems: () => dispatch(getCartProduct()),
  logoutUser: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
