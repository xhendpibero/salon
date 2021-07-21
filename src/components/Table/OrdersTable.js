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
    Button,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tooltip,
    TableSortLabel,
    Link,
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
    delivered: 'success',
    pending: 'info',
    refund: 'danger'
};

class OrdersTable extends Component {

    render() {
        const { classes, className, isLoading, orders, ordersTotal } = this.props;

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
                                        <TableCell>Order ID</TableCell>
                                        <TableCell align="left">Customer</TableCell>
                                        <TableCell
                                            align="left"
                                            sortDirection="desc"
                                        >
                                            <Tooltip
                                                enterDelay={300}
                                                title="Sort"
                                            >
                                                <TableSortLabel
                                                    active
                                                    direction="desc"
                                                >
                                                    Date
                                                </TableSortLabel>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell align="left">Status</TableCell>
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
                                                <Link to="users/employee?id=1">
                                                    {order.id}
                                                </Link>
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
