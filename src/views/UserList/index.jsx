import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';
import { useHttpClient } from '../../services/hooks/http-hook';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { CircularProgress, Typography } from '@material-ui/core';

// Shared layouts
import { Dashboard as DashboardLayout } from 'layouts';

// Custom components
import { UsersToolbar, UsersTable } from './components';

// Component styles
import styles from './style';

class UserList extends Component {
  signal = true;

  state = {
    isLoading: false,
    limit: 10,
    page: 0,
    row: 10,
    users: [],
    usersTemp: [],
    selectedUsers: [],
    error: null
  };

  get = async () => {
    try {
      this.setState({ isLoading: true });
      const { get } = useHttpClient();
      this.setState({ isLoading: true });
      const token = localStorage.getItem("token");
      const products = await get("/employees", token)

      if (this.signal) {
        this.setState({
          isLoading: false,
          users: products?.data,
          usersTemp: products?.data,
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
    const { selectedUsers } = this.state;
    const user = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    console.log({ selectedUsers })
    selectedUsers.map(async (e) => {
      const data = await post("/employees/hide", {
        employee_id: e,
        updated_by: user
      }, token)
      console.log({ data })
    })
  };

  delete = async () => {
    const { del } = useHttpClient();
    const { selectedUsers } = this.state;
    const token = localStorage.getItem("token");
    selectedUsers.map(async (e) => {
      const data = await del("/employees", {
        employee_id: e
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

  handleSelect = (selectedUsers, index) => {
    this.setState({ [index]: selectedUsers });
    if (index === "row") {
      this.setState({ users: this.state.usersTemp.slice(this.state.page * selectedUsers, (this.state.page + 1) * selectedUsers) });
    } else if (index === "page") {
      this.setState({ users: this.state.usersTemp.slice(this.state.row * selectedUsers, this.state.row * (selectedUsers + 1)) });
    }
  };

  onChange = e => {
    const users = this.state.usersTemp.filter((x) => {
      return String(x?.fullname).toLowerCase().indexOf(String(e.target.value)?.toLowerCase()) >= 0 ||
        String(x?.employee_id).toLowerCase().indexOf(String(e.target.value)?.toLowerCase()) >= 0;
    })
    this.setState({ users });
  }

  renderUsers() {
    const { classes } = this.props;
    const { isLoading, users, error } = this.state;

    if (isLoading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    if (error) {
      return <Typography variant="h6">{error}</Typography>;
    }

    if (users.length === 0) {
      return <Typography variant="h6">Tidak ada pegawai</Typography>;
    }

    return (
      <UsersTable
        count={this.state.usersTemp.length}
        onSelect={this.handleSelect}
        users={users}
      />
    );
  }

  render() {
    const { classes } = this.props;
    const { selectedUsers } = this.state;

    return (
      <DashboardLayout title="Pegawai">
        <div className={classes.root}>
          <UsersToolbar selectedUsers={selectedUsers} onChange={this.onChange} hide={this.hide} delete={this.delete} />
          <div className={classes.content}>{this.renderUsers()}</div>
        </div>
      </DashboardLayout>
    );
  }
}

export default withStyles(styles)(UserList);
