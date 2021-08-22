import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps"

// Material components
import { Button, TextField, Typography } from '@material-ui/core';

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter,
  ProductCard,
  Map,
} from 'components';

// Component styles
import styles from './styles';

class Password extends Component {
  state = {
    values: {
      password: '',
      confirm: ''
    }
  };

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };

    newState.values[field] = value;

    this.setState(newState, this.validateForm);
  };

  render() {
    const { classes, className, ...rest } = this.props;
    const { values } = this.state;

    const rootClassName = classNames(classes.root, className);

    const geoUrl =
      "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"

    return (
      <Portlet
        {...rest}
        className={rootClassName}
      >
        <PortletHeader>
          <PortletLabel
            title="Tentang Kami"
          />
        </PortletHeader>
        <PortletContent>


          <div style={{
            height: "15rem",
            width: "100%",
          }}>
            <Map center={{
              lat: 3.5148483,
              lng: 98.6122879,
            }} zoom={16} />
          </div>

          {/* <ProductCard
            image={"images/maps.png"}
            title={""}
            description={""}
            secondary={""}
          /> */}

        </PortletContent>
        <PortletFooter className={classes.portletFooter}>
          <div className={classes.field}>
            <Typography variant="h6" className={classes.title}>
              Alamat
            </Typography>
            <Typography variant="body1">Jl. Bunga Lau, Kemenangan Tani, Kec. Medan Tuntungan, Kota Medan, Sumatera Utara 20136</Typography>
          </div>
          <div className={classes.field}>
            <Typography variant="h6" className={classes.title}>
              Kontak Kami
            </Typography>
            <Typography variant="body1"> 0853-6226-9669</Typography>
          </div>
        </PortletFooter>
      </Portlet>
    );
  }
}

export default withStyles(styles)(Password);
