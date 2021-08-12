import React, { Component } from 'react';

// Externals
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Avatar, Typography, Button } from '@material-ui/core';

// Shared components
import { Portlet, PortletContent, PortletFooter } from 'components';

// Component styles
import styles from './styles';

class ProductPicture extends Component {
    render() {
        const { classes, className, title, src, onClick, ...rest } = this.props;

        const rootClassName = classNames(classes.root, className);

        return (
            <Portlet
                {...rest}
                className={rootClassName}
            >
                <PortletContent>
                    <div className={classes.details}>
                        <div className={classes.info}>
                            <Typography variant="h4">Gambar Jenis Layanan</Typography>
                        </div>
                    </div>
                    <Avatar
                        variant="square"
                        className={classes.avatar}
                        src="/images/products/product_1.png"
                    />
                </PortletContent>
                <PortletFooter>
                    <Button
                        className={classes.uploadButton}
                        color="primary"
                        variant="text"
                    >
                        Upload picture
                    </Button>
                    <Button variant="text">Remove picture</Button>
                </PortletFooter>
            </Portlet>
        );
    }
}

export default withStyles(styles)(ProductPicture);
