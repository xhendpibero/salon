import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  Button, TextField,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
} from '@material-ui/core';

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

class Employee extends Component {
  state = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'contact@devias.io',
    phone: '',
    state: 'Alabama',
    country: 'USA',
    status: 0,
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
    const { firstName, lastName, phone, status, country, body, title, open, email } = this.state;

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet
        {...rest}
        className={rootClassName}
      >
        <PortletHeader>
          <PortletLabel
            subtitle="Silahkan isi informasi dibawah ini"
            title="Profil Karyawan"
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
                label="Nama Panjang"
                margin="dense"
                required
                onChange={e => this.handleChange(e, "firstName")}
                value={firstName}
                variant="outlined"
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="Nomor Hp"
                margin="dense"
                type="number"
                onChange={e => this.handleChange(e, "phone")}
                value={phone}
                variant="outlined"
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="Alamat"
                margin="dense"
                required
                onChange={e => this.handleChange(e, "country")}
                value={country}
                variant="outlined"
              />
            </div>
            <div className={classes.field}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">Status</InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  value={status}
                  onChange={e => this.handleChange(e, "status")}
                  inputProps={{
                    name: 'bank',
                    id: 'bank-simple',
                  }}
                  native
                >
                  <option aria-label="None" value="" />
                  <option value={0}>Tersedia</option>
                  <option value={1}>Tidak Tersedia</option>
                </Select>
              </FormControl>
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

Employee.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Employee);
