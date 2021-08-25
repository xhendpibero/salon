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

class ProductsTable extends Component {
  state = {
    selectedProducts: [],
    rowsPerPage: 10,
    page: 0,
    listCell: [
      {
        id: "service_name",
        name: " Nama Jenis Layanan",
        active: true,
        direction: "desc",
      },
      {
        id: "description",
        name: "Deskripsi",
        active: false,
        direction: "desc",
      },
      {
        id: "price",
        name: "Harga",
        active: false,
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
    const { products, onSelect } = this.props;

    let selectedProducts;

    if (event.target.checked) {
      selectedProducts = products.map(product => product?.service_id);
    } else {
      selectedProducts = [];
    }

    this.setState({ selectedProducts });

    onSelect(selectedProducts, "selectedProducts");
  };

  handleSelectOne = (event, id) => {
    const { onSelect } = this.props;
    const { selectedProducts } = this.state;

    const selectedIndex = selectedProducts.indexOf(id);
    let newSelectedProducts = [];

    if (selectedIndex === -1) {
      newSelectedProducts = newSelectedProducts.concat(selectedProducts, id);
    } else if (selectedIndex === 0) {
      newSelectedProducts = newSelectedProducts.concat(selectedProducts.slice(1));
    } else if (selectedIndex === selectedProducts.length - 1) {
      newSelectedProducts = newSelectedProducts.concat(selectedProducts.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedProducts = newSelectedProducts.concat(
        selectedProducts.slice(0, selectedIndex),
        selectedProducts.slice(selectedIndex + 1)
      );
    }

    this.setState({ selectedProducts: newSelectedProducts });

    onSelect(newSelectedProducts, "selectedProducts");
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
    const { selectedProducts, rowsPerPage, page, listCell } = this.state;
    const role = localStorage.getItem("role") === "admin";

    const sortData = listCell.find(order => order.active)
    const { id, direction } = sortData;

    let products = [];
    if (id === "created") {
      products = this.props.products.sort((a, b) => (new Date(a[id]).getTime() > new Date(b[id]).getTime()) ? direction === "asc" ? 1 : -1 : ((new Date(b[id]).getTime() > new Date(a[id]).getTime()) ? direction === "asc" ? -1 : 1 : 0))
    } else {
      products = this.props.products.sort((a, b) => (a[id] > b[id]) ? direction === "asc" ? 1 : -1 : ((b[id] > a[id]) ? direction === "asc" ? -1 : 1 : 0))
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
                    {role && (
                      <Checkbox
                        checked={selectedProducts.length === products.length}
                        color="primary"
                        indeterminate={
                          selectedProducts.length > 0 &&
                          selectedProducts.length < products.length
                        }
                        onChange={this.handleSelectAll}
                      />
                    )}
                    Foto
                  </TableCell>
                  {listCell.map((e) =>
                    <TableCell
                      align="left"
                      sortDirection={e.direction}
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
                {products
                  .map(product => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={product?.service_id}
                      selected={selectedProducts.indexOf(product?.service_id) !== -1}
                    >
                      <TableCell className={classes.tableCell}>
                        <div className={classes.tableCellInner}>
                          {role && (
                            <Checkbox
                              checked={selectedProducts.indexOf(product?.service_id) !== -1}
                              color="primary"
                              onChange={event =>
                                this.handleSelectOne(event, product?.service_id)
                              }
                              value="true"
                            />
                          )}
                          <Avatar
                            className={classes.avatar}
                            src={product.thumbnail}
                          >
                            {getInitials(product.service_name)}
                          </Avatar>
                        </div>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        <Link to={"products/service?id=" + product?.service_id}>
                          <Typography
                            className={classes.nameText}
                            variant="body1"
                          >
                            {product.service_name}
                          </Typography>
                        </Link>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {product.description.slice(0, 20)}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {new Number(product.price).toLocaleString('id', { style: 'currency', currency: 'IDR' }).split(",")[0]}
                      </TableCell>
                      <TableCell>
                        <div className={classes.statusWrapper}>
                          <Status
                            className={classes.status}
                            color={product.is_show ? 'success' : 'danger'}
                            size="sm"
                          />
                          {product.is_show ? "Tersedia" : "Tidak Tersedia"}
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

export default withStyles(styles)(ProductsTable);
