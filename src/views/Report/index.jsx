import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { convertArrayToCSV } from 'convert-array-to-csv';
// Externals
import compose from 'recompose/compose';

// Material components
import {
  IconButton,
  CircularProgress,
  Typography,
  withStyles,
} from '@material-ui/core';

// Material icons
import {
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon
} from '@material-ui/icons';

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

class OrdersList extends Component {
  signal = true;

  state = {
    isLoading: false,
    limit: 60,
    orders: [],
    ordersTotal: 0,
    selected: [],
    error: null
  };

  async getOrders(limit) {
    try {
      this.setState({ isLoading: true });

      const { orders, ordersTotal } = await getOrders(limit);

      if (this.signal) {
        this.setState({
          isLoading: false,
          orders,
          ordersTotal
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
  }

  componentDidMount() {
    this.signal = true;

    const { limit } = this.state;

    this.getOrders(limit);
  }

  componentWillUnmount() {
    this.signal = false;
  }

  handleSelect = selected => {
    this.setState({ selected });
  };

  renders() {
    const { classes } = this.props;
    const { isLoading, orders, ordersTotal } = this.state;
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
        <Typography variant="h6">Tidak ada jenis layanan yang tersedia</Typography>
      );
    }

    return (
      <ReportTable className={classes.item} isLoading={isLoading} orders={orders} ordersTotal={ordersTotal} />
    );
  }

  exportToCsv = (filename, rows) => {
    const orders = rows.map((r) => {
      return {
        nama: r.customer.name,
        email: r.customer.email,
        karyawan: r.employee,
        nominalDp: r.nominalDp,
        nomorRekening: r.norek,
        layanan: r.services.toString().replace(",", "; "),
        harga: r.price,
        metodePembayaran: "BRI",
        status: r.status,
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

  render() {
    const { classes } = this.props;
    const { orders } = this.state;
    const role = localStorage.getItem("role") === "admin";

    return (
      <DashboardLayout title="Laporan Pemesanan">
        <div className={classes.root}>
          <Toolbar
            buttonAdd={role ? "Unduh Laporan" : "Buat Pemesanan"}
            selectedUsers={[]}
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
  withRouter, withStyles(styles))
  (OrdersList);
