/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button
} from 'react-bootstrap';
import { getAllDepartments } from '../../actions/departmentAction';
import Styles from './header.module.css';


class Header extends  Component {
  componentDidMount = () => {
    const {
      listDepartment
    } = this.props;
    return listDepartment();
  }
  render() {
    const { department } = this.props;
    return (
      <Container>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">SHOPMATE</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {department && department.map(items => (
                (
                  <NavDropdown title={items.name} id="basic-nav-dropdown" key={items.department_id}>
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                    Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                    Something
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                    Separated link
                    </NavDropdown.Item>
                  </NavDropdown>
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
            <i className={cx('fas fa-shopping-bag', Styles.shopcart)} />
            <span className={cx(Styles.badge, Styles.lblCartCount, 'badge-danger')}> 5 </span>
            <a href="/signin">Sign in</a>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    );
  }
}

Header.propTypes = {
  listDepartment: PropTypes.func,
  department: PropTypes.array
}

const mapStateToProps = state => ({
  data: state.department
});

const mapDispatchToProps = dispatch => ({
  listDepartment: () => dispatch(getAllDepartments())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
