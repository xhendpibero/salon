import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// Externals
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Button } from '@material-ui/core';

// Shared components
import { DisplayMode, SearchInput } from 'components';

// Component styles
import styles from './styles';

class ProductsToolbar extends Component {
  render() {
    const { classes, className, history } = this.props;

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
            placeholder="Cari Pelanggan"
          />
          <span className={classes.spacer} />
          <Button
            color="primary"
            size="small"
            variant="outlined"
            onClick={() => history.push({ pathname: '/products/service', state: { detail: 'Buat' } })}
          >
            Tambah
          </Button>
          <span className={classes.spacer} />
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
