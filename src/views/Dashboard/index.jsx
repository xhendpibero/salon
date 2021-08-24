import React, { Component } from 'react';
import { withSnackbar } from 'notistack';

// Externals
import compose from 'recompose/compose';
import { useHttpClient } from '../../services/hooks/http-hook';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Grid } from '@material-ui/core';

// Shared layouts
import { Dashboard as DashboardLayout } from 'layouts';

// Shared components
import {
  ProductCard,
} from 'components';

// Custom components
import {
  Budget,
  Users,
  Progress,
  OrdersTable
} from './components';

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4
  },
  item: {
    height: '100%'
  }
});

class Dashboard extends Component {
  state = {
    products: [],
    orders: [],
    employee: 0,
    customer: 0,
    isLoading: false,
    http: { ...useHttpClient() }
  }

  getEmployee = async () => {
    const { http: { get } } = this.state
    this.setState({ isLoading: true });
    const token = localStorage.getItem("token");
    const response = await get("/employees",
      token);
    if (response?.status === 200) {
      this.setState({ employee: response?.data?.filter((e) => e.is_show).length });
    }
  }

  getCustomer = async () => {
    const { http: { get } } = this.state
    this.setState({ isLoading: true });
    const token = localStorage.getItem("token");
    const response = await get("/customers",
      token);
    if (response?.status === 200) {
      this.setState({ customer: response?.data?.length });
    }
  }

  getProduct = async () => {
    this.setState({ isLoading: true });
    const { get } = useHttpClient();
    const token = localStorage.getItem("token");
    const products = await get("/services?show_status=show_only", token)
    if (products?.status === 200) {
      this.setState({
        isLoading: false,
        products: products?.data,
      });
    }
  };

  getOrder = async () => {
    this.setState({ isLoading: true });
    const { get } = useHttpClient();
    const token = localStorage.getItem("token");
    const orders = await get("/orders", token)
    if (orders?.status === 200) {
      this.setState({
        isLoading: false,
        orders: orders?.data,
      });
    }
  };

  componentWillMount() {
    const role = localStorage.getItem("role") === "admin";
    if (role) {
      this.getCustomer();
      this.getEmployee();
      this.getOrder();
    } else {
      this.getProduct();
    }
  }

  render() {
    const { classes, history } = this.props;
    const role = localStorage.getItem("role") === "admin";
    const {
      products,
      orders,
      employee,
      customer,
      isLoading,
    } = this.state;

    return (
      <DashboardLayout title="Beranda">
        <div className={classes.root}>
          {role ? (
            <Grid
              container
              spacing={4}
            >
              <Grid
                item
                lg={4}
                xs={12}
              >
                <Budget className={classes.item} title={"TANGGAL"} value={new Date()} />
              </Grid>
              <Grid
                item
                lg={4}
                xs={12}
              >
                <Users className={classes.item} title={"TOTAL PELANGGAN"} value={customer} />
              </Grid>
              <Grid
                item
                lg={4}
                xs={12}
              >
                <Progress className={classes.item} title={"TOTAL KARYAWAN"} value={employee} />
              </Grid>
              <Grid
                item
                lg={12}
                md={12}
                xl={9}
                xs={12}
              >
                <OrdersTable className={classes.item} orders={orders} isLoading={isLoading} />
              </Grid>
            </Grid>
          ) : products && products.length ?
            <Grid
              container
              spacing={2}
            >
              {products.map((product, index) => (
                <Grid
                  item
                  key={product.id}
                  lg={4}
                  md={6}
                  xs={12}
                  onClick={() => history.push({ pathname: '/orders/add' })}
                >
                  <ProductCard
                    image={product.thumbnail}
                    title={product.service_name}
                    description={product.description}
                    secondary={"Harga " + new Number(product.price).toLocaleString('id', { style: 'currency', currency: 'IDR' }).split(",")[0]}
                  />
                </Grid>
              ))
              }
            </Grid> : "Mohon tunggu sebentar..."
          }
        </div>
      </DashboardLayout>
    );
  }
}

export default compose(
  withSnackbar,
  withStyles(styles)
)(Dashboard);
