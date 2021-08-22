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
  Tooltip,
  TableSortLabel,
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
    page: 0,
    listCell: [
      {
        id: "customer_id",
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
        id: "email",
        name: "Email",
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
        name: "Tanggal Pendaftaran",
        active: true,
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
    const { rowsPerPage, page, listCell } = this.state;

    const sortData = listCell.find(order => order.active)
    const { id, direction } = sortData;

    let customers = [];
    if (id === "created") {
      customers = this.props.customers.sort((a, b) => (new Date(a[id]).getTime() > new Date(b[id]).getTime()) ? direction === "asc" ? 1 : -1 : ((new Date(b[id]).getTime() > new Date(a[id]).getTime()) ? direction === "asc" ? -1 : 1 : 0))
    } else {
      customers = this.props.customers.sort((a, b) => (a[id] > b[id]) ? direction === "asc" ? 1 : -1 : ((b[id] > a[id]) ? direction === "asc" ? -1 : 1 : 0))
    }

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet className={rootClassName}>
        <PortletContent noPadding>
          <PerfectScrollbar>
            <Table>
              <TableHead>
                <TableRow>
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
