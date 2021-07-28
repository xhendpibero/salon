import React, { Component } from 'react';

// Material helpers
import { withStyles } from '@material-ui/core';

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
  state = { tabIndex: 0 };

  render() {
    const { classes, history } = this.props;

    return (
      <DashboardLayout title={"Bukti Transfer"}>
        <div className={classes.root}>
          <Button
            className={classes.importButton}
            style={{ marginBottom: 25 }}
            size="small"
            onClick={() => history.push({ pathname: '/orders' })}
          >
            <ArrowBack className={classes.importIcon} /> Kembali
          </Button>

          <Grid
            container
            spacing={4}
          >
            <OrdersDetails />
          </Grid>
        </div>
      </DashboardLayout>
    );
  }
}

export default withStyles(styles)(Order);
