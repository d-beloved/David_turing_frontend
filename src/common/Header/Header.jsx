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
} from 'react-bootstrap';
import Styles from './header.module.scss';
import { getAllDepartments } from '../../actions/departmentAction';
import { getCartProduct } from '../../actions/shoppingCartAction';
import { logout } from '../../actions/authAction';



const divStyles= {
  background: 'black'
};

const nav = {
  fontWeight: 'bold',
  fontSize: '17px',
  verticalAlign: 'text-bottom',
  color: 'white',
}

const navBar = {
  fontWeight: 'bold',
  color: '#F62F5E',
  fontSize: '30px',
}

const navbarToggler = {
  backgroundColor: 'white'
}

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

  handleSearchChange = event => {
    this.setState({
      search: event.target.value,
    });
  };

  handleSearch = event => {
    event.preventDefault();
    if (this.state !== null) {
      const { search } = this.state;
      window.location.replace(`/catalog/search?${search}`);
    }
  };

  render() {
    const { department, cart, isAuthenticated, ...rest } = this.props;
    return (
      <container>
        <Navbar style={divStyles} expand="lg">
          <Navbar.Brand href="/" style={navBar}>
            SHOPMATE
          </Navbar.Brand>
          <Navbar.Toggle style={navbarToggler} {...rest} aria-controls="basic-navbar-nav" />
          <Navbar.Collapse {...rest} id="basic-navbar-nav">
            <Nav variant="pill" className="mr-auto">
              {department.length > 0 &&
                department.map(items => (
                  <Nav.Item
                    className={Styles.navItem}
                    key={items.department_id}
                  >
                    <Nav.Link
                      style={nav}
                      href={`/catalog/department/${items.department_id}`}
                      id="basic-nav-dropdown"
                    >
                      {items.name}
                    </Nav.Link>
                  </Nav.Item>
                ))}
            </Nav>
            <form inline className={cx(Styles.wrap, "mr-sm-2")} onSubmit={this.handleSearch}>
              <div className={Styles.search}>
                <input
                  type="text"
                  onChange={this.handleSearchChange}
                  className={Styles.searchTerm}
                  placeholder="search..."
                />
                <button type="submit" className={Styles.searchButton}>
                  <i className={cx("fa fa-search", Styles.icon)} />
                </button>
              </div>
            </form>
            <Link to="/cart" className={Styles.a}>
              <i className={cx("fas fa-shopping-bag", Styles.shopcart)} />
              <span
                className={cx(
                  Styles.badge,
                  Styles.lblCartCount,
                  "badge-danger"
                )}
              >
                {cart.length}
              </span>
            </Link>
            {isAuthenticated ? (
              <Link to="/" className={Styles.auth} onClick={this.handleLogout}>
                Log-out
              </Link>
            ) : (
              <Link to="/signin" className={Styles.auth}>
                Sign In
              </Link>
            )}
          </Navbar.Collapse>
        </Navbar>
      </container>
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
  cart: state.cart.data,
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  listDepartment: () => dispatch(getAllDepartments()),
  getCartItems: () => dispatch(getCartProduct()),
  logoutUser: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
