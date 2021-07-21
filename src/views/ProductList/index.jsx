import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';

// Material components
import {
  CircularProgress,
  Typography,
  withStyles
} from '@material-ui/core';

// Shared layouts
import { Dashboard as DashboardLayout } from 'layouts';

// Shared services
import { getProducts } from 'services/product';

// Custom components
import { ProductsToolbar, ProductsTable } from './components';

// Component styles
import styles from './styles';

class ProductList extends Component {
  signal = true;

  state = {
    isLoading: false,
    limit: 6,
    products: [],
    productsTotal: 0,
    selectedProducts: [],
    error: null
  };

  async getProducts(limit) {
    try {
      this.setState({ isLoading: true });

      const { products, productsTotal } = await getProducts(limit);

      if (this.signal) {
        this.setState({
          isLoading: false,
          products,
          productsTotal,
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
    const { isLoading, products } = this.state;

    if (isLoading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    if (products.length === 0) {
      return (
        <Typography variant="h6">Tidak ada layanan yang tersedia</Typography>
      );
    }

    return (
      <ProductsTable
        onSelect={this.handleSelect}
        products={products}
      />

    );
  }

  render() {
    const { classes } = this.props;

    return (
      <DashboardLayout title="Services">
        <div className={classes.root}>
          <ProductsToolbar />
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

export default withStyles(styles)(ProductList);
