import React from 'react';

// Externals
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
import { Input } from '@material-ui/core';

// Material icons
import { Search as SearchIcon } from '@material-ui/icons';

// Component styles
import styles from './styles';

const Popup = props => {
  const { classes, className, style, open, body, title, handleClose, handleSubmit, ...rest } = props;

  const rootClassName = classNames(classes.root, className);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
        <Button onClick={handleClose} color="primary">
          Kembali
        </Button>
        <Button onClick={handleSubmit} color="primary" autoFocus>
          Setuju
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles)(Popup);
