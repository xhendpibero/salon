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
import { Portlet, PortletContent } from 'components';

// Component styles
import styles from './styles';

class CustomersTable extends Component {
  state = {
    selectedCustomers: [],
    rowsPerPage: 10,
    page: 0
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
    const { classes, className, customers } = this.props;
    const { rowsPerPage, page } = this.state;

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet className={rootClassName}>
        <PortletContent noPadding>
          <PerfectScrollbar>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    ID
                  </TableCell>
                  <TableCell align="left">
                    Nama
                  </TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Nomor HP</TableCell>
                  <TableCell align="left">Tanggal Pendaftaran</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers
                  .map(user => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={user.customer_id}
                    >
                      <TableCell className={classes.tableCell}>
                        <div className={classes.tableCellInner}>
                          <Avatar
                            className={classes.avatar}
                            src={null}
                          >
                            {getInitials(user.fullname)}
                          </Avatar>
                          <Link to={"customers/s?id=" + user.customer_id}>
                            <Typography
                              className={classes.nameText}
                              variant="body1"
                            >
                              {user.customer_id}
                            </Typography>
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {user.fullname}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {user.email}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {user.phone_number}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {moment(user.created).format('DD/MM/YYYY')}
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

export default withStyles(styles)(CustomersTable);
