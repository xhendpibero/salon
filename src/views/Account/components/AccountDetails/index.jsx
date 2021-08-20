import React, { Component } from 'react';

// Externals
import classNames from 'classnames';

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


class Employee extends Component {
  state = {
    username: localStorage.getItem("username"),
    email: localStorage.getItem("email"),
    password: '',
  };

  handleChange = (e, name) => {
    this.setState({
      [name]: e.target.value
    });
  };

  componentWillReceiveProps(nextProps) {
    if (this.props?.data?.username !== nextProps?.data?.username) {
      this.setState({ ...nextProps?.data, email: this.props?.data?.email });
    }
  }

  render() {
    const { classes, className, isLoading, onSubmit, ...rest } = this.props;
    const { username, password, email } = this.state;
    console.log({ username, password, email })
    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet
        {...rest}
        className={rootClassName}
      >
        <PortletHeader>
          <PortletLabel
            subtitle="Silahkan isi informasi dibawah ini"
            title="Profil"
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
                onChange={e => this.handleChange(e, "email")}
                label="Nama Lengkap"
                margin="dense"
                required
                value={email}
                variant="outlined"
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                onChange={e => this.handleChange(e, "username")}
                label="Email"
                margin="dense"
                value={username}
                variant="outlined"
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                onChange={e => this.handleChange(e, "password")}
                label="Kata Sandi"
                margin="dense"
                value={password}
                type="password"
                variant="outlined"
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
              onClick={() => onSubmit({ username, email, password })}
            >
              Simpan
            </Button>
          )}
        </PortletFooter>
      </Portlet>
    );
  }
}

export default withStyles(styles)(Employee);
