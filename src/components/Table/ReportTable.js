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
    TableCell,
    TableHead,
    TableRow,
    Tooltip,
    TableSortLabel,
    Typography,
} from '@material-ui/core';

// Shared services
import { getOrders } from 'services/order';

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
    "Selesai": 'success',
    "Pemesanan berhasil": 'primary',
    "Perlu konfirmasi": 'info',
    "Pemesanan batal": 'danger'
};

class OrdersTable extends Component {

    render() {
        const { classes, className, isLoading, orders, ordersTotal } = this.props;
        const role = localStorage.getItem("role") === "admin";

        const rootClassName = classNames(classes.root, className);
        const showOrders = !isLoading && orders.length > 0;

        return (
            <Portlet className={rootClassName}>
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
                                        <TableCell>ID</TableCell>
                                        <TableCell align="left">Nama Pemesan</TableCell>
                                        <TableCell align="left">Pegawai</TableCell>
                                        <TableCell align="left">Jenis Layanan</TableCell>
                                        <TableCell align="left">Harga</TableCell>
                                        <TableCell align="left">Nomor rek</TableCell>
                                        <TableCell align="left">Pembayaran</TableCell>
                                        <TableCell align="left">Nominal Pembayaran</TableCell>
                                        <TableCell align="left">Tanggal Pemesanan</TableCell>
                                        {/* <TableCell
                                            align="left"
                                            sortDirection="desc"
                                        >
                                            <Tooltip
                                                enterDelay={300}
                                                title="Sort"
                                            >
                                                <TableSortLabel
                                                    // active
                                                    direction="desc"
                                                >
                                                    Tanggal Pemesanan
                                                </TableSortLabel>
                                            </Tooltip>
                                        </TableCell> */}
                                        <TableCell align="left">Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orders.map((order, id) => (
                                        <TableRow
                                            className={classes.tableRow}
                                            hover
                                            key={order.id}
                                        >
                                            <TableCell className={classes.customerCell}>
                                                {order.id}
                                            </TableCell>
                                            <TableCell className={classes.customerCell}>
                                                {order.customer.name}
                                            </TableCell>
                                            <TableCell className={classes.customerCell}>
                                                {order.employee}
                                            </TableCell>
                                            <TableCell className={classes.customerCell}>
                                                {order.services.toString().replace(",", ", ")}
                                            </TableCell>
                                            <TableCell className={classes.customerCell}>
                                                {order.price.toLocaleString('id', { style: 'currency', currency: 'IDR' })}
                                            </TableCell>
                                            <TableCell className={classes.customerCell}>
                                                {order.norek}
                                            </TableCell>
                                            <TableCell className={classes.customerCell}>
                                                {id % 2 == 0 ? "Penuh" : "DP"}
                                            </TableCell>
                                            <TableCell className={classes.customerCell}>
                                                {order.nominalDp.toLocaleString('id', { style: 'currency', currency: 'IDR' })}
                                            </TableCell>
                                            <TableCell>
                                                {moment(order.createdAt).format('DD/MM/YYYY')}
                                            </TableCell>
                                            <TableCell>
                                                <div className={classes.statusWrapper}>
                                                    <Status
                                                        className={classes.status}
                                                        color={statusColors[order.status]}
                                                        size="sm"
                                                    />
                                                    {order.status}
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
