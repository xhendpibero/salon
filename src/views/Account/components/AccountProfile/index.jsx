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
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  pickedHandler(event, changeImage) {
    let pickedFile;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = () => {
        console.log({ dileee: fileReader.result })
        changeImage(fileReader.result);
      };
      fileReader.readAsDataURL(pickedFile);
    }
  };

  render() {
    const { classes, className, profile_image, changeImage, ...rest } = this.props;
    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet
        {...rest}
        className={rootClassName}
      >
        <PortletContent>
          <div className={classes.details}>
            <Avatar
              variant="square"
              className={classes.avatar}
              src={profile_image}
            />
            <div className={classes.info}>
              <Typography variant="h5">{localStorage.getItem("email")}</Typography>
              <Typography variant="h6">{localStorage.getItem("role")}</Typography>
            </div>
          </div>
        </PortletContent>
        <PortletFooter>
          <input
            ref={this.myRef}
            style={{ display: 'none' }}
            type="file"
            accept=".jpg,.png,.jpeg"
            onChange={e => this.pickedHandler(e, changeImage)}
          />
          <Button
            className={classes.uploadButton}
            color="primary"
            variant="text"
            onClick={() => {
              this.myRef.current.click();
            }}
          >
            Unggah Foto
          </Button>
          <Button variant="text"
            onClick={() => {
              changeImage(null);
            }}
          >
            Hapus Foto
          </Button>
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
