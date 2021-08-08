import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Grid } from '@material-ui/core';

// Shared layouts
import { Dashboard as DashboardLayout } from 'layouts';

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter,
  ProductCard,
  BookingCard,
} from 'components';

import { getProducts } from 'services/product';

// Custom components
import {
  Budget,
  Users,
  Progress,
  Profit,
  SalesChart,
  DevicesChart,
  ProductList,
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
  signal = true;

  state = {
    limit: 100,
    isLoading: false,
    products: [],
    productsTotal: 0,
    selectedUsers: "",
    selectedTimes: 0,
  }

  componentWillMount() {
    this.signal = true;

    const { limit } = this.state;

    this.getProducts(limit);
  }


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

  render() {
    const { classes, history } = this.props;
    const role = localStorage.getItem("role") === "admin";
    const {
      products,
      selectedProducts,
    } = this.state;

    return (
      <DashboardLayout title="Celine Salon">
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
                <Users className={classes.item} title={"TOTAL PELANGGAN"} value={20} />
              </Grid>
              <Grid
                item
                lg={4}
                xs={12}
              >
                <Progress className={classes.item} title={"TOTAL KARYAWAN"} value={10} />
              </Grid>
              <Grid
                item
                lg={12}
                md={12}
                xl={9}
                xs={12}
              >
                <OrdersTable className={classes.item} />
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
                    image={product.imageUrl}
                    title={product.title}
                    description={product.description}
                    secondary={"Harga Rp " + product.price}
                  />
                </Grid>
              ))
              }
            </Grid> : "Loading..."
          }
        </div>
      </DashboardLayout>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
