import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Externals
import classNames from 'classnames';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Tooltip,
  TableSortLabel,
  TablePagination
} from '@material-ui/core';

// Shared helpers
import { getInitials } from 'helpers';

// Shared components
import { Portlet, PortletContent, Status } from 'components';

// Component styles
import styles from './styles';

class UsersTable extends Component {
  state = {
    selectedUsers: [],
    rowsPerPage: 10,
    page: 0,
    listCell: [
      {
        id: "employee_id",
        name: "ID",
        active: false,
        direction: "desc",
      },
      {
        id: "fullname",
        name: "Nama Pemesan",
        active: false,
        direction: "desc",
      },
      {
        id: "address",
        name: "Alamat",
        active: false,
        direction: "desc",
      },
      {
        id: "phone_number",
        name: "Nomor HP",
        active: false,
        direction: "desc",
      },
      {
        id: "created",
        name: "Tanggal Daftar",
        active: true,
        direction: "desc",
      },
      {
        id: "is_show",
        name: "Status",
        active: false,
        direction: "desc",
      },
    ],
  };

  sortHandler = (id) => {
    const listCell = this.state.listCell.map((e) => {
      if (id === e.id) {
        if (e.active) {
          return {
            ...e,
            direction: e.direction === "desc" ? "asc" : "desc"
          }
        } else {
          return {
            ...e,
            active: true,
          }
        }
      }
      return { ...e, active: false }
    })
    this.setState({ listCell })
  }

  handleSelectAll = event => {
    const { users, onSelect } = this.props;

    let selectedUsers;

    if (event.target.checked) {
      selectedUsers = users.map(user => user.employee_id);
    } else {
      selectedUsers = [];
    }

    this.setState({ selectedUsers });

    onSelect(selectedUsers, "selectedUsers");
  };

  handleSelectOne = (event, employee_id) => {
    const { onSelect } = this.props;
    const { selectedUsers } = this.state;

    const selectedIndex = selectedUsers.indexOf(employee_id);
    let newSelectedUsers = [];

    if (selectedIndex === -1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers, employee_id);
    } else if (selectedIndex === 0) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUsers = newSelectedUsers.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1)
      );
    }

    this.setState({ selectedUsers: newSelectedUsers });

    onSelect(newSelectedUsers, "selectedUsers");
  };

  handleChangePage = (event, page) => {
    const { onSelect } = this.props;
    this.setState({ page });
    onSelect(page, "page");
  };

  handleChangeRowsPerPage = event => {
    const { onSelect } = this.props;
    this.setState({ rowsPerPage: event.target.value });
    onSelect(event.target.value, "row");
  };

  render() {
    const { classes, className } = this.props;
    const { selectedUsers, rowsPerPage, page, listCell } = this.state;

    const sortData = listCell.find(order => order.active)
    const { id, direction } = sortData;

    let users = [];
    if (id === "created") {
      users = this.props.users.sort((a, b) => (new Date(a[id]).getTime() > new Date(b[id]).getTime()) ? direction === "asc" ? 1 : -1 : ((new Date(b[id]).getTime() > new Date(a[id]).getTime()) ? direction === "asc" ? -1 : 1 : 0))
    } else {
      users = this.props.users.sort((a, b) => (a[id] > b[id]) ? direction === "asc" ? 1 : -1 : ((b[id] > a[id]) ? direction === "asc" ? -1 : 1 : 0))
    }

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet className={rootClassName}>
        <PortletContent noPadding>
          <PerfectScrollbar>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    <Checkbox
                      checked={selectedUsers.length === users.length}
                      color="primary"
                      indeterminate={
                        selectedUsers.length > 0 &&
                        selectedUsers.length < users.length
                      }
                      onChange={this.handleSelectAll}
                    />
                    Foto
                  </TableCell>
                  {listCell.map((e) =>
                    <TableCell
                      align="left"
                      direction={e.direction}
                      onClick={() => this.sortHandler(e.id)}
                    >
                      <Tooltip
                        enterDelay={300}
                        title="Sort"
                      >
                        <TableSortLabel
                          active={e.active}
                          direction={e.direction}
                        >
                          {e.name}
                        </TableSortLabel>
                      </Tooltip>
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {users
                  .map(user => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={user.employee_id}
                      selected={selectedUsers.indexOf(user.employee_id) !== -1}
                    >
                      <TableCell className={classes.tableCell}>
                        <div className={classes.tableCellInner}>
                          <Checkbox
                            checked={selectedUsers.indexOf(user.employee_id) !== -1}
                            color="primary"
                            onChange={event =>
                              this.handleSelectOne(event, user.employee_id)
                            }
                            value="true"
                          />
                          <Avatar
                            className={classes.avatar}
                            src={user.profile_image}
                          >
                            {getInitials(user.fullname)}
                          </Avatar>
                        </div>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        <Link to={"users/employee?id=" + user.employee_id}>
                          <Typography
                            variant="body1"
                          >
                            {user.employee_id}
                          </Typography>
                        </Link>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        <Link to={"users/employee?id=" + user.employee_id}>
                          <Typography
                            variant="body1"
                          >
                            {user.fullname}
                          </Typography>
                        </Link>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {user.address}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {user.phone_number}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {moment(user.created).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell>
                        <div className={classes.statusWrapper}>
                          <Status
                            className={classes.status}
                            color={user.is_show ? 'success' : 'danger'}
                            size="sm"
                          />
                          {user.is_show ? "Tersedia" : "Tidak Tersedia"}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </PerfectScrollbar>
          <TablePagination
            backIconButtonProps={{
              'aria-label': 'Previous Page'
            }}
            component="div"
            count={this.props.count}
            nextIconButtonProps={{
              'aria-label': 'Next Page'
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </PortletContent>
      </Portlet>
    );
  }
}

export default withStyles(styles)(UsersTable);
