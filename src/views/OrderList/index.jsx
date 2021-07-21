import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

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
import { Toolbar, OrdersTable } from '../../components';

// Component styles
import styles from './styles';

class OrdersList extends Component {
  signal = true;

  state = {
    isLoading: false,
    limit: 6,
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

    if (isLoading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    if (orders.length === 0) {
      return (
        <Typography variant="h6">Tidak ada layanan yang tersedia</Typography>
      );
    }

    return (
      <OrdersTable className={classes.item} isLoading={isLoading} orders={orders} ordersTotal={ordersTotal} />
    );
  }

  render() {
    const { classes, history } = this.props;

    return (
      <DashboardLayout title="Orders">
        <div className={classes.root}>
          <Toolbar
            placeholder="Search order"
            buttonAdd={"New Entry"}
            selectedUsers={[]}
            onChange={(e) => console.log(e.target.value)}
            onClick={() => history.push({ pathname: '/orders/add' })}
          />
          <div className={classes.content}>{this.renders()}</div>
          <div className={classes.pagination}>
            <Typography variant="caption">1-6 of 20</Typography>
            <IconButton>
              <ChevronLeftIcon />
            </IconButton>
            <IconButton>
              <ChevronRightIcon />
            </IconButton>
          </div>
        </div>
      </DashboardLayout>
    );
  }
}

export default compose(
  withRouter, withStyles(styles))
  (OrdersList);
