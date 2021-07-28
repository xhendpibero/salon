import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// Externals
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Button, IconButton } from '@material-ui/core';

// Shared components
import { DisplayMode, SearchInput } from 'components';

// Component styles
import {
  Delete as DeleteIcon,
  VisibilityOff
} from '@material-ui/icons';

import styles from './styles';

class ProductsToolbar extends Component {
  render() {
    const { classes, className, selected, history } = this.props;
    const role = localStorage.getItem("role") === "admin";

    const rootClassName = classNames(classes.root, className);

    return (
      <div className={rootClassName}>
        {/* <div className={classes.row}>
          <span className={classes.spacer} />
          <Button
            color="primary"
            size="small"
            variant="outlined"
          >
            Add
          </Button>
        </div> */}
        <div className={classes.row}>
          <SearchInput
            className={classes.searchInput}
            placeholder="Cari layanan"
          />
          <span className={classes.spacer} />
          {selected && selected.length > 0 && (
            <>
              <IconButton
                className={classes.hideButton}
                onClick={this.handleDeleteUsers}
              >
                <VisibilityOff />
              </IconButton>

              <IconButton
                className={classes.deleteButton}
                onClick={this.handleDeleteUsers}
              >
                <DeleteIcon />
              </IconButton>
            </>
          )}

          {role && (
            <Button
              color="primary"
              size="small"
              variant="outlined"
              onClick={() => history.push({ pathname: '/products/service', state: { detail: 'Buat' } })}
            >
              Tambah
            </Button>
          )}
          {/* <span className={classes.spacer} /> */}
          {/* <DisplayMode mode="grid" /> */}
        </div>
      </div>
    );
  }
}

ProductsToolbar.propTypes = {
  className: PropTypes.string,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  withStyles(styles)
)(ProductsToolbar);
