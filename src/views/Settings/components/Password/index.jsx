import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

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

class Password extends Component {
  state = {
    values: {
      password: '',
      confirm: ''
    }
  };

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };

    newState.values[field] = value;

    this.setState(newState, this.validateForm);
  };

  render() {
    const { classes, className, ...rest } = this.props;
    const { values } = this.state;

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet
        {...rest}
        className={rootClassName}
      >
        <PortletHeader>
          <PortletLabel
            subtitle="Ganti kata sandi"
            title="Kata Sandi"
          />
        </PortletHeader>
        <PortletContent>
          <form className={classes.form}>
            <TextField
              className={classes.textField}
              label="Kata sandi lama"
              name="password"
              onChange={event =>
                this.handleFieldChange('oldPassword', event.target.value)
              }
              type="password"
              value={values.oldPassword}
              variant="outlined"
            />
            <TextField
              className={classes.textField}
              label="Kata sandi baru"
              name="password"
              onChange={event =>
                this.handleFieldChange('newPassword', event.target.value)
              }
              type="password"
              value={values.newPassword}
              variant="outlined"
            />
            <TextField
              className={classes.textField}
              label="Konfirmasi kata sandi"
              name="confirm"
              onChange={event =>
                this.handleFieldChange('confirm', event.target.value)
              }
              type="password"
              value={values.confirm}
              variant="outlined"
            />
          </form>
        </PortletContent>
        <PortletFooter className={classes.portletFooter}>
          <Button
            color="primary"
            variant="outlined"
          >
            Simpan
          </Button>
        </PortletFooter>
      </Portlet>
    );
  }
}

Password.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Password);
