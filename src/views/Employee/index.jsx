import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withSnackbar } from 'notistack';

// Externals
import compose from 'recompose/compose';
import { useHttpClient } from '../../services/hooks/http-hook';

// Externals
import PropTypes from 'prop-types';

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
import {
  Popup,
} from 'components';

// Custom components
import { EmployeeProfile, EmployeeDetails } from './components';

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4
  }
});

class Employee extends Component {
  state = {
    openAdd: false,
    openEdit: false,
    data: {},
    profile_image: "",
    payload: {},
    isLoading: false,
    http: { ...useHttpClient() }
  };

  changeImage = (profile_image) => {
    this.setState({ profile_image })
  }

  handleClose = () => {
    this.setState({ openAdd: false, openEdit: false });
  };

  get = async (id) => {
    const { history } = this.props;
    const { http: { get } } = this.state
    this.setState({ isLoading: true });
    const token = localStorage.getItem("token");
    const response = await get("/employees/" + id,
      token);
    if (response?.status === 200) {
      this.setState({ isLoading: false, profile_image: response?.data?.profile_image, data: response?.data });
    } else {
      history.push('/users');
    }
  }

  add = async () => {
    const { history } = this.props;
    const { http: { post }, profile_image, payload } = this.state
    this.setState({ isLoading: true });
    const user = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    const response = await post("/employees", {
      ...payload,
      profile_image: profile_image ?? "",
      created_by: user
    },
      token);
    if (response?.status === 200) {
      this.props.enqueueSnackbar('Berhasil menambah pegawai.')
      history.push('/users');
    } else {
      this.props.enqueueSnackbar('Gagal menambah pegawai.')
    }
    this.setState({ isLoading: false, payload: {} });
  };

  edit = async () => {
    const { history } = this.props;
    const { http: { put }, data, profile_image, payload } = this.state
    this.setState({ isLoading: true });
    const user = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    const response = await put("/employees", {
      ...data,
      ...payload,
      profile_image: profile_image ?? "",
      updated_by: user
    },
      token);
    if (response?.status === 200) {
      this.props.enqueueSnackbar('Berhasil merubah pegawai.')
      history.push('/users');
    } else {
      this.props.enqueueSnackbar('Gagal merubah pegawai.')
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
    const { profile_image, isLoading, data, openAdd, openEdit } = this.state;
    const title = location.search ? "Ubah" : "Tambah";

    return (
      <DashboardLayout title={title + " Pegawai"}>
        <div className={classes.root}>
          <Button
            className={classes.importButton}
            style={{ marginBottom: 25 }}
            size="small"
            onClick={() => history.push({ pathname: '/users' })}
          >
            <ArrowBack className={classes.importIcon} /> Kembali
          </Button>

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
              <EmployeeProfile changeImage={(data) => this.changeImage(data)} profile_image={profile_image} />
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xl={8}
              xs={12}
            >
              <EmployeeDetails onSubmit={(data) => this.setState({ [location.search ? "openEdit" : "openAdd"]: true, payload: data })} data={data} isLoading={isLoading} />
            </Grid>
          </Grid>
          <Popup
            open={openAdd}
            title={"Ingin melakukan penambahan?"}
            body={"Pastikan telah melakukan pengecekan pada masukan yang anda isi"}
            handleClose={this.handleClose}
            handleSubmit={this.add}
          />
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

Employee.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  withSnackbar,
  withStyles(styles)
)(Employee);
