import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';

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
import { EmployeeProfile, EmployeeDetails } from './components';

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4
  }
});

class Employee extends Component {
  state = { tabIndex: 0 };

  render() {
    const { classes, location, history } = this.props;
    const title = location.search ? "Edit" : "Tambah";

    return (
      <DashboardLayout title={title + " Pegawai"}>
        <div className={classes.root}>
          <Button
            className={classes.importButton}
            style={{ marginBottom: 25 }}
            size="small"
            onClick={() => history.push({ pathname: '/users' })}
          >
            <ArrowBack className={classes.importIcon} /> Kembali
          </Button>

          <Grid
            container
            spacing={4}
          >
            <Grid
              item
              lg={4}
              md={6}
              xl={4}
              xs={12}
            >
              <EmployeeProfile />
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xl={8}
              xs={12}
            >
              <EmployeeDetails />
            </Grid>
          </Grid>
        </div>
      </DashboardLayout>
    );
  }
}

Employee.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Employee);