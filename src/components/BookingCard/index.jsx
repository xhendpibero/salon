import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';
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
    const { classes, className, checked, title, status } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <Paper className={rootClassName}>

        <div className={classes.details}>
          <Typography
            className={classes.title}
            variant="h4"
          >
            Jam {title}
          </Typography>
          <Typography
            className={classes.description}
            variant="body1"
          >
            {
              checked ? (
                <Checkbox
                  checked={checked}
                  color="primary"
                  value="true"
                />
              ) : status
            }
          </Typography>
        </div>
      </Paper>
    );
  }
}

ProductCard.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductCard);
