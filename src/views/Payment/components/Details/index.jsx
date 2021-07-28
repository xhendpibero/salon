import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// Externals
import compose from 'recompose/compose';
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';


import DayPickerInput from 'react-day-picker/DayPickerInput';

import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

// import DateFnsUtils from '@date-io/date-fns';
// import ruLocale from "date-fns/locale/ru";

import {
  Folder as FolderIcon,
  Delete as DeleteIcon
} from '@material-ui/icons';

// Material components
import {
  Button,
  TextField,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  NativeSelect,
  MenuItem,
} from '@material-ui/core';

import { getProducts } from 'services/product';
import { getUsers } from 'services/user';

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter,
  ProductCard,
  BookingCard,
} from 'components';

// Component styles
import styles from './styles';

const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  }
];

class Account extends Component {
  signal = true;

  state = {
    service: '',
    price: '',
    isLoading: false,
    limit: 100,
    products: [],
    productsTotal: 0,
    users: [],
    usersTotal: 0,
    selectedProducts: ["DEV795381", "DEV774585"],
    selectedUsers: "DEV702967",
    selectedTimes: 13,
    error: null,
    date: new Date("Fri Jul 16 2021"),
    password: "",
    name: "",
    address: "",
    email: "",
    checkedB: false,
    tab: 0,
    bank: 0,
    bankList: [
      {
        name: "BCA",
        value: 0,
        rek: "0913 2012 001"
      },
      {
        name: "BRI",
        value: 1,
        rek: "0913 2012 002"
      },
      {
        name: "BTPN",
        value: 2,
        rek: "0913 2012 003"
      },
    ]
  };

  async getUsers() {
    try {
      this.setState({ isLoading: true });

      const { limit } = this.state;

      const { users } = await getUsers(limit);

      if (this.signal) {
        this.setState({
          isLoading: false,
          users
        });
      }
    } catch (error) {
      if (this.signal) {
        this.setState({
          isLoading: false,
          error
        });
      }
    }
  }

  async getProducts(limit) {
    try {
      this.setState({ isLoading: true });

      const { products, productsTotal } = await getProducts(limit);

      if (this.signal) {
        this.setState({
          isLoading: false,
          products,
          productsTotal,
          limit
        });
      }
    } catch (error) {
      if (this.signal) {
        this.setState({
          isLoading: false,
          error
        });
      }
    }
  }

  componentWillMount() {
    this.signal = true;

    const { limit } = this.state;

    this.getUsers(limit);
    this.getProducts(limit);
  }

  handleSelectOne = (id, name) => {
    const { selectedProducts } = this.state;

    const selectedIndex = selectedProducts.indexOf(id);
    let newSelectedProducts = [];

    if (selectedIndex === -1) {
      newSelectedProducts = newSelectedProducts.concat(selectedProducts, id);
    } else if (selectedIndex === 0) {
      newSelectedProducts = newSelectedProducts.concat(selectedProducts.slice(1));
    } else if (selectedIndex === selectedProducts.length - 1) {
      newSelectedProducts = newSelectedProducts.concat(selectedProducts.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedProducts = newSelectedProducts.concat(
        selectedProducts.slice(0, selectedIndex),
        selectedProducts.slice(selectedIndex + 1)
      );
    }
    this.setState({ [name]: newSelectedProducts });
  };

  componentWillUnmount() {
    this.signal = false;
  }

  handleChange = (e, name) => {
    this.setState({
      [name]: e && e.target && e.target.value ? e.target.value : e
    });
  };

  handleDayClick = (day, { selected }) => {
    this.setState({
      date: selected ? undefined : day,
    });
  }

  handleTab = (tabInit, go) => {
    const tab = go ? tabInit + 1 : tabInit - 1
    this.setState({ tab });
  }

  handleSubmit = () => {
    const { history } = this.props;
    history.push({ pathname: '/orders/payment/proof' });
  }

  render() {
    const { classes, className, history, ...rest } = this.props;
    const {
      date,
      users,
      selectedUsers,
      products,
      selectedProducts,
      selectedTimes,
      password,
      passwordConfirm,
      name,
      email,
      checkedB,
      tab,
      bank,
      bankList,
      address,
    } = this.state;
    var today = new Date(date);
    var dd = today.getDate();

    const isNextTab = tab < 4
    const isBackTab = tab > 1
    const isSubmitTab = tab === 4

    console.log(
      {
        date,
        users,
        selectedUsers,
        products,
        selectedProducts,
        selectedTimes,
        password,
        passwordConfirm,
        name,
        email,
        checkedB,
        tab,
        bank,
        bankList,
      }
    )

    var mm = today.getMonth() + 1;
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ]
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }
    console.log(selectedTimes, selectedUsers)

    const dataDate = dd + " " + monthNames[today.getMonth()] + " " + yyyy;
    let dataTime = selectedTimes;
    if (selectedTimes - 0 < 10) {
      dataTime = '0' + selectedTimes;
    }

    const rootClassName = classNames(classes.root, className);

    const mainTab = [
      (<>
        <div className={classes.field}>
          <Typography
            className={classes.title}
            variant="h4"
          >
            Bank Tujuan
          </Typography>
        </div>

        <div className={classes.field}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">Bank</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              value={bank}
              onChange={e => this.handleChange(e, "bank")}
              inputProps={{
                name: 'bank',
                id: 'bank-simple',
              }}
              native
            >
              <option aria-label="None" value="" />
              <option value={0}>BCA</option>
              <option value={1}>BRI</option>
              <option value={2}>BTPN</option>
            </Select>
          </FormControl>
        </div>
        <div className={classes.field}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={12}
            >
              <BookingCard noWrap={true} title={bankList[bank ? bank : 0].name} status={"Kirim jumlah uang ke nomor Rek " + bankList[bank ? bank : 0].rek} />
            </Grid>
          </Grid>
        </div>

        <div className={classes.field}>
          <Typography
            className={classes.title}
            variant="h4"
          >
            Informasi Rekening Pengirim
          </Typography>
        </div>


        <div className={classes.field}>
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              md={4}
              xs={12}
            >
              <TextField
                className={classes.textField}
                onChange={e => this.handleChange(e, "name")}
                label="Nama"
                margin="dense"
                required
                value={name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={8}
              xs={12}
            >
              <TextField
                className={classes.textField}
                onChange={e => this.handleChange(e, "email")}
                label="Nomor Rek"
                margin="dense"
                required
                value={email}
                variant="outlined"
                type="text"
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                className={classes.textField}
                label="Nominal"
                name="address"
                helperText="DP 10% dari total harga"
                margin="dense"
                required
                onChange={event =>
                  this.handleChange(event.target.value, 'address')
                }
                type="text"
                value={address}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </div>

      </>),
    ];


    return (
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={8}
          md={8}
          xs={12}
        >
          <Portlet
            {...rest}
            className={rootClassName}
          >
            <PortletHeader>
              <PortletLabel
                subtitle="Silahkan isi informasi dibawah ini"
                title="Metode Pembayaran"
              />
            </PortletHeader>
            <PortletContent noPadding>
              <form
                autoComplete="off"
                noValidate
              >
                {mainTab[tab]}
              </form>
            </PortletContent>
            <PortletFooter className={classes.portletFooter}>
              <Button
                color="primary"
                variant="contained"
                disabled={(!selectedTimes || !selectedUsers || !selectedProducts.length)}
                onClick={() => this.handleSubmit()}
              >
                Bayar
              </Button>
            </PortletFooter>
          </Portlet>

        </Grid>
        <Grid
          item
          lg={4}
          md={4}
          xs={12}
        >
          <Portlet
            {...rest}
            className={rootClassName}
          >
            <PortletHeader>
              <PortletLabel
                title="Ringkasan"
              />
            </PortletHeader>
            <PortletContent noPadding>
              <div className={classes.field}>
                <Typography variant="h6" className={classes.title}>
                  Layanan
                </Typography>
                {!selectedProducts.length ? (
                  <Typography variant="body1">Tidak ada layanan yang dipilih</Typography>
                ) : (
                  <div className={classes.demo}>
                    <List dense={true}>
                      {products.map((product) => selectedProducts.indexOf(product.id) !== -1 && (
                        <ListItem key={product.id}>
                          <ListItemAvatar>
                            <Avatar
                              className={classes.avatar}
                              src={product.imageUrl}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={product.title}
                            secondary={"Rp. " + product.price}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </div>
                )}
              </div>
              <div className={classes.field}>
                <Typography variant="h6" className={classes.title}>
                  Pegawai
                </Typography>
                {selectedUsers ? (
                  <Typography variant="body1" className={classes.title}>
                    Ava Gregoraci
                  </Typography>
                ) : (
                  <Typography variant="body1">Tidak ada pegawai yang dipilih</Typography>
                )}

              </div>
              <div className={classes.field}>
                <Typography variant="h6" className={classes.title}>
                  Tanggal booking
                </Typography>
                <DayPicker
                  selectedDays={[
                    dataDate ? new Date(dataDate) : null,
                  ]}
                />
              </div>
              <div className={classes.field}>
                <Typography variant="h6" className={classes.title}>
                  Jam booking
                </Typography>
                {selectedTimes ? (
                  <>
                    <Typography variant="body1" className={classes.title}>
                      {dataDate}, jam {dataTime}:00
                    </Typography>
                  </>
                ) : (
                  <Typography variant="body1">Tidak ada jam yang dipilih</Typography>
                )}
              </div>
              <div className={classes.field}>
                <Typography variant="h6" className={classes.title}>
                  Total
                </Typography>

                <Typography variant="body1">{products.filter((product) =>
                  selectedProducts
                    .indexOf(product.id) !== -1)
                  .map(e => e.price.replace(".", "") - 0)
                  .reduce((a, b) => a + b, 0)
                  .toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Typography>
              </div>

            </PortletContent>
          </Portlet>
        </Grid>
      </Grid >
    );
  }
}

Account.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default compose(
  withRouter, withStyles(styles))(Account);