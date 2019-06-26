/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Row, Col, Toast } from 'react-bootstrap';

class ShowMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.openMessage !== prevState.show) {
      return {
        show: nextProps.openMessage,
      };
    }
    return null;
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    const { onClose } = this.props;

    this.setState({ show: false });
    onClose();
  };


  render() {
    const { show } = this.state;
    return (
      <Row
        aria-live="polite"
        aria-atomic="true"
        style={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Col>
          <Toast
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              color: 'green'
            }}
            onClose={this.handleClose}
            show={show}
            delay={3000}
            autohide
          >
            <Toast.Header>
              <i className="far fa-check-circle" />
              <strong className="mr-auto">Success</strong>
            </Toast.Header>
            <Toast.Body>
              Your Item has been added to the cart successfully
            </Toast.Body>
          </Toast>
        </Col>
      </Row>
    );
  }
}

export default ShowMessage;
