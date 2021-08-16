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
import { Portlet, PortletContent } from 'components';

// Component styles
import styles from './styles';

class ProductsTable extends Component {
  state = {
    selectedProducts: [],
    rowsPerPage: 10,
    page: 0
  };

  handleSelectAll = event => {
    const { products, onSelect } = this.props;

    let selectedProducts;

    if (event.target.checked) {
      selectedProducts = products.map(product => product?.service_id);
    } else {
      selectedProducts = [];
    }

    this.setState({ selectedProducts });

    onSelect(selectedProducts);
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

    onSelect(newSelectedProducts);
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes, className, products } = this.props;
    const { activeTab, selectedProducts, rowsPerPage, page } = this.state;
    const role = localStorage.getItem("role") === "admin";

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
                    Nama Jenis Layanan
                  </TableCell>
                  <TableCell align="left">Deskripsi</TableCell>
                  <TableCell align="left">Harga</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products
                  .filter(product => {
                    return product;
                  })
                  .slice(0, rowsPerPage)
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
                          <Link to={"products/service?id=" + product?.service_id}>
                            <Typography
                              className={classes.nameText}
                              variant="body1"
                            >
                              {product.service_name}
                            </Typography>
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {product.description.slice(0, 20)}...
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {product.price}
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
            count={products.length}
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

ProductsTable.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
  products: PropTypes.array.isRequired
};

ProductsTable.defaultProps = {
  products: [],
  onSelect: () => { },
};

export default withStyles(styles)(ProductsTable);
