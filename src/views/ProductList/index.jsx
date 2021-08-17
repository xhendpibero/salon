import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';
import { useHttpClient } from '../../services/hooks/http-hook';

// Material components
import {
  CircularProgress,
  Typography,
  withStyles
} from '@material-ui/core';

// Shared layouts
import { Dashboard as DashboardLayout } from 'layouts';

// Custom components
import { ProductsToolbar, ProductsTable } from './components';

// Component styles
import styles from './styles';

class ProductList extends Component {
  signal = true;

  state = {
    isLoading: false,
    limit: 6,
    page: 0,
    row: 10,
    products: [],
    productsTemp: [],
    productsTotal: 0,
    selectedProducts: [],
    error: null
  };

  get = async () => {
    try {
      this.setState({ isLoading: true });
      const { get } = useHttpClient();
      this.setState({ isLoading: true });
      const token = localStorage.getItem("token");
      const products = await get("/services", token)
      console.log({ products })

      if (this.signal) {
        this.setState({
          isLoading: false,
          products: products?.data,
          productsTotal: products?.data.length,
          productsTemp: products?.data,
          limit: products?.data.length
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
  };

  hide = async () => {
    const { post } = useHttpClient();
    const { selectedProducts } = this.state;
    const user = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    selectedProducts.map(async (e) => {
      const data = await post("/services/hide", {
        "service_id": e,
        "updated_by": user
      }, token)
      console.log({ data })
    })
  };

  delete = async () => {
    const { del } = useHttpClient();
    const { selectedProducts } = this.state;
    const token = localStorage.getItem("token");
    selectedProducts.map(async (e) => {
      const data = await del("/services", {
        "service_id": e
      }, token)
      console.log({ data })
    })
  };

  componentWillMount() {
    this.signal = true;
    this.get();
  }

  componentWillUnmount() {
    this.signal = false;
  }

  handleSelect = (selectedProducts, index) => {
    this.setState({ [index]: selectedProducts });
    if (index === "row") {
      this.setState({ products: this.state.productsTemp.slice(this.state.page * selectedProducts, (this.state.page + 1) * selectedProducts) });
    } else if (index === "page") {
      this.setState({ products: this.state.productsTemp.slice(this.state.row * selectedProducts, this.state.row * (selectedProducts + 1)) });
    }
  };

  onChange = e => {
    const products = this.state.productsTemp.filter((x) => {
      return String(x?.service_name).toLowerCase().indexOf(String(e.target.value)?.toLowerCase()) >= 0 ||
        String(x?.service_id).toLowerCase().indexOf(String(e.target.value)?.toLowerCase()) >= 0;
    })
    this.setState({ products });
  }

  renderProducts() {
    const { classes } = this.props;
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
        <Typography variant="h6">Tidak ada jenis layanan yang tersedia</Typography>
      );
    }

    return (
      <ProductsTable
        count={this.state.productsTemp.length}
        onSelect={this.handleSelect}
        products={products}
      />

    );
  }

  render() {
    const { classes } = this.props;

    return (
      <DashboardLayout title="Jenis Layanan">
        <div className={classes.root}>
          <ProductsToolbar selected={this.state.selectedProducts} onChange={this.onChange} hide={this.hide} delete={this.delete} />
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
