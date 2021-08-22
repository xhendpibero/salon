import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Externals
import classNames from 'classnames';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';

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
    Typography,
    IconButton,
    Tooltip,
    TableSortLabel,
    TablePagination
} from '@material-ui/core';

import {
    ShoppingBasket
} from '@material-ui/icons';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

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
    state = {
        rowsPerPage: 10,
        page: 0,
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
                active: false,
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

    handleChangePage = (event, page) => {
        const { onSelect } = this.props;
        this.setState({ page });
        onSelect(page, "page");
    };

    handleChangeRowsPerPage = event => {
        const { onSelect } = this.props;
        this.setState({ rowsPerPage: event.target.value });
        onSelect(event.target.value, "row");
    };

    render() {
        const { classes, className, isLoading, handleSubmit } = this.props;
        const { rowsPerPage, page, listCell } = this.state;

        const sortData = listCell.find(order => order.active)
        const id = sortData?.id;
        const direction = sortData?.direction;

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
                <PortletContent
                    className={classes.portletContent}
                    noPadding
                >
                    <PerfectScrollbar>
                        {isLoading && (
                            <div className={classes.progressWrapper}>
                                <CircularProgress />
                            </div>
                        )}
                        {showOrders && role ? (
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
                                        {role && (
                                            <TableCell align="left">Aksi</TableCell>
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
                                            {role && (
                                                <TableCell align="left">
                                                    {(order.status === "unconfirmed") && (
                                                        <>
                                                            <Button
                                                                color="primary"
                                                                variant="contained"
                                                                style={{ marginRight: 10 }}
                                                                onClick={() => handleSubmit("confirm", { order_id: order.order_id })}
                                                            >
                                                                Konfirmasi
                                                            </Button>
                                                            <Button
                                                                color="secondary"
                                                                variant="contained"
                                                                onClick={() => handleSubmit("cancel", { order_id: order.order_id })}
                                                            >
                                                                Batalkan
                                                            </Button>
                                                        </>
                                                    )}
                                                    {(order.status === "confirmed") && (
                                                        <>
                                                            <Button
                                                                color="secondary"
                                                                variant="contained"
                                                                style={{ marginRight: 10, backgroundColor: "#45B880" }}
                                                                onClick={() => handleSubmit("complete", { order_id: order.order_id })}
                                                            >
                                                                Selesai
                                                            </Button>
                                                            <Button
                                                                color="secondary"
                                                                variant="contained"
                                                                onClick={() => handleSubmit("cancel", { order_id: order.order_id })}
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
                                                    <Link to={"orders/detail?id=" + order.order_id}>
                                                        <div>
                                                            <Typography variant="h5" component="h2">
                                                                {order.customer_account_name}
                                                            </Typography>
                                                            <Typography className={classes.pos} color="textSecondary">
                                                                {moment(order.created).format('DD MMM YYYY')}
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
                                                        {statusText[order.status]}
                                                    </Typography>
                                                </div>
                                            </div>
                                            <hr style={{ marginBottom: 10 }} />
                                            <Typography variant="h5" component="h2">
                                                Nama Pegawai
                                            </Typography>
                                            <Typography style={{ marginBottom: 10 }} variant="body2" component="p">
                                                {order.employee_name}
                                            </Typography>
                                            <Typography variant="h5" component="h2">
                                                Jenis Layanan
                                            </Typography>
                                            <Typography style={{ marginBottom: 10 }} variant="body2" component="p">
                                                {order.detail_order.map(e => e.service_name).toString().replace(",", ", ")}
                                            </Typography>
                                            <Typography variant="h5" component="h2">
                                                Pembayaran : {(order.is_down_payment) ? "DP" : "Penuh"}
                                            </Typography>
                                            <Typography style={{ marginBottom: 10 }} variant="body2" component="p">
                                                {new Number(order.total_payment).toLocaleString('id', { style: 'currency', currency: 'IDR' })}
                                            </Typography>
                                            <Typography variant="h5" component="h2">
                                                Total Pemesanan
                                            </Typography>
                                            <Typography variant="h6" component="h2" style={{ color: "#45B880" }}>
                                                {new Number(order.customer_payment_nominal).toLocaleString('id', { style: 'currency', currency: 'IDR' })}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                ))}
                            </>
                        )}
                    </PerfectScrollbar>
                    {showOrders && role && (
                        <TablePagination
                            backIconButtonProps={{
                                'aria-label': 'Previous Page'
                            }}
                            component="div"
                            count={this.props?.count || 10}
                            nextIconButtonProps={{
                                'aria-label': 'Next Page'
                            }}
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            rowsPerPageOptions={[5, 10, 25]}
                        />
                    )}
                </PortletContent>
            </Portlet >
        );
    }
}

export default withStyles(styles)(OrdersTable);
