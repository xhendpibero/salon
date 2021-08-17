import React, { Component } from 'react';

// Externals
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  Button, TextField,
  CircularProgress,
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
} from 'components';

// Component styles
import styles from './styles';

class Customer extends Component {
  state = {
    username: '',
    fullname: '',
    phone_number: '',
    email: '',
    address: '',
    gender: "",
  };

  handleChange = (e, name) => {
    this.setState({
      [name]: e.target.value
    });
  };

  componentWillReceiveProps(nextProps) {
    if (this.props?.data?.username !== nextProps?.data?.username) {
      this.setState({ ...nextProps?.data });
    }
  }

  render() {
    const { classes, className, onSubmit, ...rest } = this.props;
    const { fullname, phone_number, email, address, username, gender } = this.state;

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
                label="Nama Panjang"
                margin="dense"
                required
                onChange={e => (this.handleChange(e, "username"), this.handleChange(e, "fullname"))}
                value={fullname}
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                label="Nomor Hp"
                margin="dense"
                type="number"
                onChange={e => this.handleChange(e, "phone_number")}
                value={phone_number}
                variant="outlined"
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                onChange={e => this.handleChange(e, "email")}
                label="Email"
                margin="dense"
                required
                value={email}
                type="email"
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                onChange={e => this.handleChange(e, "address")}
                label="Alamat"
                value={address}
                margin="dense"
                type="text"
                required
                variant="outlined"
              />
            </div>
            <div className={classes.field}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">Jenis kelamin</InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  value={gender}
                  onChange={e => this.handleChange(e, "gender")}
                  inputProps={{
                    name: 'gender',
                    id: 'gender-simple',
                  }}
                  native
                >
                  <option value={"M"}>Laki-laki</option>
                  <option value={"F"}>Perempuan</option>
                </Select>
              </FormControl>
            </div>
          </form>
        </PortletContent>
        <PortletFooter className={classes.portletFooter}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => onSubmit({ fullname, phone_number, address, username, gender, email })}
          >
            Simpan
          </Button>
        </PortletFooter>
      </Portlet>
    );
  }
}

export default withStyles(styles)(Customer);
