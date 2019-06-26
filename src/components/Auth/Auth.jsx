/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import Styles from './auth.module.css';
import { signinUser, signupUser } from '../../actions/authAction';


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

  render() {
    const { name, email, password } = this.state;
    const { isAuthenticated, match, error, location } = this.props;
    const { from } = location.state || { from: { pathname: '/'} }
    const isRegisterPage = match.path === "/signup";
    const promptMessage = isRegisterPage ? "Already a user" : "Not a user";
    const promptAction = isRegisterPage ? "Sign in" : "Sign up";
    const promptPath = isRegisterPage ? "/signin" : "/signup";

    if (isAuthenticated) {
      return <Redirect to={from} />;
    }

    return (
      <container className={Styles.auth}>
        <div className={Styles.card}>
          <Form onSubmit={this.handleSubmit} style={{ width: '300px', outlineColor: 'black' }}>
            <div style={{ fontSize: '25px', color: '#F62F5E' }}>{isRegisterPage ? "Sign Up" : "Sign In"}</div>
            {isRegisterPage ? (
              <Form.Item>
                <Input
                  style={{ outline: 'none' }}
                  onChange={this.handleInputChange}
                  prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                  type="name"
                  placeholder="Name"
                  value={name}
                  name="name"
                  id="name"
                  required
                  minLength="5"
                  maxLength="50"
                />
              </Form.Item>
            ) : null}
            <Form.Item>
              <Input
                style={{ outline: 'none' }}
                onChange={this.handleInputChange}
                prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                id="email"
                autoComplete="email"
                autoFocus
                required
              />
            </Form.Item>
            <Form.Item>
              <Input
                style={{ outline: 'none' }}
                onChange={this.handleInputChange}
                prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                type="password"
                name="password"
                id="password"
                value={password}
                placeholder="Password"
                required
              />
            </Form.Item>
            <Form.Item>
              <Checkbox style={{ float: 'left'}}>Remember me</Checkbox>
            </Form.Item>
            {error && (
              <div
                style={{ color: 'red' }}
                error
                id=""
              >
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
              <Link className={Styles.action} to={promptPath}>
                {' '}
                {
                  promptAction
                }
              </Link>
            </Form.Item>
          </Form>
        </div>
      </container>
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
