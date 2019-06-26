/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import StripeCheckout from 'react-stripe-checkout';
import { payWithStripe } from '../../actions/shoppingCartAction';

const styles = theme => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
  progress: {
    textAlign: 'center',
    height: '100px',
    display: 'block',
    margin: '0 auto',
  },
});

const stripeApiKey = 'pk_test_mL9UOjNbGCgzSfZTUUD46iuH00o8To1jWW';

class PaymentForm extends Component {
  state = {};

  handleClose = () => {
    // eslint-disable-next-line no-console
    console.log('App#handleClose');
  };

  handleToken = async token => {
    const { email, id: stripeToken } = token;
    const { order, payWithStripe, handleNext, products } = this.props;
    const Total = products.reduce((acc, curr) => {
      const price = Number(curr.subtotal);
      return Number(acc) + price;
    }, 0);
    const amount = Number((Total.toFixed(2) * 100).toFixed());
    await payWithStripe({ email, stripeToken, orderId: order.order_id, amount });
    handleNext();
  };

  render() {
    const { classes, products, handleBack, loading } = this.props;
    const Total = products.reduce((acc, curr) => {
      const price = Number(curr.subtotal);
      return Number(acc) + price;
    }, 0);
    const amountSent = Number((Total.toFixed(2) * 100).toFixed());

    return (
      <React.Fragment>
        {loading ? (
          <>
            <Grid
              classes={{ container: classes.loading }}
              container
              spacing={40}
            >
              <Grid item xs={12}>
                <CircularProgress
                  className={classes.progress}
                  color="secondary"
                />
                <Typography variant="h6" align="center">
                  Finalizing payment
                </Typography>
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <Typography variant="h6" gutterBottom>
              Payment method
            </Typography>
            <StripeCheckout
              allowRememberMe={false}
              amount={amountSent}
              closed={this.handleClose}
              description="Payment for T-Shirt"
              label="Pay with Stripe 💳"
              locale="auto"
              name="Shopmate"
              opened={this.handleOpen}
              panelLabel="Pay {{amount}}"
              stripeKey={stripeApiKey}
              token={this.handleToken}
            />
            <div className={classes.buttons}>
              <Button onClick={handleBack} className={classes.button}>
                Back
              </Button>
            </div>
          </>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  order: state.cart.order,
  loading: state.cart.isLoading,
});

const matchDispatchToProps = dispatch => ({
  payWithStripe: (payload) => dispatch(payWithStripe(payload))
});

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(withStyles(styles)(PaymentForm));
