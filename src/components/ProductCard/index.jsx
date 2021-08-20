import React, { Component } from 'react';

// Externals
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Typography, Checkbox } from '@material-ui/core';

// Shared components
import { Paper } from 'components';

// Component styles
import styles from './styles';

class ProductCard extends Component {
  render() {
    const { classes, className, description, image, title, secondary, checked } = this.props;
    console.log({ image })
    const rootClassName = classNames(classes.root, className);

    return (
      <Paper className={rootClassName}>

        <div className={classes.imageWrapper}>
          {
            checked ? (
              <Checkbox
                checked={checked}
                color="primary"
                value="true"
              />
            ) : (
              <img
                alt="Services"
                className={classes.image}
                src={image || "/images/products/noimage.png"}
              />
            )
          }
        </div>
        {title && (
          <div className={classes.details}>
            <Typography
              className={classes.title}
              variant="h4"
            >
              {title}
            </Typography>
            {
              secondary && (
                <Typography
                  className={classes.description}
                  variant="body1"
                >
                  {secondary}
                </Typography>
              )
            }
            {
              description && (
                <Typography
                  className={classes.description2}
                  variant="body2"
                >
                  {description}
                </Typography>
              )
            }
          </div>
        )}
      </Paper>
    );
  }
}

export default withStyles(styles)(ProductCard);
