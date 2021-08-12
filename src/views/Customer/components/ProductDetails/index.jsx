import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Button, TextField } from '@material-ui/core';

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter
} from 'components';

// Component styles
import styles from './styles';

const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  }
];

class Account extends Component {
  state = {
    service: '',
    price: '',
  };

  handleChange = (e, name) => {
    this.setState({
      [name]: e.target.value
    });
  };

  render() {
    const { classes, className, ...rest } = this.props;
    const { service, price } = this.state;

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet
        {...rest}
        className={rootClassName}
      >
        <PortletHeader>
          <PortletLabel
            subtitle="Silahkan isi informasi dibawah ini"
            title="Service"
          />
        </PortletHeader>
        <PortletContent noPadding>
          <form
            autoComplete="off"
            noValidate
          >
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                onChange={e => this.handleChange(e, "service")}
                label="Nama Depan"
                margin="dense"
                required
                value={service}
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                onChange={e => this.handleChange(e, "price")}
                label="Nama Belakang"
                value={price}
                margin="dense"
                required
                variant="outlined"
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                onChange={e => this.handleChange(e, "service")}
                label="Email"
                margin="dense"
                required
                value={service}
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                onChange={e => this.handleChange(e, "price")}
                label="Kata Sandi"
                value={price}
                margin="dense"
                required
                variant="outlined"
              />
            </div>
          </form>
        </PortletContent>
        <PortletFooter className={classes.portletFooter}>
          <Button
            color="primary"
            variant="contained"
          >
            Simpan
          </Button>
        </PortletFooter>
      </Portlet>
    );
  }
}

Account.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Account);
