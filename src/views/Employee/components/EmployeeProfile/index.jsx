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

class EmployeePicture extends Component {

  state = {
    selectedFile: '',
  }

  handleUploadClick = event => {
    console.log();
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      this.setState({
        selectedFile: [reader.result]
      });
    }.bind(this);
    console.log(url); // Would see a path?

    this.setState({
      selectedFile: event.target.files[0],
    });
  };


  render() {
    const { classes, className, ...rest } = this.props;
    const { selectedFile } = this.state;
    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet
        {...rest}
        className={rootClassName}
      >
        <PortletContent>
          <div className={classes.details}>
            <div className={classes.info}>
              <Typography variant="h4">Foto Karyawan</Typography>
            </div>
          </div>
          <Avatar
            variant="square"
            className={classes.avatar}
            src={selectedFile ? selectedFile : "/images/avatars/avatar_1.png"}
          />
        </PortletContent>
        <PortletFooter>
          <Button
            className={classes.uploadButton}
            color="primary"
            variant="text"
          >
            Unggah Foto
          </Button>
          <Button variant="text">Hapus foto</Button>
        </PortletFooter>
      </Portlet>
    );
  }
}

EmployeePicture.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EmployeePicture);
