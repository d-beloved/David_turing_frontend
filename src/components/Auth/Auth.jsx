/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Form, Icon, Input, Button } from 'antd';
import Styles from './auth.module.css';
import { signinUser, signupUser } from '../../actions/authAction';


// function validatePassword(value) {
//   if (value) {
//     return {
//       validateStatus: 'success',
//       errorMsg: null,
//     };
//   }
//   return {
//     validateStatus: 'error',
//     errorMsg: 'Please input your Password!',
//   };
// }

// function validateName(value) {
//   if (value.length < 5 || value.length > 50) {
//     return {
//       validateStatus: 'error',
//       errorMsg: 'Name should be more than 5 characters!'
//     }
//   }
//   return {
//     validateStatus: 'success',
//     errorMsg: null
//   }
// }

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: ""
    };
  }

  handleInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { handleLogin, handleSignup, match } = this.props;
    const { name, email, password } = this.state;
    const signupDetails = { name, email, password };
    const signinDetails = { email, password };
    const isRegisterPage = match.path === "/signup";
    if (isRegisterPage) {
      return handleSignup(signupDetails);
    }
    return handleLogin(signinDetails);
  };

  // rules: [{ required: true, min: 5, max: 50, message: 'Name should be more than 5 characters!' }],
  // rules: [
  //   { type: 'email', message: 'The input is not valid E-mail!' },
  //   { required: true, message: 'Please input your Email!' }
  // ],
  // rules: [{ required: true, message: 'Please input your Password!' }],

  render() {
    const { name, email, password } = this.state;
    const { isAuthenticated, match, error } = this.props;
    const isRegisterPage = match.path === "/signup";
    const promptMessage = isRegisterPage ? "Already a user" : "Not a user";
    const promptAction = isRegisterPage ? "Sign in" : "Sign up";
    const promptPath = isRegisterPage ? "/signin" : "/signup";

    if (isAuthenticated) {
      return <Redirect to="" />;
    }

    return (
      <Form onSubmit={this.handleSubmit} className={Styles.login_form}>
        <div>{isRegisterPage ? "Sign Up" : "Sign In"}</div>
        {isRegisterPage ? (
          <Form.Item>
            <Input
              onChange={this.handleInputChange}
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="name"
              placeholder="Name"
              value={name}
              name="name"
              id="name"
            />
          </Form.Item>
        ) : null}
        <Form.Item>
          <Input
            onChange={this.handleInputChange}
            prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            id="email"
            autoComplete="email"
            autoFocus
          />
        </Form.Item>
        <Form.Item>
          <Input
            onChange={this.handleInputChange}
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            name="password"
            id="password"
            value={password}
            placeholder="Password"
          />
        </Form.Item>
        {error && (
          <div error id="">
            {error}
          </div>
        )}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={Styles.login_form_button}
          >
            {isRegisterPage ? "Sign up" : "Sign in"}
          </Button>
          {promptMessage}
          <Link to={promptPath}>
            {' '}
            {
              promptAction
            }
          </Link>
        </Form.Item>
      </Form>
    );
  }
}


Auth.propTypes = {
  isAuthenticated: PropTypes.bool,
  match: PropTypes.object,
  handleLogin: PropTypes.func,
  handleSignup: PropTypes.func,
  error: PropTypes.string
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.isLoading,
  user: state.auth.user,
  error: state.auth.error
});

const mapDispatchToProps = dispatch => ({
  handleSignup: (signupDetails) => dispatch(signupUser(signupDetails)),
  handleLogin: (signinDetails) => dispatch(signinUser(signinDetails))
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
