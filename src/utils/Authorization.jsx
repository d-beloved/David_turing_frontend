/* eslint-disable react/prop-types */

import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';


class ProtectedRoute extends Component {
  constructor(props) {
    super(props)
    this.state = {};
  }

  render() {
    const { component: ProtectedComponent, isAuthenticated, ...rest } = this.props
    return (
      <Route
        {...rest}

        render={props => (
          isAuthenticated
            ? <ProtectedComponent {...props} />
            : (
              <Redirect to={{
                pathname: '/signin',
                state: { from: props.location }
              }}
              />
            )
        )}
      />
    );
  }
}

const mapStateToProps = ({auth}) => {
  const { isAuthenticated } = auth;
  return {
    isAuthenticated,
  }
}

export default connect(mapStateToProps, null, null, { pure: false })(ProtectedRoute);
