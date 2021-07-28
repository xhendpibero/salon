import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Avatar, Typography, Button, LinearProgress } from '@material-ui/core';

// Shared components
import { Portlet, PortletContent, PortletFooter } from 'components';

// Component styles
import styles from './styles';

class AccountProfile extends Component {
  render() {
    const { classes, className, ...rest } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet
        {...rest}
        className={rootClassName}
      >
        <PortletContent>
          <div className={classes.details}>
            <div className={classes.info}>
              <Typography variant="h2">Developer</Typography>
              <Typography variant="h6">Admin</Typography>
              <Typography
                className={classes.locationText}
                variant="body1"
              >
                Jl. Haji Ocen, Bekasi
              </Typography>
              <Typography
                className={classes.dateText}
                variant="body1"
              >
                089602582832
              </Typography>
            </div>
            <Avatar
              className={classes.avatar}
              src="/images/avatars/avatar_1.png"
            />
          </div>
        </PortletContent>
        <PortletFooter>
          <Button
            className={classes.uploadButton}
            color="primary"
            variant="text"
          >
            Unggah Foto
          </Button>
          <Button variant="text">Hapus Foto</Button>
        </PortletFooter>
      </Portlet>
    );
  }
}

AccountProfile.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AccountProfile);
