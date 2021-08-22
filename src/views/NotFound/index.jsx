import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Grid, Typography } from '@material-ui/core';

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4
  },
  content: {
    marginTop: '150px',
    textAlign: 'center'
  },
  image: {
    display: 'inline-block',
    marginTop: '50px',
    maxWidth: '100%',
    width: '554px'
  }
});

class NotFound extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid
          container
          justify="center"
          spacing={4}
        >
          <Grid
            item
            lg={6}
            xs={12}
          >
            <div className={classes.content} style={{ marginTop: -20 }}>
              <Typography variant="h1">
                404: Halaman yang Anda cari tidak ada di sini
              </Typography>
              <Typography variant="subtitle2">
                Anda mencoba beberapa rute yang teduh atau Anda datang ke sini karena kesalahan.
                Apapun itu, coba gunakan navigasi
              </Typography>
              <img
                alt="Under development"
                className={classes.image}
                src="/images/not_found.png"
              />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

NotFound.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NotFound);
