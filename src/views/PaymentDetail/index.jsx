import React, { Component } from 'react';
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

import {
  CircularProgress,
} from '@material-ui/core';

// Shared layouts
import { Dashboard as DashboardLayout } from 'layouts';

// Custom components
import { OrdersDetails } from './components';
import {
  Popup,
} from 'components';

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4
  },
  progressWrapper: {
    paddingTop: '48px',
    paddingBottom: '24px',
    display: 'flex',
    justifyContent: 'center',
    textAlign: "center",
    width: "100%"
  },
});

class Order extends Component {
  state = {
    isLoading: false,
    data: {},
    openModal: "", // cancel, complete, confirm
    http: { ...useHttpClient() },
  };

  get = async (id) => {
    const { http: { get } } = this.state
    const token = localStorage.getItem("token");
    const response = await get("/orders/" + id,
      token);
    if (response?.status === 200) {
      this.loadingSequence(2,
        {
          payload: {
            order: response?.data?.order_id,
            employee: response?.data?.employee_id
          },
          response: {
            data: response?.data
          }
        });
    } else {
      this.failLoad('Gagal mendapatkan rincian pesanan.')
    }
  }

  getDetail = async (id) => {
    const { http: { get }, data } = this.state
    const token = localStorage.getItem("token");

    const responseEmployee = await get("/employees/" + id.employee,
      token);
    const response = await get("/orders/" + id.order + "/details",
      token);
    if (response?.status === 200 && responseEmployee?.status === 200) {
      this.loadingSequence(3,
        {
          payload: response?.data,
          response: {
            data: {
              ...data,
              services: response?.data,
              employee: responseEmployee?.data
            }
          }
        });
    } else {
      this.failLoad('Gagal mendapatkan rincian pesanan.')
    }
  }

  getService = async (serviceList) => {
    const { http: { get }, data } = this.state
    let order = [];
    const token = localStorage.getItem("token");
    await serviceList.map(async (e) => {
      const response = await get("/services/" + e.service_id, token)
      order.push(response)
      if (order.length === serviceList.length) {
        if (order.filter(e => e?.status === 200).length) {
          this.loadingSequence(0,
            {
              response: {
                data: {
                  ...data, serviceList: order.map(e => e?.data)
                }
              }
            });
          this.setState({ isLoading: false });
        } else {
          this.failLoad('Gagal mendapatkan rincian pesanan.')
        }
      }
    })
  }

  failLoad = (text) => {
    this.props.enqueueSnackbar(text);
    this.setState({ isLoading: false });
  }

  loadingSequence = (seq, params = {}) => {
    this.setState({ isLoading: true });
    this.setState(params?.response ?? {});
    switch (seq) {
      case 1:
        this.get(params?.payload);
        break;
      case 2:
        this.getDetail(params?.payload);
        break;
      case 3:
        this.getService(params?.payload);
        break;
    }
  }

  editOrders = async (payload) => {
    this.setState({ isLoading: true });
    const { http: { put } } = this.state;
    const user = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    const response = await put("/orders", {
      ...payload,
      created_by: user
    },
      token);
    if (response?.status === 200) {
      this.props.enqueueSnackbar('Berhasil edit pemesanan.');
    } else {
      this.props.enqueueSnackbar('Gagal edit pemesanan.');
    }
    this.setState({ isLoading: false, payload: {} });
  };

  updateStatus = async () => {
    const { http: { post }, payload, openModal } = this.state
    this.setState({ isLoading: true, openModal: "" });
    const token = localStorage.getItem("token");
    const response = await post("/orders/" + openModal, {
      ...payload,
    },
      token);
    if (response?.status === 200) {
      this.props.enqueueSnackbar('Berhasil ubah status.')
      this.get();
    } else {
      this.props.enqueueSnackbar('Gagal ubah status.')
    }
    this.setState({ isLoading: false, payload: {} });
  };

  handleClose = () => {
    this.setState({ openModal: "" });
  };

  handleSubmit = (e, payload) => {
    this.setState({ openModal: e, payload });
  };

  componentWillMount() {
    const { location } = this.props;
    const id = location.search.split("=")[1];
    if (location.search) {
      this.loadingSequence(1,
        {
          payload: id,
        }
      );
    }
  }

  renderDetails() {
    const { classes } = this.props;
    const { isLoading, data } = this.state;

    if (isLoading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    return (
      <OrdersDetails
        data={data}
        isLoading={isLoading}
        editOrders={this.editOrders}
        handleSubmit={this.handleSubmit}
      />
    );
  }

  render() {
    const { classes, history } = this.props;
    return (
      <DashboardLayout title={"Rincian Pemesanan"}>
        <div className={classes.root}>
          <Button
            className={classes.importButton}
            style={{ marginBottom: 25 }}
            size="small"
            onClick={() => history.push({ pathname: '/orders' })}
          >
            <ArrowBack className={classes.importIcon} /> Kembali
          </Button>

          <Grid
            container
            spacing={4}
          >
            {this.renderDetails()}
            {[
              {
                open: this.state.openModal == "confirm",
                title: 'Ingin melakukan konfirmasi?',
                body: 'Pastikan telah melakukan pengecekan pada Rincian Pemesanan dan Pengecekan Pembayaran',
                handleSubmit: this.updateStatus,
              },
              {
                open: this.state.openModal == "complete",
                title: 'Ingin melakukan konfirmasi selesai?',
                body: 'Pastikan telah melakukan pengecekan pada Rincian Pemesanan dan Pengecekan Pembayaran',
                handleSubmit: this.updateStatus,
              },
              {
                open: this.state.openModal == "cancel",
                title: 'Ingin melakukan pembatalan?',
                body: 'Pastikan telah melakukan pengecekan pada Rincian Pemesanan dan Pengecekan Pembayaran',
                handleSubmit: this.updateStatus,
              },
            ].map(e =>
              <Popup
                {...e}
                handleClose={this.handleClose}
              />
            )}
          </Grid>
        </div>
      </DashboardLayout>
    );
  }
}

export default compose(
  withSnackbar,
  withStyles(styles)
)(Order);
