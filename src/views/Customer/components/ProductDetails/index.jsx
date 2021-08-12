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
  PortletFooter,
  Popup,
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
    open: false,
    title: "",
    body: "",
  };

  handleClose = () => {
    this.setState({ open: false, title: '', body: '' });
  };

  handleHideUsers = () => {
    this.setState({ open: true, title: "Ingin melakukan penambahan?", body: "Pastikan telah melakukan pengecekan pada masukan yang anda isi" });
  }

  handleDeleteUsers = () => {
    this.setState({ open: true, title: "Ingin melakukan penghapusan?", body: "Pastikan telah melakukan pengecekan pada pegawai yang anda pilih" });
  }

  handleChange = (e, name) => {
    this.setState({
      [name]: e.target.value
    });
  };

  render() {
    const { classes, className, ...rest } = this.props;
    const { service, price } = this.state;
    const { body, title, open } = this.state;

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet
        {...rest}
        className={rootClassName}
      >
        <PortletHeader>
          <PortletLabel
            subtitle="Silahkan isi informasi dibawah ini"
            title="Tambah Pelanggan"
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
                // onChange={e => this.handleChange(e, "service")}
                label="Email"
                margin="dense"
                required
                // value={service}
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                onChange={e => this.handleChange(e, "price")}
                label="Kata Sandi"
                value={price}
                margin="dense"
                type="password"
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
            onClick={this.handleHideUsers}
          >
            Simpan
          </Button>
        </PortletFooter>
        <Popup handleClose={this.handleClose} title={title} body={body} open={open} />
      </Portlet>
    );
  }
}

Account.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Account);
