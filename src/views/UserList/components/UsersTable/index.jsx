import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';
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
    page: 0
  };

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

    onSelect(newSelectedUsers);
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
    const { classes, className, users } = this.props;
    const { activeTab, selectedUsers, rowsPerPage, page } = this.state;

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
                    ID
                  </TableCell>
                  <TableCell align="left">Nama</TableCell>
                  <TableCell align="left">Alamat</TableCell>
                  <TableCell align="left">No HP</TableCell>
                  <TableCell align="left">Tanggal Daftar</TableCell>
                  <TableCell align="left">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users
                  .filter(user => {
                    if (activeTab === 1) {
                      return !user.returning;
                    }

                    if (activeTab === 2) {
                      return user.returning;
                    }

                    return user;
                  })
                  .slice(0, rowsPerPage)
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
                          <Link to={"users/employee?id=" + user.employee_id}>
                            <Typography
                              className={classes.nameText}
                              variant="body1"
                            >
                              {user.employee_id}
                            </Typography>
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {user.fullname}
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

UsersTable.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
  users: PropTypes.array.isRequired
};

UsersTable.defaultProps = {
  users: [],
  onSelect: () => { },
};

export default withStyles(styles)(UsersTable);
