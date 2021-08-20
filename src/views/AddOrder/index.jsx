import React, { Component } from 'react';

// Material helpers
import { withStyles } from '@material-ui/core';
import compose from 'recompose/compose';
import { useHttpClient } from '../../services/hooks/http-hook';

// Material components
import { Button, Grid } from '@material-ui/core';

// Material icons
import {
  ArrowBack,
} from '@material-ui/icons';

// Shared layouts
import { Dashboard as DashboardLayout } from 'layouts';

// Custom components
import { OrdersDetails } from './components';

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4
  }
});

class Order extends Component {
  state = { products: [], isLoadingProduct: false };

  getProduct = async () => {
    this.setState({ isLoadingProduct: true });
    const { get } = useHttpClient();
    const token = localStorage.getItem("token");
    const products = await get("/services", token)
    if (products?.status === 200) {
      this.setState({
        isLoadingProduct: false,
        products: products?.data,
      });
      return true
    }
  };

  componentWillMount() {
    this.getProduct();
  }


  render() {
    const { classes, history } = this.props;

    return (
      <DashboardLayout title={"Buat Pemesanan"}>
        <div className={classes.root}>
          <Button
            className={classes.importButton}
            style={{ marginBottom: 40 }}
            size="small"
            onClick={() => history.push({ pathname: '/orders' })}
          >
            <ArrowBack className={classes.importIcon} /> Kembali
          </Button>

          <Grid
            container
            spacing={4}
          >
            <OrdersDetails products={this.state.products} isLoadingProduct={this.state.isLoadingProduct} />
          </Grid>
        </div>
      </DashboardLayout>
    );
  }
}

export default compose(
  withStyles(styles)
)(Order);
