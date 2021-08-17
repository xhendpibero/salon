import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// Externals
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { useHttpClient } from '../../services/hooks/http-hook';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { CircularProgress, Typography } from '@material-ui/core';

// Shared layouts
import { Dashboard as DashboardLayout } from 'layouts';

// Custom components
import { CustomersTable } from './components';
import { Toolbar } from '../../components';

// Component styles
import styles from './styles';

class ProductList extends Component {
  signal = true;

  state = {
    isLoading: false,
    limit: 10,
    page: 0,
    row: 10,
    customers: [],
    customersTemp: [],
    selectedCustomers: [],
    error: null,
    customers: [],
    selectedCustomers: [],
  };

  get = async () => {
    try {
      this.setState({ isLoading: true });
      const { get } = useHttpClient();
      this.setState({ isLoading: true });
      const token = localStorage.getItem("token");
      const customers = await get("/customers", token)

      if (this.signal) {
        this.setState({
          isLoading: false,
          customers: customers?.data,
          customersTemp: customers?.data,
          limit: customers?.data.length
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

  componentWillMount() {
    this.signal = true;
    this.get();
  }

  componentWillUnmount() {
    this.signal = false;
  }

  onChange = e => {
    const customers = this.state.customersTemp.filter((x) => {
      return String(x?.fullname).toLowerCase().indexOf(String(e.target.value)?.toLowerCase()) >= 0 ||
        String(x?.employee_id).toLowerCase().indexOf(String(e.target.value)?.toLowerCase()) >= 0;
    })
    this.setState({ customers });
  }

  renderCustomers() {
    const { classes, history } = this.props;
    const { isLoading, customers } = this.state;

    if (isLoading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    if (customers.length === 0) {
      return (
        <Typography variant="h6">Tidak ada pelanggan yang tersedia</Typography>
      );
    }

    return (
      <CustomersTable
        count={this.state?.customersTemp?.length}
        customers={customers}
      />
    );
  }

  render() {
    const { classes, history } = this.props;

    return (
      <DashboardLayout title="Pelanggan">
        <div className={classes.root}>
          <Toolbar
            placeholder="Cari Pelanggan"
            buttonAdd={"Tambah Pelanggan"}
            selectedCustomers={[]}
            onChange={this.onChange}
            onClick={() => history.push({ pathname: '/customers/s' })}
          />
          <div className={classes.content}>{this.renderCustomers()}</div>
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
