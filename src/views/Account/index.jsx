import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withSnackbar } from 'notistack';

// Externals
import compose from 'recompose/compose';
import { useHttpClient } from '../../services/hooks/http-hook';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Grid } from '@material-ui/core';

// Shared layouts
import { Dashboard as DashboardLayout } from 'layouts';

// Custom components
import { AccountProfile, AccountDetails } from './components';

// Shared components
import {
  Popup,
} from 'components';


// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4
  }
});

class Account extends Component {
  state = {
    openEdit: false,
    isLoading: false,
    payload: {},
    data: {},
    profile_image: "",
    http: { ...useHttpClient() },
  };

  changeImage = (profile_image) => {
    this.setState({ profile_image })
  }

  handleClose = () => {
    this.setState({ openEdit: false });
  };

  get = async () => {
    const { http: { post } } = this.state
    this.setState({ isLoading: true });
    const token = localStorage.getItem("token");
    const response = await post("/me", {},
      token);
    if (response?.status === 200) {
      Object.keys(response.data).forEach((key) => {
        localStorage.removeItem(key)
        localStorage.setItem(key, response.data[key]);
      });
      this.setState({ isLoading: false, data: response.data, profile_image: response?.image ?? "" });
    } else {
      this.props.enqueueSnackbar('Gagal mendapatkan profil.')
    }
  }

  edit = async () => {
    const { http: { post }, payload, profile_image } = this.state
    this.setState({ isLoading: true, openEdit: false });
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");
    const response = await post("/user/update", {
      ...payload,
      image: profile_image,
      role: role,
    },
      token);
    if (response?.status === 200) {
      this.props.enqueueSnackbar('Berhasil merubah profil.')
      localStorage.setItem('isAuthenticated', true);
      Object.keys(response.data).forEach((key) => {
        localStorage.removeItem(key)
        localStorage.setItem(key, response.data[key]);
      });
      this.get();
      this.setState({ payload: {} });
    } else {
      this.props.enqueueSnackbar('Gagal merubah profil.')
      this.setState({ isLoading: false, payload: {} });
    }
  };

  componentWillMount() {
    this.get()
  }

  render() {
    const { classes } = this.props;
    const { openEdit, data, isLoading, profile_image } = this.state;

    return (
      <DashboardLayout title="Akun">
        <div className={classes.root}>
          <Grid
            container
            spacing={4}
          >
            <Grid
              item
              lg={4}
              md={6}
              xl={4}
              xs={12}
            >
              <AccountProfile changeImage={(data) => this.changeImage(data)} profile_image={profile_image} />
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xl={8}
              xs={12}
            >
              <AccountDetails onSubmit={(data) => this.setState({ openEdit: true, payload: data })} data={data} isLoading={isLoading} />
            </Grid>
          </Grid>
          <Popup
            open={openEdit}
            title={"Ingin melakukan perubahan?"}
            body={"Pastikan telah melakukan pengecekan pada masukan yang anda isi"}
            handleClose={this.handleClose}
            handleSubmit={this.edit}
          />
        </div>
      </DashboardLayout>
    );
  }
}

export default compose(
  withRouter,
  withSnackbar,
  withStyles(styles)
)(Account);
