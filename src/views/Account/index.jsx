import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';
import { useHttpClient } from '../../services/hooks/http-hook';

// Material components
import { Grid } from '@material-ui/core';

// Shared layouts
import { Dashboard as DashboardLayout } from 'layouts';

// Custom components
import { AccountProfile, AccountDetails } from './components';

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4
  }
});

class Account extends Component {
  state = { tabIndex: 0, data: {} };

  edit = async (payload) => {
    const { http: { put }, data } = this.state
    const token = localStorage.getItem("token");
    await put("/customers", {
      ...data,
      "password": "admin",
    },
      token);
  };

  edit = async (payload) => {
    const { http: { put }, data } = this.state
    const token = localStorage.getItem("token");
    await put("/customers", {
      ...data,
      "password": "admin",
    },
      token);
  };

  edit = async (payload) => {
    const { http: { put }, data } = this.state
    const token = localStorage.getItem("token");
    await put("/customers", {
      ...data,
      "password": "admin",
    },
      token);
  };

  submit = () => {
    const role = localStorage.getItem("role");
    if (role === "admin") {
    } else {

    }
  };

  componentWillMount() {
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");
    const email = localStorage.getItem("email");
    if (role === "admin") {
      this.setState({ username, role, email })
    } else {

    }
  }

  render() {
    const { classes } = this.props;

    return (
      <DashboardLayout title="Akun">
        <div className={classes.root}>
          <Grid
            container
            spacing={4}
          >
            {/* <Grid
              item
              lg={4}
              md={6}
              xl={4}
              xs={12}
            >
              <AccountProfile />
            </Grid> */}
            <Grid
              item
              // lg={8}
              // md={6}
              // xl={8}
              xs={12}
            >
              <AccountDetails submit={this.submit} data={this.state.data} />
            </Grid>
          </Grid>
        </div>
      </DashboardLayout>
    );
  }
}

Account.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Account);
