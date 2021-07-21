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

// Material icons
import {
  ArrowDownward as ArrowDownwardIcon,
  ArrowUpward as ArrowUpwardIcon,
  Delete as DeleteIcon
} from '@material-ui/icons';

// Shared components
import { DisplayMode, SearchInput } from 'components';

// Component styles
import styles from './styles';

class UsersToolbar extends Component {
  render() {
    const { classes, className, selectedUsers, history } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <div className={rootClassName}>
        {/* <div className={classes.row}>
          <span className={classes.spacer} />
          <Button
            className={classes.importButton}
            size="small"
            variant="outlined"
          >
            <ArrowDownwardIcon className={classes.importIcon} /> Import
          </Button>
          <Button
            className={classes.exportButton}
            size="small"
            variant="outlined"
          >
            <ArrowUpwardIcon className={classes.exportIcon} />
            Export
          </Button>
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
            placeholder="Search employee"
          />
          <span className={classes.spacer} />
          {/* <DisplayMode mode="list" /> */}
          {selectedUsers.length > 0 && (
            <IconButton
              className={classes.deleteButton}
              onClick={this.handleDeleteUsers}
            >
              <DeleteIcon />
            </IconButton>
          )}
          <Button
            color="primary"
            size="small"
            variant="outlined"
            onClick={() => history.push({ pathname: '/users/employee' })}
          >
            Add
          </Button>

        </div>
      </div>
    );
  }
}

UsersToolbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  selectedUsers: PropTypes.array
};

UsersToolbar.defaultProps = {
  selectedUsers: []
};

export default compose(
  withRouter,
  withStyles(styles)
)(UsersToolbar);
