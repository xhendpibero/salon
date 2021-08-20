import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';

// Externals
import classNames from 'classnames';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography
} from '@material-ui/core';

// Material icons
import {
  DashboardOutlined as DashboardIcon,
  PeopleOutlined as PeopleIcon,
  People as People2Icon,
  Shop as ShopIcon,
  ShoppingBasketOutlined as ShoppingBasketIcon,
  Info as InfoIcon,
  Description as DescriptionIcon,
  AccountBoxOutlined as AccountBoxIcon,
  SettingsOutlined as SettingsIcon
} from '@material-ui/icons';

// Component styles
import styles from './styles';

class Sidebar extends Component {

  handleSignOut = () => {
    const { history } = this.props;
    localStorage.setItem('isAuthenticated', false);
    localStorage.setItem('role', null);
    history.push('/sign-in');
  };

  render() {
    const { classes, className } = this.props;
    const role = localStorage.getItem("role") === "admin";

    const rootClassName = classNames(classes.root, className);

    return (
      <nav className={rootClassName}>
        <div className={classes.logoWrapper}>
          <Link
            className={classes.logoLink}
            to="/"
          >
            <img
              alt="Celine Salon logo"
              className={classes.logoImage}
              src="/images/logos/logo.png"
            />
          </Link>
        </div>
        <Divider className={classes.logoDivider} />
        <div className={classes.profile}>
          <Link to="/account">
            <Avatar
              alt="Admin"
              className={classes.avatar}
              src="/images/avatars/avatar_1.png"
            />
          </Link>
          <Typography
            className={classes.nameText}
            variant="h6"
          >
            {localStorage.getItem("email")}
          </Typography>
          <Typography
            className={classes.bioText}
            variant="caption"
          >
            {localStorage.getItem("role")}
          </Typography>
          <Link
            style={{ marginTop: 5 }}
            to="/"
          >
            <Typography
              className={classes.bioText}
              variant="h6"
              style={{ color: "#ED4740" }}
              onClick={this.handleSignOut}
            >
              Keluar
            </Typography>
          </Link>
        </div>
        <Divider className={classes.profileDivider} />
        <List
          component="div"
          disablePadding
        >

          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/dashboard"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Beranda"
            />
          </ListItem>

          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/orders"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <ShoppingBasketIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Pemesanan"
            />
          </ListItem>

          {!role && (
            <ListItem
              activeClassName={classes.activeListItem}
              className={classes.listItem}
              component={NavLink}
              to="/about"
            >
              <ListItemIcon className={classes.listItemIcon}>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary="Tentang Kami"
              />
            </ListItem>
          )}
          {role && (
            <>
              <ListItem
                activeClassName={classes.activeListItem}
                className={classes.listItem}
                component={NavLink}
                to="/customers"
              >
                <ListItemIcon className={classes.listItemIcon}>
                  <People2Icon />
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: classes.listItemText }}
                  primary="Pelanggan"
                />
              </ListItem>

              <ListItem
                activeClassName={classes.activeListItem}
                className={classes.listItem}
                component={NavLink}
                to="/users"
              >
                <ListItemIcon className={classes.listItemIcon}>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: classes.listItemText }}
                  primary="Pegawai"
                />
              </ListItem>
              <ListItem
                activeClassName={classes.activeListItem}
                className={classes.listItem}
                component={NavLink}
                to="/products"
              >
                <ListItemIcon className={classes.listItemIcon}>
                  <ShopIcon />
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: classes.listItemText }}
                  primary="Jenis Layanan"
                />
              </ListItem>
              <ListItem
                activeClassName={classes.activeListItem}
                className={classes.listItem}
                component={NavLink}
                to="/report/orders"
              >
                <ListItemIcon className={classes.listItemIcon}>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: classes.listItemText }}
                  primary="Laporan"
                />
              </ListItem>
            </>
          )}

        </List>
        <Divider className={classes.listDivider} />
        <List
          component="div"
          disablePadding
          subheader={
            <ListSubheader className={classes.listSubheader}>
              Profil
            </ListSubheader>
          }
        >
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/account"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Akun"
            />
          </ListItem>
          {/* <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/settings"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Pengaturan"
            />
          </ListItem> */}
          {/* <ListItem
            className={classes.listItem}
            component="a"
            href="https://devias.io/contact-us"
            target="_blank"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Customer support"
            />
          </ListItem> */}
        </List>
      </nav>
    );
  }
}

Sidebar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  withStyles(styles)
)(Sidebar);
