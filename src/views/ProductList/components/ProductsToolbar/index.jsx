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

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// Component styles
import {
  Delete as DeleteIcon,
  VisibilityOff
} from '@material-ui/icons';

import styles from './styles';

class ProductsToolbar extends Component {
  state = {
    open: false,
    title: "",
    body: "",
  };

  handleClose = () => {
    this.setState({ open: false, title: '', body: '' });
  };

  handleHideUsers = () => {
    this.setState({ open: true, title: "Ingin melakukan perubahan status?", body: "Pastikan telah melakukan pengecekan pada pegawai yang anda pilih" });
  }

  handleDeleteUsers = () => {
    this.setState({ open: true, title: "Ingin melakukan penghapusan?", body: "Pastikan telah melakukan pengecekan pada pegawai yang anda pilih" });
  }

  render() {
    const { classes, className, selected, history } = this.props;
    const { open, title, body } = this.state;
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
            placeholder="Cari Jenis layanan"
          />
          <span className={classes.spacer} />
          <IconButton
            className={classes.hideButton}
            style={!selected.length > 0 ? ({ color: "#eee" }) : null}
            onClick={selected.length > 0 ? this.handleHideUsers : null}
          >
            <VisibilityOff />
          </IconButton>

          <IconButton
            className={classes.deleteButton}
            style={!selected.length > 0 ? ({ color: "#eee" }) : null}
            onClick={selected.length > 0 ? this.handleDeleteUsers : null}
          >
            <DeleteIcon />
          </IconButton>

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
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {body}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Kembali
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Setuju
            </Button>
          </DialogActions>
        </Dialog>
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
