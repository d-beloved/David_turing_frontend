/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { Link as ReactLink, Redirect } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './Payment';
import Review from './Review';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    backgroundColor: '#F62F5E',
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
});

const steps = ['Update information', 'Create Your Order', 'Payment'];

function getStepContent(step, props) {
  switch (step) {
    case 0:
      return <AddressForm {...props} />;
    case 1:
      return <Review {...props} />;
    case 2:
      return <PaymentForm {...props} />;
    default:
      throw new Error('Unknown step');
  }
}

class Checkout extends React.Component {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const { classes, cart, user } = this.props;
    const { activeStep } = this.state;

    if (!cart.length && activeStep < steps.length) {
      return <Redirect to="/catalog" noThrow />;
    }

    return (
      <React.Fragment>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your order.
                  </Typography>
                  <Typography variant="subtitle1">
                    Order confirmation mailed, an update will be sent
                    when your order has shipped.
                  </Typography>
                  <Typography component="h1" variant="h6">
                    <Link
                      size="large"
                      color="secondary"
                      component={ReactLink}
                      to="/catalog"
                      underline="none"
                    >
                      continue shopping
                    </Link>
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep, {
                    products: cart,
                    user,
                    handleNext: this.handleNext,
                    handleBack: this.handleBack,
                  })}
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

Checkout.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  cart: state.cart.data,
  user: state.auth.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Checkout));
