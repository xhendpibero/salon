import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Externals
import classNames from 'classnames';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  Typography,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel,
  TablePagination
} from '@material-ui/core';

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletToolbar,
  PortletContent,
  Status
} from 'components';

// Component styles
import styles from './styles';

const statusColors = {
  "completed": 'success',
  "confirmed": 'primary',
  "on-progress": 'info',
  "unconfirmed": 'warning',
  "canceled": 'danger'
};

const statusText = {
  "completed": 'Selesai',
  "confirmed": 'Pemesanan berhasil',
  "on-progress": 'Sedang berjalan',
  "unconfirmed": 'Perlu konfirmasi',
  "canceled": 'Pemesanan batal'
};
class OrdersTable extends Component {
  state = {
    listCell: [
      {
        id: "order_id",
        name: "ID",
        active: false,
        direction: "desc",
      },
      {
        id: "customer_account_name",
        name: "Nama Pelanggan",
        active: false,
        direction: "desc",
      },
      {
        id: "created",
        name: "Tanggal Pemesanan",
        active: true,
        direction: "desc",
      },
      {
        id: "status",
        name: "Status",
        active: false,
        direction: "desc",
      },
    ],
  };

  sortHandler = (id) => {
    const listCell = this.state.listCell.map((e) => {
      if (id === e.id) {
        if (e.active) {
          return {
            ...e,
            direction: e.direction === "desc" ? "asc" : "desc"
          }
        } else {
          return {
            ...e,
            active: true,
          }
        }
      }
      return { ...e, active: false }
    })
    this.setState({ listCell })
  }

  render() {
    const { classes, className, isLoading } = this.props;
    const { listCell } = this.state;

    const sortData = listCell.find(order => order.active)
    const { id, direction } = sortData;

    let orders = [];
    if (id === "created") {
      orders = this.props.orders.sort((a, b) => (new Date(a[id]).getTime() > new Date(b[id]).getTime()) ? direction === "asc" ? 1 : -1 : ((new Date(b[id]).getTime() > new Date(a[id]).getTime()) ? direction === "asc" ? -1 : 1 : 0))
    } else {
      orders = this.props.orders.sort((a, b) => (a[id] > b[id]) ? direction === "asc" ? 1 : -1 : ((b[id] > a[id]) ? direction === "asc" ? -1 : 1 : 0))
    }

    const role = localStorage.getItem("role") === "admin";
    const rootClassName = classNames(classes.root, className);
    const showOrders = !isLoading && orders.length > 0;

    return (
      <Portlet className={rootClassName}>
        <PortletHeader noDivider>
          <PortletLabel
            subtitle={`${orders?.length}`}
            title="Pemesanan Terbaru"
          />
          {!role && (
            <PortletToolbar>
              <Button
                className={classes.newEntryButton}
                color="primary"
                size="small"
                variant="outlined"
              >
                Buat pemesanan baru
              </Button>
            </PortletToolbar>
          )}
        </PortletHeader>
        <PerfectScrollbar>
          <PortletContent
            className={classes.portletContent}
            noPadding
          >
            {isLoading && (
              <div className={classes.progressWrapper}>
                <CircularProgress />
              </div>
            )}
            {showOrders && (
              <Table>
                <TableHead>
                  <TableRow>
                    {listCell.map((e) =>
                      <TableCell
                        align={e.id === "order_id" ? "" : "left"}
                        direction={e.direction}
                        onClick={() => this.sortHandler(e.id)}
                      >
                        <Tooltip
                          enterDelay={300}
                          title="Sort"
                        >
                          <TableSortLabel
                            active={e.active}
                            direction={e.direction}
                          >
                            {e.name}
                          </TableSortLabel>
                        </Tooltip>
                      </TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order, index) => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={order.order_id + index}
                    >
                      <TableCell>
                        <div className={classes.tableCellInner}>
                          <Link to={"orders/detail?id=" + order.order_id}>
                            <Typography
                              className={classes.nameText}
                              variant="body1"
                            >
                              {order.order_id}
                            </Typography>
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell className={classes.customerCell}>
                        {order.customer_account_name}
                      </TableCell>
                      <TableCell>
                        {moment(order.created).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell>
                        <div className={classes.statusWrapper}>
                          <Status
                            className={classes.status}
                            color={statusColors[order.status]}
                            size="sm"
                          />
                          {statusText[order.status]}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </PortletContent>
        </PerfectScrollbar>
      </Portlet>
    );
  }
}

OrdersTable.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(OrdersTable);
