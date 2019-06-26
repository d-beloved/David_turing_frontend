/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { createOrder } from '../../actions/shoppingCartAction';

const styles = theme => ({
  listItem: {
    padding: `${theme.spacing.unit}px 0`,
  },
  total: {
    fontWeight: '700',
  },
  title: {
    marginTop: theme.spacing.unit * 2,
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

class Review extends Component {
  state = {};

  handleCreateOrder = async () => {
    const { handleNext, confirmOrder, user } = this.props;
    const shipping_id = user.shipping_region_id;
    const tax_id = '2';
    await confirmOrder({ shipping_id, tax_id });
    handleNext();
  };

  render() {
    const { classes, products, user, handleBack } = this.props;
    const addresses = [
      user.address_1,
      user.city,
      user.country,
      user.postal_code,
    ];
    const discountedTotal = products.reduce((acc, curr) => {
      const price = Number(curr.subtotal);
      return Number(acc) + price;
    }, 0);

    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Order summary
        </Typography>
        <List disablePadding>
          {products.map(product => (
            <ListItem className={classes.listItem} key={product.item_id}>
              <ListItemText
                primary={product.name}
                secondary={product.attributes}
              />
              <Typography variant="body2">
                {(product.price * product.quantity).toFixed(2)}
              </Typography>
            </ListItem>
          ))}
          <ListItem className={classes.listItem}>
            <ListItemText primary="Total(including discount)" />
            <Typography variant="subtitle1" className={classes.total}>
              $
              {discountedTotal.toFixed(2)}
            </Typography>
          </ListItem>
        </List>
        <Grid container spacing={16}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom className={classes.title}>
              Shipping
            </Typography>
            <Typography gutterBottom>{user.name}</Typography>
            <Typography gutterBottom>{addresses.join(' ')}</Typography>
          </Grid>
        </Grid>
        <div className={classes.buttons}>
          <Button onClick={handleBack} className={classes.button}>
            Back
          </Button>
          <Button
            onClick={this.handleCreateOrder}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Confirm Order
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

Review.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  confirmOrder: (payload) => dispatch(createOrder(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Review));
