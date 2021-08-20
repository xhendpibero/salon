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
import {
  ProductPicture,
  ProductDetails,
} from './components';

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

class Product extends Component {
  state = {
    openAdd: false,
    openEdit: false,
    data: {},
    thumbnail: "",
    payload: {},
    isLoading: false,
    http: { ...useHttpClient() }
  };

  changeImage = (thumbnail) => {
    this.setState({ thumbnail })
  }

  handleClose = () => {
    this.setState({ openAdd: false, openEdit: false });
  };

  get = async (id) => {
    const { history } = this.props;
    const { http: { get } } = this.state
    this.setState({ isLoading: true });
    const token = localStorage.getItem("token");
    const response = await get("/services/" + id,
      token);
    if (response?.status === 200) {
      this.setState({ isLoading: false, thumbnail: response?.data?.thumbnail, data: response?.data });
    } else {
      history.push('/products');
    }
  }

  add = async () => {
    const { history } = this.props;
    const { http: { post }, thumbnail, payload } = this.state
    this.setState({ isLoading: true });
    const user = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    const response = await post("/services", {
      ...payload,
      thumbnail: thumbnail ?? "",
      is_show: true,
      created_by: user
    },
      token);
    if (response?.status === 200) {
      this.props.enqueueSnackbar('Berhasil menambah jenis layanan.')
      history.push('/products');
    } else {
      this.props.enqueueSnackbar('Gagal menambah jenis layanan.')
    }
    this.setState({ isLoading: false, payload: {} });
  };

  edit = async () => {
    const { history } = this.props;
    const { http: { put }, data, thumbnail, payload } = this.state
    this.setState({ isLoading: true });
    const user = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    const response = await put("/services", {
      ...data,
      ...payload,
      thumbnail: thumbnail ?? "",
      updated_by: user
    },
      token);
    if (response?.status === 200) {
      this.props.enqueueSnackbar('Berhasil merubah jenis layanan.')
      history.push('/products');
    } else {
      this.props.enqueueSnackbar('Gagal merubah jenis layanan.')
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
    const { thumbnail, isLoading, data, openAdd, openEdit } = this.state;
    const title = location.search ? "Edit" : "Tambah";

    return (
      <DashboardLayout title={title + " Jenis Layanan"}>
        <div className={classes.root}>
          <Button
            className={classes.importButton}
            style={{ marginBottom: 25 }}
            size="small"
            onClick={() => history.push({ pathname: '/products' })}
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
              <ProductPicture changeImage={(data) => this.changeImage(data)} thumbnail={thumbnail} />
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xl={8}
              xs={12}
            >
              <ProductDetails onSubmit={(data) => this.setState({ [location.search ? "openEdit" : "openAdd"]: true, payload: data })} data={data} isLoading={isLoading} />
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

export default compose(
  withRouter,
  withSnackbar,
  withStyles(styles)
)(Product);
