import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@material-ui/core';

// Shared components
import {
    Portlet,
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

    render() {
        const { classes, className, isLoading, orders } = this.props;

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
                                        <TableCell align="left">Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orders.map((order, id) => (
                                        <TableRow
                                            className={classes.tableRow}
                                            hover
                                            key={order.order_id}
                                        >
                                            <TableCell className={classes.customerCell}>
                                                {order.order_id}
                                            </TableCell>
                                            <TableCell className={classes.customerCell}>
                                                {order.customer_account_name}
                                            </TableCell>
                                            <TableCell className={classes.customerCell}>
                                                {order.employee_id}
                                            </TableCell>
                                            <TableCell className={classes.customerCell}>
                                                {order.booking_date}
                                            </TableCell>
                                            <TableCell className={classes.customerCell}>
                                                {new Number(order.customer_payment_nominal).toLocaleString('id', { style: 'currency', currency: 'IDR' })}
                                            </TableCell>
                                            <TableCell className={classes.customerCell}>
                                                {order.customer_account_number}
                                            </TableCell>
                                            <TableCell className={classes.customerCell}>
                                                {order.is_down_payment ? "DP" : "Penuh"}
                                            </TableCell>
                                            <TableCell className={classes.customerCell}>
                                                {new Number(order.total_payment).toLocaleString('id', { style: 'currency', currency: 'IDR' })}
                                            </TableCell>
                                            <TableCell>
                                                {moment(order.booking_date).format('DD/MM/YYYY')}
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
