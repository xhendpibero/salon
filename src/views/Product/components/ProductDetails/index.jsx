import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  Button, TextField,
  CircularProgress,
} from '@material-ui/core';

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

class Account extends Component {
  state = {
    service_name: '',
    price: '',
    description: '',
  };

  handleChange = (e, name) => {
    this.setState({
      [name]: e.target.value || ""
    });
  };

  componentWillReceiveProps(nextProps) {
    if (this.props?.data?.service_name !== nextProps?.data?.service_name) {
      this.setState({ ...nextProps?.data, });
    }
  }

  render() {
    const { classes, onSubmit, isLoading, className, ...rest } = this.props;
    const { service_name, price, description } = this.state;

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet
        {...rest}
        className={rootClassName}
      >
        <PortletHeader>
          <PortletLabel
            subtitle="Silahkan isi informasi dibawah ini"
            title="Jenis Layanan"
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
                onChange={e => this.handleChange(e, "service_name")}
                label="Nama Jenis Layanan"
                margin="dense"
                required
                value={service_name}
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                onChange={e => this.handleChange(e, "description")}
                label="Deskripsi"
                margin="dense"
                multiline
                rows={4}
                value={description}
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                onChange={e => this.handleChange(e, "price")}
                label="Harga"
                margin="dense"
                required
                value={price}
                variant="outlined"
                type="number"
              />
            </div>
          </form>
        </PortletContent>
        <PortletFooter className={classes.portletFooter}>
          {isLoading ? (
            <CircularProgress className={classes.progress} />
          ) : (
            <Button
              color="primary"
              variant="contained"
              onClick={() => onSubmit({ service_name, price, description })}
            >
              Simpan
            </Button>
          )}
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
