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
    "Pesanan berhasil": 'primary',
    "Perlu konfirmasi": 'info',
    "Pesanan batal": 'danger'
};

class OrdersTable extends Component {

    render() {
        const { classes, className, isLoading, orders, ordersTotal } = this.props;
        const role = localStorage.getItem("role") === "admin";

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
                        {showOrders && (
                            // <Table>
                            //     <TableHead>
                            //         <TableRow>
                            //             <TableCell>ID</TableCell>
                            //             <TableCell align="left">Pemesan</TableCell>
                            //             <TableCell
                            //                 align="left"
                            //                 sortDirection="asc"
                            //             >
                            //                 <Tooltip
                            //                     enterDelay={300}
                            //                     title="Sort"
                            //                 >
                            //                     <TableSortLabel
                            //                         // active
                            //                         direction="asc"
                            //                     >
                            //                         Tanggal Pemesanan
                            //                     </TableSortLabel>
                            //                 </Tooltip>
                            //             </TableCell>
                            //             <TableCell align="left">Status</TableCell>
                            //             {role && (
                            //                 <TableCell align="left">Aksi</TableCell>
                            //             )}
                            //         </TableRow>
                            //     </TableHead>
                            //     <TableBody>
                            //         {orders.map(order => (
                            //             <TableRow
                            //                 className={classes.tableRow}
                            //                 hover
                            //                 key={order.id}
                            //             >
                            //                 <TableCell>
                            //                     <div className={classes.tableCellInner}>
                            //                         <Link to="orders/detail?id=1">
                            //                             <Typography
                            //                                 className={classes.nameText}
                            //                                 variant="body1"
                            //                             >
                            //                                 {order.id}
                            //                             </Typography>
                            //                         </Link>
                            //                     </div>
                            //                 </TableCell>
                            //                 <TableCell className={classes.customerCell}>
                            //                     {order.customer.name}
                            //                 </TableCell>
                            //                 <TableCell>
                            //                     {moment(order.createdAt).format('DD/MM/YYYY')}
                            //                 </TableCell>
                            //                 <TableCell>
                            //                     <div className={classes.statusWrapper}>
                            //                         <Status
                            //                             className={classes.status}
                            //                             color={statusColors[order.status]}
                            //                             size="sm"
                            //                         />
                            //                         {order.status}
                            //                     </div>
                            //                 </TableCell>
                            //                 {role && (
                            //                     <TableCell align="left">
                            //                         {(order.status === "Perlu konfirmasi") && (
                            //                             <>
                            //                                 <Button
                            //                                     color="primary"
                            //                                     variant="contained"
                            //                                     style={{ marginRight: 10 }}
                            //                                 >
                            //                                     Konfirmasi
                            //                                 </Button>
                            //                                 <Button
                            //                                     color="secondary"
                            //                                     variant="contained"
                            //                                 >
                            //                                     Batalkan
                            //                                 </Button>
                            //                             </>
                            //                         )}
                            //                         {(order.status === "Pesanan berhasil") && (
                            //                             <>
                            //                                 <Button
                            //                                     color="secondary"
                            //                                     variant="contained"
                            //                                     style={{ marginRight: 10, backgroundColor: "#45B880" }}
                            //                                 >
                            //                                     Selesai
                            //                                 </Button>
                            //                                 <Button
                            //                                     color="secondary"
                            //                                     variant="contained"
                            //                                 >
                            //                                     Batalkan
                            //                                 </Button>
                            //                             </>
                            //                         )}
                            //                     </TableCell>
                            //                 )}
                            //             </TableRow>
                            //         ))}
                            //     </TableBody>
                            // </Table>
                            <>
                                {orders.map(order => (
                                    <Card style={{ margin: 10 }} variant="outlined">
                                        <CardContent>
                                            <div style={{
                                                justifyContent: 'space-between',
                                                display: "flex"
                                            }}>
                                                <div>
                                                    <Typography variant="h5" component="h2">
                                                        {order.customer.name}
                                                    </Typography>
                                                    <Typography className={classes.pos} color="textSecondary">
                                                        {moment(order.createdAt).format('DD MMM YYYY')}
                                                    </Typography>
                                                </div>
                                                <div className={classes.statusWrapper}>
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
                                                Layanan
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
                                                Nominal DP
                                            </Typography>
                                            <Typography variant="body2" component="p">
                                                {order.nominalDp.toLocaleString('id', { style: 'currency', currency: 'IDR' })}
                                            </Typography>
                                        </CardContent>
                                        <div style={{
                                            paddingLeft: 18
                                        }}>
                                            <div>
                                                <Typography component="h2">
                                                    Total Belanja
                                                </Typography>
                                                <Typography variant="body2" component="p">
                                                    {order.price.toLocaleString('id', { style: 'currency', currency: 'IDR' })}
                                                </Typography>
                                            </div>
                                        </div>

                                        <CardActions style={{ float: "right" }}>
                                            {(order.status === "Perlu konfirmasi") && (
                                                <>
                                                    <Button
                                                        color="primary"
                                                        variant="contained"
                                                        style={{ marginRight: 10 }}
                                                    >
                                                        Konfirmasi
                                                    </Button>
                                                    <Button
                                                        color="secondary"
                                                        variant="contained"
                                                    >
                                                        Batalkan
                                                    </Button>
                                                </>
                                            )}
                                            {(order.status === "Pesanan berhasil") && (
                                                <>
                                                    <Button
                                                        color="secondary"
                                                        variant="contained"
                                                        style={{ marginRight: 10, backgroundColor: "#45B880" }}
                                                    >
                                                        Selesai
                                                    </Button>
                                                    <Button
                                                        color="secondary"
                                                        variant="contained"
                                                    >
                                                        Batalkan
                                                    </Button>
                                                </>
                                            )}
                                        </CardActions>
                                    </Card>

                                ))}
                            </>
                        )}
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
