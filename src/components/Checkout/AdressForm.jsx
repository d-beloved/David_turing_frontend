/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Button, Select, InputLabel, FormControl } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { Link as ReactLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { updateCustomerAddress } from '../../actions/shoppingCartAction';

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

class AddressForm extends Component {
  state = {
    updated: false,
    name: '',
    address_1: '',
    address_2: '',
    city: '',
    region: '',
    postal_code: '',
    country: '',
    shipping_region_id: '',
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.user && nextProps.user.name !== prevState.name) {
      return {
        name: nextProps.user ? nextProps.user.name : '',
        address1: nextProps.user ? nextProps.user.address_1 : '',
        address2: nextProps.user ? nextProps.user.address_2 : '',
        city: nextProps.user ? nextProps.user.city : '',
        region: nextProps.user ? nextProps.user.region : '',
        postalCode: nextProps.user ? nextProps.user.postal_code : '',
        country: nextProps.user ? nextProps.user.country : '',
        shippingRegionId: nextProps.user
          ? nextProps.user.shipping_region_id
          : '',
      };
    }
    return null;
  }

  handleInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
      updated: true,
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { handleNext, updateCustomerInfo } = this.props;
    const {
      name,
      address_1,
      address_2,
      city,
      region,
      postal_code,
      country,
      shipping_region_id,
      updated,
    } = this.state;

    if (updated) {
      await updateCustomerInfo({
        name,
        address_1,
        address_2,
        city,
        region,
        postal_code,
        country,
        shipping_region_id,
      });
    }
    handleNext();
  };

  render() {
    const { classes, products } = this.props;
    const {
      name,
      address_1,
      address_2,
      city,
      region,
      postal_code,
      country,
      shipping_region_id,
    } = this.state;

    if (!products.length) {
      return (
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Your cart is empty.
            </Typography>

            <Typography component="h1" variant="h6">
              Head over to the Store.
              {' '}
            </Typography>
            <Typography component="h1" variant="h6">
              <Link
                size="large"
                color="secondary"
                component={ReactLink}
                to="/catalog"
                underline="none"
              >
                Go shopping
              </Link>
            </Typography>
          </Paper>
        </main>
      );
    }

    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Delivery
        </Typography>
        <form onSubmit={this.handleSubmit}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <TextField
                required
                id="name"
                name="name"
                label="Full name"
                fullWidth
                autoComplete="name"
                value={name}
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="address1"
                name="address1"
                label="Address 1"
                fullWidth
                autoComplete="billing address-1"
                value={address_1}
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="address2"
                name="address2"
                label="Address line 2"
                fullWidth
                autoComplete="billing address-2"
                value={address_2}
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="city"
                name="city"
                label="City"
                fullWidth
                value={city}
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="region"
                name="region"
                label="State/Province/Region"
                fullWidth
                value={region}
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="postalCode"
                name="postalCode"
                label="Zip / Postal code"
                fullWidth
                autoComplete="billing postal-code"
                value={postal_code}
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="country"
                name="country"
                label="Country"
                fullWidth
                autoComplete="billing country"
                value={country}
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <InputLabel htmlFor="shippingRegionId">
                  Shipping Region
                </InputLabel>
                <Select
                  native
                  required
                  value={shipping_region_id}
                  onChange={this.handleInputChange}
                  inputProps={{
                    name: 'shippingRegionId',
                    id: 'shippingRegionId',
                  }}
                >
                  <option value="" />
                  <option value={2}>US / Canada</option>
                  <option value={3}>Europe</option>
                  <option value={4}>Rest of World</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox color="secondary" name="saveAddress" value="yes" />
                }
                label="My billing information is the same as my payment information"
              />
            </Grid>
          </Grid>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleNext}
              type="submit"
              className={classes.button}
            >
              Next
            </Button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

AddressForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  updateCustomerInfo: (payload) => dispatch(updateCustomerAddress(payload))
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(AddressForm));
