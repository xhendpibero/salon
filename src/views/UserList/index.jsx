import React, { Component } from 'react';
import { withSnackbar } from 'notistack';

// Externals
import compose from 'recompose/compose';
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
      const token = localStorage.getItem("token");
      const products = await get("/employees", token)

      if (this.signal) {
        this.setState({
          isLoading: false,
          users: products?.data.slice(0, 10),
          usersTemp: products?.data,
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
    this.setState({ isLoading: true });
    const { post } = useHttpClient();
    const { selectedUsers } = this.state;
    let data = [];
    const user = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    await selectedUsers.map(async (e) => {
      const response = await post("/employees/hide", {
        employee_id: e,
        updated_by: user
      }, token)
      data.push(response.status === 200)
      if (data.length === selectedUsers.length) {
        if (data.filter(e => e).length) {
          this.props.enqueueSnackbar('Berhasil sembunyikan pelanggan.')
          this.get();
          this.setState({ selectedUsers: [] });
        } else {
          this.props.enqueueSnackbar('Gagal sembunyikan pelanggan.');
          this.setState({ isLoading: false, selectedUsers: [] });
        }
      }
    })
  };

  delete = async () => {
    this.setState({ isLoading: true });
    const { del } = useHttpClient();
    const { selectedUsers } = this.state;
    let data = [];
    const token = localStorage.getItem("token");
    await selectedUsers.map(async (e) => {
      const response = await del("/employees", {
        employee_id: e
      }, token)
      data.push(response.status === 200)
      if (data.length === selectedUsers.length) {
        if (data.filter(e => e).length) {
          this.props.enqueueSnackbar('Berhasil hapus pelanggan.')
          this.get();
          this.setState({ selectedUsers: [] });
        } else {
          this.props.enqueueSnackbar('Gagal hapus pelanggan.');
          this.setState({ isLoading: false, selectedUsers: [] });
        }
      }
    })
  };

  componentWillMount() {
    this.signal = true;
    this.get();
  }

  componentWillUnmount() {
    this.signal = false;
  }

  handleSelect = (data, index) => {
    this.setState({ [index]: data });
    if (index === "row") {
      this.setState({ users: this.state.usersTemp.slice(this.state.page * data, (this.state.page + 1) * data) });
    } else if (index === "page") {
      this.setState({ users: this.state.usersTemp.slice(this.state.row * data, this.state.row * (data + 1)) });
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
      return <Typography variant="h6" style={{ textAlign: "center" }}>Tidak ada pegawai</Typography>;
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

export default compose(
  withSnackbar,
  withStyles(styles),
)(UserList);