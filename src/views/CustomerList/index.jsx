import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// Externals
import compose from 'recompose/compose';

// Externals
import PropTypes from 'prop-types';

// Material components
import {
  IconButton,
  CircularProgress,
  Grid,
  Typography,
  withStyles
} from '@material-ui/core';

// Material icons
import {
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon
} from '@material-ui/icons';

// Shared layouts
import { Dashboard as DashboardLayout } from 'layouts';

// Shared services
import { getUsers } from 'services/user';

// Custom components
import { ProductsToolbar, ProductCard, ProductsTable } from './components';
import { Toolbar } from '../../components';

// Component styles
import styles from './styles';

class ProductList extends Component {
  signal = true;

  state = {
    isLoading: false,
    limit: 6,
    users: [],
    selectedProducts: [],
    error: null
  };

  async getProducts(limit) {
    try {
      this.setState({ isLoading: true });

      const { users } = await getUsers(limit);

      if (this.signal) {
        this.setState({
          isLoading: false,
          users,
          limit
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

  componentWillMount() {
    this.signal = true;

    const { limit } = this.state;

    this.getProducts(limit);
  }

  componentWillUnmount() {
    this.signal = false;
  }

  handleSelect = selectedProducts => {
    this.setState({ selectedProducts });
  };

  renderProducts() {
    const { classes, history } = this.props;
    const { isLoading, users } = this.state;

    if (isLoading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    if (users.length === 0) {
      return (
        <Typography variant="h6">Tidak ada pelanggan yang tersedia</Typography>
      );
    }

    return (
      <ProductsTable
        onSelect={this.handleSelect}
        users={users}
      />
    );
  }

  render() {
    const { classes, history } = this.props;

    return (
      <DashboardLayout title="Pelanggan">
        <div className={classes.root}>
          {/* <ProductsToolbar /> */}
          <Toolbar
            placeholder="Cari Pelanggan"
            buttonAdd={"Tambah Pelanggan"}
            selectedUsers={[]}
            onChange={null}
            onClick={() => history.push({ pathname: '/orders/report' })}
          />
          <div className={classes.content}>{this.renderProducts()}</div>
        </div>
      </DashboardLayout>
    );
  }
}

ProductList.propTypes = {
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default compose(
  withRouter, withStyles(styles)
)(ProductList);
