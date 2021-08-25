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

// Shared services
import { getOrders } from 'services/order';

// Custom components
// import { OrdersTable } from './components';

// components
import { Toolbar, ReportTable } from '../../components';

// Component styles
import styles from './styles';

const statusText = {
  "completed": 'Selesai',
  "confirmed": 'Pemesanan berhasil',
  "on-progress": 'Sedang berjalan',
  "unconfirmed": 'Perlu konfirmasi',
  "canceled": 'Pemesanan batal'
};
class OrdersList extends Component {
  state = {
    isLoading: false,
    orders: {},
    filterValue: "weekly",
    http: { ...useHttpClient() },
  };

  get = async (filterValue) => {
    this.setState({ isLoading: true });
    const { http: { get } } = this.state
    const token = localStorage.getItem("token");
    const response = await get("/report?type=" + filterValue,
      token);
    if (response?.status === 200) {
      this.setState({
        orders: response?.data,
        isLoading: false
      })
    } else {
      this.failLoad('Gagal mendapatkan rincian pesanan.')
    }
  }

  failLoad = (text) => {
    this.props.enqueueSnackbar(text);
    this.setState({ isLoading: false });
  }

  componentDidMount() {
    this.signal = true;

    this.get("weekly");
  }

  componentWillUnmount() {
    this.signal = false;
  }

  renders() {
    const { classes } = this.props;
    const { isLoading, orders } = this.state;
    console.log({ orders })
    if (isLoading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    if (orders.length === 0) {
      return (
        <Typography variant="h6" style={{ textAlign: "center" }}>Tidak ada laporan yang tersedia</Typography>
      );
    }

    return (
      <ReportTable className={classes.item} isLoading={isLoading} orders={orders} />
    );
  }

  exportToCsv = (filename, rows) => {
    const orders = rows.map((r) => {
      return {
        id: r.order_id,
        nama: r.customer_account_name,
        karyawan: r.employee_name,
        nominalPembayaran: r.is_down_payment ? "DP" : "Penuh",
        nomorRekening: r.customer_account_number,
        layanan: r.service_names,
        harga: r.total_payment,
        metodePembayaran: r.celine_bank_name,
        status: statusText[r.status],
      }
    });
    let csv = '';
    let header = Object.keys(orders[0]).join(',') ? Object.keys(orders[0]).join(',') : "null";
    let values = orders.map(o => Object.values(o).join(',')).join('\n') ? orders.map(o => Object.values(o).join(',')).join('\n') : null;

    csv += header + '\n' + values;
    console.log({ csv })

    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, filename);
    } else {
      var link = document.createElement("a");
      if (link.download !== undefined) { // feature detection
        // Browsers that support HTML5 download attribute
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

  handleChange = (e, name) => {
    this.setState({
      [name]: e && e.target && e.target.value ? e.target.value : e || ""
    });
    this.get(e && e.target && e.target.value ? e.target.value : e || "");
  };

  render() {
    const { classes } = this.props;
    const { orders } = this.state;

    return (
      <DashboardLayout title="Laporan Pemesanan">
        <div className={classes.root}>
          <Toolbar
            buttonAdd={"Unduh Laporan"}
            selectedUsers={[]}
            filterValue={this.state.filterValue}
            filters={[
              {
                value: "daily",
                text: "Hari ini"
              },
              {
                value: "weekly",
                text: "Minggu ini"
              },
              {
                value: "monthly",
                text: "Bulan ini"
              },
              {
                value: "yearly",
                text: "Tahun ini"
              },
            ]}
            onChangeFilter={this.handleChange}
            onClick={() => {
              this.exportToCsv("my_data.csv", orders)
            }}
          />
          <div className={classes.content}>{this.renders()}</div>
        </div>
      </DashboardLayout>
    );
  }
}

export default compose(
  withSnackbar,
  withRouter, withStyles(styles))
  (OrdersList);
