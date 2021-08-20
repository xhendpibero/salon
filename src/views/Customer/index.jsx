import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withSnackbar } from 'notistack';

// Externals
import compose from 'recompose/compose';
import { useHttpClient } from '../../services/hooks/http-hook';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Button, Grid } from '@material-ui/core';

// Material icons
import {
  ArrowBack,
} from '@material-ui/icons';

// Shared layouts
import { Dashboard as DashboardLayout } from 'layouts';

// Custom components
import { CustomerDetails } from './components';

import {
  Popup,
} from 'components';

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4
  }
});

class Customer extends Component {
  state = {
    openAdd: false,
    openEdit: false,
    data: {},
    payload: {},
    isLoading: false,
    http: { ...useHttpClient() }
  };

  handleClose = () => {
    this.setState({ openAdd: false, openEdit: false });
  };

  get = async (id) => {
    const { history } = this.props;
    const { http: { get } } = this.state
    this.setState({ isLoading: true });
    const token = localStorage.getItem("token");
    const response = await get("/customers/" + id,
      token);
    if (response?.status === 200) {
      this.setState({ isLoading: false, thumbnail: response?.data?.thumbnail, data: response?.data });
    } else {
      history.push('/customers');
    }
  }

  add = async () => {
    const { history } = this.props;
    const { http: { post }, payload } = this.state
    this.setState({ isLoading: true });
    const user = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    const response = await post("/customers", {
      ...payload,
      username: user,
      created_by: user,
    },
      token);
    if (response?.status === 200) {
      this.props.enqueueSnackbar('Berhasil menambah pelanggan.')
      history.push('/customers');
    } else {
      this.props.enqueueSnackbar('Gagal menambah pelanggan.')
    }
    this.setState({ isLoading: false, payload: {} });
  };

  edit = async () => {
    const { history } = this.props;
    const { http: { put }, data, payload } = this.state
    this.setState({ isLoading: true });
    const user = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    const response = await put("/customers", {
      ...data,
      ...payload,
      username: user,
      updated_by: user
    },
      token);
    if (response?.status === 200) {
      this.props.enqueueSnackbar('Berhasil merubah pelanggan.')
      history.push('/customers');
    } else {
      this.props.enqueueSnackbar('Gagal merubah pelanggan.')
    }
    this.setState({ isLoading: false, payload: {} });
  };

  componentWillMount() {
    const { location } = this.props;
    const id = location.search.split("=")[1];
    if (location.search) {
      this.get(id)
    }
  }

  render() {
    const { classes, location, history } = this.props;
    const { isLoading, data, openAdd, openEdit } = this.state;
    const title = location.search ? "Edit" : "Tambah";

    return (
      <DashboardLayout title={title + " Pelanggan"}>
        <div className={classes.root}>
          <Button
            className={classes.importButton}
            style={{ marginBottom: 25 }}
            size="small"
            onClick={() => history.push({ pathname: '/customers' })}
          >
            <ArrowBack className={classes.importIcon} /> Kembali
          </Button>

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
              <ProductPicture />
            </Grid> */}
            <Grid
              item
              xs={12}
            >
              <CustomerDetails onSubmit={(data) => this.setState({ [location.search ? "openEdit" : "openAdd"]: true, payload: data })} data={data} isLoading={isLoading} />
            </Grid>
          </Grid>
          {[
            {
              open: openAdd,
              title: 'Ingin melakukan penambahan?',
              body: 'Pastikan telah melakukan pengecekan pada masukan yang anda isi',
              handleSubmit: this.add,
            },
            {
              open: openEdit,
              title: 'Ingin melakukan perubahan?',
              body: 'Pastikan telah melakukan pengecekan pada masukan yang anda isi',
              handleSubmit: this.edit,
            },
          ].map(e =>
            <Popup
              {...e}
              handleClose={this.handleClose}
            />
          )}
        </div>
      </DashboardLayout>
    );
  }
}

export default compose(
  withRouter,
  withSnackbar,
  withStyles(styles)
)(Customer);