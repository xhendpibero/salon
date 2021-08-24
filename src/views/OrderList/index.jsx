import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withSnackbar } from 'notistack';

// Externals
import compose from 'recompose/compose';
import { useHttpClient } from '../../services/hooks/http-hook';

// Material components
import {
  CircularProgress,
  Typography,
  withStyles,
} from '@material-ui/core';

// Shared layouts
import { Dashboard as DashboardLayout } from 'layouts';

// components
import { Toolbar, OrdersTable } from '../../components';

// Custom components
import {
  Popup,
} from 'components';

// Component styles
import styles from './styles';

class OrdersList extends Component {
  signal = true;

  state = {
    isLoading: false,
    page: 0,
    row: 10,
    orders: [],
    ordersTemp: [],
    ordersTotal: 0,
    selected: [],
    error: null,
    openModal: "", // cancel, complete, confirm
    http: { ...useHttpClient() }
  };

  get = async () => {
    try {
      this.setState({ isLoading: true, orders: [], ordersTemp: [] });
      const { get } = useHttpClient();
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      const username = localStorage.getItem("username");

      const endpoint = role == "admin" ? "/orders" : "/customers/" + username + "/orders"
      const orders = await get(endpoint, token);

      if (this.signal) {
        this.setState({
          isLoading: false,
          orders: role == "admin" ? orders?.data.slice(0, 10) : orders?.data?.filter((e) => e.created_by == username),
          ordersTemp: role == "admin" ? orders?.data : orders?.data?.filter((e) => e.created_by == username),
        });
      }
    } catch (error) {
      if (this.signal) {
        this.setState({
          isLoading: false,
          error
        });
      }
    }
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
      this.setState({ isLoading: true, payload: {} });
      this.get();
    } else {
      this.props.enqueueSnackbar('Gagal ubah status.')
      this.setState({ isLoading: false, payload: {} });
    }
  };

  componentWillMount() {
    this.signal = true;
    this.get();
  }

  componentWillUnmount() {
    this.signal = false;
  }

  handleSelect = (data, index) => {
    this.setState({ [index]: data });
    if (index === "row") {
      this.setState({ orders: this.state.ordersTemp.slice(this.state.page * data, (this.state.page + 1) * data) });
    } else if (index === "page") {
      this.setState({ orders: this.state.ordersTemp.slice(this.state.row * data, this.state.row * (data + 1)) });
    }
  };

  onChange = e => {
    const orders = this.state.ordersTemp.filter((x) => {
      return String(x?.customer_account_name).toLowerCase().indexOf(String(e.target.value)?.toLowerCase()) >= 0 ||
        String(x?.order_id).toLowerCase().indexOf(String(e.target.value)?.toLowerCase()) >= 0;
    })
    this.setState({ orders });
  }

  handleClose = () => {
    this.setState({ openModal: "" });
  };

  handleSubmit = (e, payload) => {
    this.setState({ openModal: e, payload });
  };

  renders() {
    const { classes } = this.props;
    const { isLoading, orders, ordersTemp } = this.state;

    if (isLoading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    if (orders.length === 0) {
      return (
        <Typography variant="h6">Tidak ada pemesanan yang tersedia</Typography>
      );
    }

    return (
      <>
        <OrdersTable
          className={classes.item}
          isLoading={isLoading}
          orders={orders}
          onSelect={this.handleSelect}
          ordersTotal={ordersTemp.length}
          handleSubmit={this.handleSubmit}
        />
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
      </>
    );
  }

  render() {
    const { classes, history } = this.props;
    const role = localStorage.getItem("role") === "admin";

    return (
      <DashboardLayout title="Pemesanan">
        <div className={classes.root}>
          <Toolbar
            placeholder="Cari Pemesanan"
            buttonAdd={role ? "" : "Buat Pemesanan"}
            data={[]}
            onChange={this.onChange}
            onClick={() => role ? history.push({ pathname: '/orders/report' }) : history.push({ pathname: '/orders/add' })}
          />
          <div className={classes.content}>{this.renders()}</div>
        </div>
      </DashboardLayout>
    );
  }
}

export default compose(
  withSnackbar,
  withRouter,
  withStyles(styles),
)(OrdersList);
