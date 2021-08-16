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
    username: '',
    fullname: '',
    phone_number: '',
    address: '',
    is_show: true,
    open: false,
  };

  handleChange = (e, name) => {
    this.setState({
      [name]: e.target.value
    });
  };

  componentWillReceiveProps(nextProps) {
    if (this.props?.data?.username !== nextProps?.data?.username) {
      this.setState({ ...nextProps?.data, });
    }
  }

  render() {
    const { classes, onSubmit, isLoading, className, ...rest } = this.props;
    const { fullname, phone_number, is_show, address, username } = this.state;

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
                onChange={e => (this.handleChange(e, "username"), this.handleChange(e, "fullname"))}
                value={fullname}
                variant="outlined"
              />
            </div>
            <div className={classes.field}>
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
                label="Alamat"
                margin="dense"
                required
                onChange={e => this.handleChange(e, "address")}
                value={address}
                variant="outlined"
              />
            </div>
            <div className={classes.field}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">Status</InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  value={is_show}
                  onChange={e => this.handleChange(e, "is_show")}
                  inputProps={{
                    name: 'is_show',
                    id: 'is_show-simple',
                  }}
                  native
                >
                  <option aria-label="None" value="" />
                  <option value={true}>Tersedia</option>
                  <option value={false}>Tidak Tersedia</option>
                </Select>
              </FormControl>
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
              onClick={() => onSubmit({ username, fullname, phone_number, is_show, address })}
            >
              Simpan
            </Button>
          )}
        </PortletFooter>
      </Portlet>
    );
  }
}

Employee.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Employee);
