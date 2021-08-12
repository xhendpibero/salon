import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Externals
import classNames from 'classnames';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
    IconButton,
} from '@material-ui/core';

import {
    ArrowDownward as ArrowDownwardIcon,
    ArrowUpward as ArrowUpwardIcon,
    Delete as DeleteIcon,
    VisibilityOff,
    ShoppingBasket
} from '@material-ui/icons';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

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
    state = {
        open: false,
        title: "",
        body: "",
    };

    // handleClickOpen = (title, body) => {
    //     this.setState({ open: true, title, body });
    // };

    handleClose = () => {
        this.setState({ open: false, title: '', body: '' });
    };

    render() {
        const { classes, className, isLoading, orders, ordersTotal } = this.props;
        const role = localStorage.getItem("role") === "admin";
        const { open, title, body } = this.state;
        const rootClassName = classNames(classes.root, className);
        const showOrders = !isLoading && orders.length > 0;
        const bull = <span className={classes.bullet}>•</span>;
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
                        {showOrders && role ? (
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell align="left">Nama Pemesan</TableCell>
                                        <TableCell align="left">Tanggal Pemesanan</TableCell>
                                        {/* <TableCell
                                            align="left"
                                            sortDirection="asc"
                                        >
                                            <Tooltip
                                                enterDelay={300}
                                                title="Sort"
                                            >
                                                <TableSortLabel
                                                    // active
                                                    direction="asc"
                                                >
                                                    Tanggal Pemesanan
                                                </TableSortLabel>
                                            </Tooltip>
                                        </TableCell> */}
                                        <TableCell align="left">Status</TableCell>
                                        {role && (
                                            <TableCell align="left">Aksi</TableCell>
                                        )}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orders.map(order => (
                                        <TableRow
                                            className={classes.tableRow}
                                            hover
                                            key={order.id}
                                        >
                                            <TableCell>
                                                <div className={classes.tableCellInner}>
                                                    <Link to="orders/detail?id=1">
                                                        <Typography
                                                            className={classes.nameText}
                                                            variant="body1"
                                                        >
                                                            {order.id}
                                                        </Typography>
                                                    </Link>
                                                </div>
                                            </TableCell>
                                            <TableCell className={classes.customerCell}>
                                                {order.customer.name}
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
                                            {role && (
                                                <TableCell align="left">
                                                    {(order.status === "Perlu konfirmasi") && (
                                                        <>
                                                            <Button
                                                                color="primary"
                                                                variant="contained"
                                                                style={{ marginRight: 10 }}
                                                                onClick={() => {
                                                                    this.setState({ open: true, title: "Ingin melakukan Konfirmasi?", body: " Pastikan telah melakukan pengecekan pada Rincian Pemesanan dan Pengecekan Pembayaran" });
                                                                }}
                                                            >
                                                                Konfirmasi
                                                            </Button>
                                                            <Button
                                                                color="secondary"
                                                                variant="contained"
                                                                onClick={() => {
                                                                    this.setState({ open: true, title: "Ingin melakukan Pembatalan?", body: " Pastikan telah melakukan pengecekan pada Rincian Pemesanan dan Pengecekan Pembayaran" });
                                                                }}
                                                            >
                                                                Batalkan
                                                            </Button>
                                                        </>
                                                    )}
                                                    {(order.status === "Pemesanan berhasil") && (
                                                        <>
                                                            <Button
                                                                color="secondary"
                                                                variant="contained"
                                                                style={{ marginRight: 10, backgroundColor: "#45B880" }}
                                                                onClick={() => {
                                                                    this.setState({ open: true, title: "Ingin melakukan Konfirmasi Selesai?", body: "Pastikan telah melakukan pengecekan pada Rincian Pemesanan dan Pengecekan Pembayaran" });
                                                                }}
                                                            >
                                                                Selesai
                                                            </Button>
                                                            <Button
                                                                color="secondary"
                                                                variant="contained"
                                                                onClick={() => {
                                                                    this.setState({ open: true, title: "Ingin melakukan Pembatalan?", body: "Pastikan telah melakukan pengecekan pada Rincian Pemesanan dan Pengecekan Pembayaran" });
                                                                }}
                                                            >
                                                                Batalkan
                                                            </Button>
                                                        </>
                                                    )}
                                                </TableCell>
                                            )}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <>
                                {orders.map(order => (
                                    <Card style={{ margin: 10 }} variant="outlined">
                                        <CardContent>
                                            <div style={{
                                                justifyContent: 'space-between',
                                                display: "flex"
                                            }}>
                                                <div style={{
                                                    justifyContent: 'space-between',
                                                    display: "flex"
                                                }}>
                                                    <IconButton
                                                        style={({ color: "#45B880", paddingBottom: 20 })}
                                                    >
                                                        <ShoppingBasket />
                                                    </IconButton>
                                                    <Link to="orders/detail?id=1">
                                                        <div>
                                                            <Typography variant="h5" component="h2">
                                                                {order.customer.name}
                                                            </Typography>
                                                            <Typography className={classes.pos} color="textSecondary">
                                                                {moment(order.createdAt).format('DD MMM YYYY')}
                                                            </Typography>
                                                        </div>
                                                    </Link>
                                                </div>

                                                <div className={classes.statusWrapper}
                                                    style={({ paddingBottom: 20 })}
                                                >
                                                    <Status
                                                        className={classes.status}
                                                        color={statusColors[order.status]}
                                                        size="sm"
                                                    />
                                                    <Typography variant="h6" component="h2">
                                                        {order.status}
                                                    </Typography>
                                                </div>
                                            </div>
                                            <hr style={{ marginBottom: 10 }} />
                                            <Typography variant="h5" component="h2">
                                                Jenis Layanan
                                            </Typography>
                                            <Typography style={{ marginBottom: 10 }} variant="body2" component="p">
                                                {order.services.toString().replace(",", ", ")}
                                            </Typography>
                                            <Typography variant="h5" component="h2">
                                                Pegawai
                                            </Typography>
                                            <Typography style={{ marginBottom: 10 }} variant="body2" component="p">
                                                {order.employee}
                                            </Typography>
                                            <Typography variant="h5" component="h2">
                                                Pembayaran : {(order.status === "Perlu konfirmasi") ? "DP" : "Penuh"}
                                            </Typography>
                                            <Typography style={{ marginBottom: 10 }} variant="body2" component="p">
                                                {(order.status === "Perlu konfirmasi") ? order.nominalDp.toLocaleString('id', { style: 'currency', currency: 'IDR' }) : order.price.toLocaleString('id', { style: 'currency', currency: 'IDR' })}
                                            </Typography>
                                            <Typography variant="h5" component="h2">
                                                Total Pemesanan
                                            </Typography>
                                            <Typography variant="h6" component="h2" style={{ color: "#45B880" }}>
                                                {order.price.toLocaleString('id', { style: 'currency', currency: 'IDR' })}
                                            </Typography>
                                        </CardContent>

                                        <CardActions style={{ float: "right" }}>
                                            {role && (
                                                <>
                                                    {(order.status === "Perlu konfirmasi") && (
                                                        <>
                                                            <Button
                                                                color="primary"
                                                                variant="contained"
                                                                style={{ marginRight: 10 }}
                                                                onClick={() => {
                                                                    this.setState({ open: true, title: "Ingin melakukan Konfirmasi?", body: " Pastikan telah melakukan pengecekan pada Rincian Pemesanan dan Pengecekan Pembayaran" });
                                                                }}
                                                            >
                                                                Konfirmasi
                                                            </Button>
                                                            <Button
                                                                color="secondary"
                                                                variant="contained"
                                                                onClick={() => {
                                                                    this.setState({ open: true, title: "Ingin melakukan Konfirmasi?", body: " Pastikan telah melakukan pengecekan pada Rincian Pemesanan dan Pengecekan Pembayaran" });
                                                                }}
                                                            >
                                                                Batalkan
                                                            </Button>
                                                        </>
                                                    )}
                                                    {(order.status === "Pemesanan berhasil") && (
                                                        <>
                                                            <Button
                                                                color="secondary"
                                                                variant="contained"
                                                                style={{ marginRight: 10, backgroundColor: "#45B880" }}
                                                                onClick={() => {
                                                                    this.setState({ open: true, title: "Ingin melakukan Konfirmasi?", body: " Pastikan telah melakukan pengecekan pada Rincian Pemesanan dan Pengecekan Pembayaran" });
                                                                }}
                                                            >
                                                                Selesai
                                                            </Button>
                                                            <Button
                                                                color="secondary"
                                                                variant="contained"
                                                                onClick={() => {
                                                                    this.setState({ open: true, title: "Ingin melakukan Konfirmasi?", body: " Pastikan telah melakukan pengecekan pada Rincian Pemesanan dan Pengecekan Pembayaran" });
                                                                }}
                                                            >
                                                                Batalkan
                                                            </Button>
                                                        </>
                                                    )}
                                                </>
                                            )}
                                        </CardActions>
                                    </Card>

                                ))}
                            </>
                        )}

                        <Dialog
                            open={open}
                            onClose={this.handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    {body}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleClose} color="primary">
                                    Kembali
                                </Button>
                                <Button onClick={this.handleClose} color="primary" autoFocus>
                                    Setuju
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </PortletContent>
                </PerfectScrollbar>
            </Portlet >
        );
    }
}

OrdersTable.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(OrdersTable);
