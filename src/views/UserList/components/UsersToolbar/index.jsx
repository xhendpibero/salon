import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// Externals
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// Material components
import { Button, IconButton } from '@material-ui/core';

// Material icons
import {
  ArrowDownward as ArrowDownwardIcon,
  ArrowUpward as ArrowUpwardIcon,
  Delete as DeleteIcon,
  VisibilityOff
} from '@material-ui/icons';

// Shared components
import { DisplayMode, SearchInput } from 'components';

// Component styles
import styles from './styles';

class UsersToolbar extends Component {
  state = {
    open: false,
    title: "",
    body: "",
    hide: true,
  };

  handleClose = () => {
    this.setState({ open: false, title: '', body: '' });
  };

  handleSubmit = () => {
    this.setState({ open: false, title: '', body: '' });
    if (this.state.hide) {
      this.props.hide()
    } else {
      this.props.delete()
    }
  };

  handleHideUsers = () => {
    this.setState({ open: true, title: "Ingin melakukan perubahan status?", body: "Pastikan telah melakukan pengecekan pada pegawai yang anda pilih", hide: true });
  }

  handleDeleteUsers = () => {
    this.setState({ open: true, title: "Ingin melakukan penghapusan?", body: "Pastikan telah melakukan pengecekan pada pegawai yang anda pilih", hide: false });
  }

  render() {
    const { classes, className, selectedUsers, history, onChange } = this.props;

    const { open, title, body } = this.state;

    const rootClassName = classNames(classes.root, className);

    return (
      <div className={rootClassName}>
        <div className={classes.row}>
          <SearchInput
            className={classes.searchInput}
            placeholder="Cari pegawai"
            onChange={onChange}
          />
          <span className={classes.spacer} />
          <>
            <IconButton
              className={classes.hideButton}
              style={!selectedUsers.length > 0 ? ({ color: "#eee" }) : null}
              onClick={selectedUsers.length > 0 ? this.handleHideUsers : null}
            >
              <VisibilityOff />
            </IconButton>

            <IconButton
              className={classes.deleteButton}
              style={!selectedUsers.length > 0 ? ({ color: "#eee" }) : null}
              onClick={selectedUsers.length > 0 ? this.handleDeleteUsers : null}
            >
              <DeleteIcon />
            </IconButton>
          </>
          {/* )} */}
          <Button
            color="primary"
            size="small"
            variant="outlined"
            onClick={() => history.push({ pathname: '/users/employee' })}
          >
            Tambah
          </Button>

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
            <Button onClick={this.handleSubmit} color="primary" autoFocus>
              Setuju
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default compose(
  withRouter,
  withStyles(styles)
)(UsersToolbar);
