import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withSnackbar } from 'notistack';

// Externals
import compose from 'recompose/compose';
import { useHttpClient } from '../../../../services/hooks/http-hook';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

// import DateFnsUtils from '@date-io/date-fns';
// import ruLocale from "date-fns/locale/ru";

import {
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
  CircularProgress,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
} from '@material-ui/core';

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

class Account extends Component {
  state = {
    //list
    products: [],
    customers: [],
    employees: [],
    selectedProducts: [],
    selectedEmployee: "",
    selectedTimes: 0,
    isLoading: false,

    customer_id: "",
    employee_id: "",
    booking_date: "",
    booking_time: "",
    is_down_payment: true,

    //customers
    username: '',
    fullname: '',
    phone_number: '',
    email: '',
    address: '',
    gender: '',

    service: '',
    price: '',

    date: "",
    name: "",
    checkedB: false,
    tab: 1,
    bank: 0,

    celine_bank_name: "",
    celine_account_name: "",
    celine_account_number: "",
    customer_account_name: "",
    customer_account_number: "",
    customer_payment_nominal: "",
    total_payment: 0,
    transfer_evidence: "",
    detail_order: [{
      service_id: "",
      service_name: "",
      price: ""
    }],
    isLoadingProduct: true,
    bankList: [
      {
        name: "BCA",
        value: "BCA",
        rek: "0913 2012 001"
      },
      {
        name: "BRI",
        value: "BRI",
        rek: "0913 2012 002"
      },
      {
        name: "BTPN",
        value: "BTPN",
        rek: "0913 2012 003"
      },
    ],
    is_down_payment: false,
    is_down_paymentList: [
      {
        name: "Penuh",
        value: false,
      },
      {
        name: "Down Payment",
        value: true,
      },
    ],
    countdown: "",
    http: { ...useHttpClient() }
  };

  getEmployee = async () => {
    console.log({ response: "lalalalalalala" })
    this.setState({ isLoading: true });
    const { http: { get } } = this.state
    const token = localStorage.getItem("token");
    const response = await get("/employees",
      token);
    console.log({ response })
    if (response?.status === 200) {
      this.setState({ employees: response?.data });
      return true
    }
  }

  getCustomer = async () => {
    this.setState({ isLoading: true });
    const { http: { get } } = this.state
    const user = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    const response = await get("/customers/with-username/" + user,
      token);
    console.log({ response })
    if (response?.status === 200) {
      this.setState({
        customers: response?.data,
        customer_id: response?.data?.[0]?.customer_id ?? "",
        customer_account_name: response?.data?.[0]?.fullname ?? "",
        customer_account_number: response?.data?.[0]?.phone_number ?? "",
      });
      return true
    }
  }

  addCustomers = async (payload) => {
    this.setState({ isLoading: true });
    const { http: { post } } = this.state
    const user = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    const response = await post("/customers", {
      ...payload,
      username: user,
      created_by: user,
    },
      token);
    if (response?.status === 200) {
      this.props.enqueueSnackbar('Berhasil menambah pelanggan.')
      this.getCustomer();
    } else {
      this.props.enqueueSnackbar('Gagal menambah pelanggan.')
    }
    this.setState({ isLoading: false, payload: {} });
  };

  addOrders = async (payload) => {
    this.setState({ isLoading: true });
    const { history } = this.props;
    const { http: { post } } = this.state;
    const user = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    const response = await post("/orders", {
      ...payload,
      created_by: user
    },
      token);
    if (response?.status === 200) {
      this.props.enqueueSnackbar('Berhasil menambah pemesanan.');
      history.push({ pathname: '/orders/payment/proof' });
    } else {
      this.props.enqueueSnackbar('Gagal menambah pemesanan.');
    }
    this.setState({ isLoading: false, payload: {} });
  };

  componentWillMount() {
    this.getCustomer();
    this.getEmployee();
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

  handleChangeNumber = (e, name) => {
    let number = e && e.target && e.target.value ? e.target.value : e;
    number = String(number).replace(/[^0-9.]/g, '') - 0;
    this.setState({
      [name]: number,
    });
  };

  handleTab = (tabInit, go) => {
    const tab = go ? tabInit + 1 : tabInit - 1
    this.setState({ tab });
  }

  componentWillReceiveProps(nextProps) {
    console.log({ nextProps })
    if (this.props?.isLoadingProduct !== nextProps?.isLoadingProduct) {
      console.log({ nextProps2: nextProps })
      this.setState({ isLoadingProduct: nextProps?.isLoadingProduct, products: nextProps?.products });
    }
  }

  handleSubmit = () => {
    const {
      customer_id,
      selectedEmployee,
      selectedTimes,
      is_down_payment,
      customer_account_name,
      customer_account_number,
      selectedProducts,
      products,
      date,
    } = this.state

    var today = new Date(date);
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const totalPayment = products.filter((product) =>
      selectedProducts
        .indexOf(product.service_id) !== -1)
      .map(e => e.price.replace(".", "") - 0)
      .reduce((a, b) => a + b, 0)

    const payload = {
      customer_id: customer_id,
      employee_id: selectedEmployee,
      booking_date: `${yyyy}-${mm}-${dd}`,
      booking_time: ((selectedTimes < 10) ? "0" + selectedTimes : selectedTimes) + ":00:00",
      is_down_payment: is_down_payment,
      celine_bank_name: "",
      celine_account_name: "",
      celine_account_number: "",
      customer_account_name: customer_account_name,
      customer_account_number: customer_account_number,
      customer_payment_nominal: String(totalPayment),
      // total_payment: totalPayment,
      transfer_evidence: "",
      detail_order: selectedProducts.map((e) => {
        const data = products.find(r => r.service_id === e);
        return {
          service_id: data.service_id,
          service_name: data.service_name,
          price: data.price
        }
      }),
    }
    this.addOrders(payload);
  }

  render() {
    const { classes, className, history, ...rest } = this.props;
    const {
      date,
      products,
      isLoadingProduct,
      employees,
      customers,
      selectedProducts,
      selectedEmployee,
      selectedTimes,

      customer_id,
      // employee_id,
      // booking_date,
      // booking_time,

      username,
      fullname,
      phone_number,
      email,
      address,
      gender,

      customer_account_name,
      customer_account_number,
      checkedB,
      tab,
      is_down_payment,
      is_down_paymentList,
    } = this.state;

    var today = new Date(date);
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ]

    const isNextTab = tab < 4
    const isBackTab = tab > 1
    const isSubmitTab = tab === 4

    const totalPayment = products.filter((product) =>
      selectedProducts
        .indexOf(product.service_id) !== -1)
      .map(e => e.price.replace(".", "") - 0)
      .reduce((a, b) => a + b, 0)
      .toLocaleString('id', { style: 'currency', currency: 'IDR' }).split(",")[0]
    const dataDate = dd + " " + monthNames[today.getMonth()] + " " + yyyy;
    let dataTime = selectedTimes;
    if (selectedTimes - 0 < 10) {
      dataTime = '0' + selectedTimes;
    }

    const rootClassName = classNames(classes.root, className);

    const mainTab = [
      null,
      (<>
        <div className={classes.field}>
          <Typography
            className={classes.title}
            variant="h4"
          >
            Pilih Jenis Layanan
          </Typography>
        </div>
        {!isLoadingProduct ? (
          <div className={classes.field}>
            <Grid
              container
              spacing={2}
            >
              {products.map((product, index) => (
                <Grid
                  item
                  key={product.service_id}
                  lg={4}
                  md={6}
                  xs={12}
                  onClick={() => this.handleSelectOne(product.service_id, "selectedProducts")}
                >
                  <ProductCard
                    image={product.thumbnail}
                    title={product.service_name}
                    description={product.description}
                    secondary={"Harga " + new Number(product.price).toLocaleString('id', { style: 'currency', currency: 'IDR' }).split(",")[0]}
                    checked={selectedProducts.indexOf(product.service_id) !== -1}
                  />
                </Grid>
              ))
              }
            </Grid>
          </div>
        ) : (
          <div className={classes.progressWrapper}>
            <CircularProgress />
          </div>
        )}
      </>),
      (<>
        <div className={classes.field}>
          <Typography
            className={classes.title}
            variant="h4"
          >
            Data Pemesan
          </Typography>
        </div>

        {
          !checkedB && (
            <div className={classes.field}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open1-select-label">Pemesan</InputLabel>
                <Select
                  labelId="demo-controlled-open1-select-label"
                  id="demo-controlled-open1-select"
                  value={customer_id}
                  onChange={e => this.handleChange(e, "customer_id")}
                  inputProps={{
                    name: 'customer_id',
                    id: 'bank-simple',
                  }}
                  native
                >
                  {customers.map((e) =>
                    <option value={e.customer_id}>{e.fullname}</option>
                  )}
                </Select>

              </FormControl>
            </div>
          )
        }

        <div className={classes.field}>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedB}
                onChange={event =>
                  this.handleChange(event.target.checked, 'checkedB')
                }
                name="checkedB"
                color="primary"
              />
            }
            label="Buat data pemesan baru"
          />
        </div>

        {checkedB && (
          <form
            autoComplete="off"
            noValidate
          >
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="Nama Panjang"
                margin="dense"
                required
                onChange={e => (this.handleChange(e, "username"), this.handleChange(e, "fullname"))}
                value={fullname}
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                label="Nomor Hp"
                margin="dense"
                type="number"
                onChange={e => this.handleChange(e, "phone_number")}
                value={phone_number}
                variant="outlined"
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                onChange={e => this.handleChange(e, "email")}
                label="Email"
                margin="dense"
                required
                value={email}
                type="email"
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                onChange={e => this.handleChange(e, "address")}
                label="Alamat"
                value={address}
                margin="dense"
                type="text"
                required
                variant="outlined"
              />
            </div>
            <div className={classes.field}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">Jenis kelamin</InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  value={gender}
                  onChange={e => this.handleChange(e, "gender")}
                  inputProps={{
                    name: 'gender',
                    id: 'gender-simple',
                  }}
                  native
                >
                  <option value={"M"}>Laki-laki</option>
                  <option value={"F"}>Perempuan</option>
                </Select>
              </FormControl>
            </div>
            <div className={classes.field}>
              <Button
                color="primary"
                variant="contained"
                onClick={() => this.addCustomers({ fullname, phone_number, address, username, gender, email })}
              >
                Simpan
              </Button>
            </div>
          </form>
        )}
        <div className={classes.field}>
          <Typography
            className={classes.title}
            variant="h4"
          >
            Pilih Tanggal Pemesanan
          </Typography>
        </div>
        <div className={classes.field}>
          <DayPicker
            onDayClick={this.handleDayClick}
            selectedDays={[
              dataDate ? new Date(dataDate) : null,
            ]}
          />
        </div>

        <div className={classes.field}>
          <Typography
            className={classes.title}
            variant="h4"
          >
            Pilih Jam Pemesanan
          </Typography>
        </div>
        {!date && (
          <div className={classes.field}>
            <Typography
              className={classes.title}
              variant="body1"
            >
              Pilih tanggal terlebih dahulu
            </Typography>

          </div>)}
        <div className={classes.field}>
          <Grid
            container
            spacing={3}
          >
            {Array(12).fill().map((x, i) => i + 8).map((data, index) => {
              const time = data + 1;
              return (
                <Grid
                  item
                  key={time}
                  lg={3}
                  md={4}
                  xs={6}
                  onClick={() => date ? this.handleChange(time, "selectedTimes") : null}
                >
                  <BookingCard checked={selectedTimes == time} title={"Jam " + time} status={"Tersedia"} />
                </Grid>
              )
            })
            }
          </Grid>
        </div>
      </>),
      (<>

        <div className={classes.field}>
          <Typography
            className={classes.title}
            variant="h4"
          >
            Pilih Pegawai
          </Typography>
        </div>
        <div className={classes.field}>
          <Grid
            container
            spacing={3}
          >
            {employees.map((employee, index) => (
              <Grid
                item
                key={employee.employee_id}
                lg={3}
                md={6}
                sm={6}
                xs={12}
                onClick={() => this.handleChange(employee.employee_id, "selectedEmployee")}
              >
                <ProductCard
                  image={employee.profile_image}
                  title={employee.fullname}
                  description={""}
                  secondary={""}
                  checked={selectedEmployee === employee.employee_id}
                />
              </Grid>
            ))
            }
          </Grid>
        </div>
      </>),
      (<>
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
                onChange={e => this.handleChange(e, "customer_account_name")}
                label="Nama"
                margin="dense"
                required
                value={customer_account_name}
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
                onChange={e => this.handleChangeNumber(e, "customer_account_number")}
                label="Nomor Rek"
                margin="dense"
                required
                value={customer_account_number}
                variant="outlined"
                type="text"
              />
            </Grid>
          </Grid>
        </div>

        <div className={classes.field}>
          <Typography
            className={classes.title}
            variant="h4"
          >
            Nominal Pembayaran
          </Typography>
        </div>

        <div className={classes.field}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">Pembayaran</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              value={is_down_payment}
              onChange={e => this.handleChange(e, "is_down_payment")}
              inputProps={{
                name: 'is_down_payment',
                id: 'is_down_payment-simple',
              }}
              native
            >
              <option aria-label="None" value="" />
              {
                is_down_paymentList.map(e =>
                  <option value={e.value}>{e.name}</option>
                )
              }
            </Select>
          </FormControl>
        </div>
        {/* <div className={classes.field}>
          <Typography
            className={classes.title}
            variant="h5"
          >
            Total Nominal Pembayaran {is_down_payment == true ? "Down Payment" : "Keseluruhan"}
          </Typography>
          <div className={classes.field}>
            <Typography
              className={classes.title}
              variant="h4"
              style={{ textAlign: "center" }}
            >
              {is_down_payment == true ? transfer.split(",")[0] : (products.filter((product) =>
                selectedProducts
                  .indexOf(product.service_id) !== -1)
                .map(e => e.price.replace(".", "") - 0)
                .reduce((a, b) => a + b, 0) + 300)
                .toLocaleString('id', { style: 'currency', currency: 'IDR' }).split(",")[0]}
            </Typography>
          </div>
          <Typography
            className={classes.title}
            variant="body2"
            style={{ marginTop: 4 }}
          >
            Pastikan nominal sesuai hingga 3 digit terakhir
          </Typography>
        </div> */}
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
                title="Pemesanan"
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

              {
                isSubmitTab ? (
                  <>
                    <Button
                      color="primary"
                      variant="contained"
                      disabled={!isBackTab}
                      style={{ marginRight: 10 }}
                      onClick={() => this.handleTab(tab, false)}
                    >
                      Kembali
                    </Button>
                    <Button
                      color="primary"
                      variant="contained"
                      disabled={(!selectedTimes || !selectedEmployee || !selectedProducts.length)}
                      onClick={() => this.handleSubmit()}
                    >
                      Lanjut
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      color="primary"
                      variant="contained"
                      disabled={!isBackTab}
                      style={{ marginRight: 10 }}
                      onClick={() => this.handleTab(tab, false)}
                    >
                      Kembali
                    </Button>
                    <Button
                      color="primary"
                      variant="contained"
                      disabled={!isNextTab}
                      onClick={() => this.handleTab(tab, true)}
                    >
                      Lanjut
                    </Button>
                  </>
                )
              }
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
                  Jenis Layanan
                </Typography>
                {!selectedProducts.length ? (
                  <Typography variant="body1">Tidak ada jenis layanan yang dipilih</Typography>
                ) : (
                  <div className={classes.demo}>
                    <List dense={true}>
                      {products.map((product) => selectedProducts.indexOf(product.service_id) !== -1 && (
                        <ListItem key={product.service_id}>
                          <ListItemAvatar>
                            <Avatar
                              className={classes.avatar}
                              src={product.thumbnail}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={product.service_name}
                            secondary={new Number(product.price).toLocaleString('id', { style: 'currency', currency: 'IDR' }).split(",")[0]}
                          />
                          <ListItemSecondaryAction>
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() => this.handleSelectOne(product.service_id, "selectedProducts")}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
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
                {selectedEmployee ? (
                  <Typography variant="body1" className={classes.title}>
                    {employees.find(e => e.employee_id === selectedEmployee).fullname}
                  </Typography>
                ) : (
                  <Typography variant="body1">Tidak ada pegawai yang dipilih</Typography>
                )}

              </div>
              {/* <div className={classes.field}>
                <Typography variant="h6" className={classes.title}>
                  Tanggal pemesanan
                </Typography>
                <DayPicker
                  onDayClick={this.handleDayClick}
                  selectedDays={[
                    dataDate ? new Date(dataDate) : null,
                  ]}
                />
              </div> */}
              <div className={classes.field}>
                <Typography variant="h6" className={classes.title}>
                  Jam pemesanan
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

                <Typography variant="body1">{totalPayment}</Typography>
              </div>

            </PortletContent>
          </Portlet>
        </Grid>
      </Grid>
    );
  }
}

export default compose(
  withRouter,
  withSnackbar,
  withStyles(styles)
)(Account);
