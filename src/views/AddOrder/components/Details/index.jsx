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
  constructor(props) {
    super(props);
    this.countdown = React.createRef();
  }

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
    checkedB: true,
    tab: 1,

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
    selectedFile: "",
    bank: "BCA",
    countdown: 0,
    seconds: 0,
    bankList: [
      {
        name: "BCA",
        value: "BCA",
        rek: "0913 2012 001",
        user: "Celine",
      },
      {
        name: "BRI",
        value: "BRI",
        rek: "0913 2012 002",
        user: "Celine",
      },
      {
        name: "BTPN",
        value: "BTPN",
        rek: "0913 2012 003",
        user: "Celine",
      },
    ],
    renderCountdown: 0,
    paymentUser: 0,
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

  getEmployee = async (date) => {
    this.setState({ isLoading: true });
    var today = date ? new Date(date) : new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const { http: { post }, selectedTimes } = this.state
    const token = localStorage.getItem("token");
    const response = await post("/schedules/available",
      {
        booking_date: `${yyyy}-${mm}-${dd}`,
        booking_time: ((selectedTimes < 10) ? "0" + selectedTimes : selectedTimes) + ":00:00"
      },
      token);
    if (response?.status === 200) {
      this.setState({
        employees: response?.data.filter(e => e.is_show),
        isLoading: false,
      });
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
        checkedB: response?.data?.[0]?.customer_id ? false : true,
        customer_account_name: response?.data?.[0]?.fullname ?? "",
        customer_account_number: response?.data?.[0]?.phone_number ?? "",
        isLoading: false,
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
    console.log({ payload })
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
      history.push({ pathname: '/orders' });
    } else {
      this.props.enqueueSnackbar('Gagal menambah pemesanan.');
    }
    this.setState({ isLoading: false, payload: {} });
  };

  componentWillMount() {
    this.getCustomer();
    // this.getEmployee();

    this.countdown = setInterval(() => {
      const { date, selectedTimes } = this.state
      if (date && selectedTimes) {
        var countDownDate = new Date(date).getTime();
        // new Date(countDownDate).setHours(selectedTimes).getTime()

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        const pad = (n) => {
          return (n < 10 ? "0" + n : n);
        }

        // Output the result in an element with id="demo"
        this.setState({ renderCountdown: pad(days) + " Hari : " + pad(hours) + " Jam : " + pad(minutes) + " Menit : " + pad(seconds) + " Detik" })

        // If the count down is over, write some text 
        if (distance < 0) {
          clearInterval(this.countdown);
          this.setState({ renderCountdown: "Telat transfer melebihi batas waktu" })
        }
      }
    }, 1000)

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
      [name]: e?.target?.value ?? (e || "")
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
    if (this.props?.isLoadingProduct !== nextProps?.isLoadingProduct) {
      this.setState({ isLoadingProduct: nextProps?.isLoadingProduct, products: nextProps?.products });
    }
  }

  handleUploadClick = event => {
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
      bankList,
      bank,
      total_payment,
      paymentUser,
      selectedFile
    } = this.state

    var today = new Date(date);
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const bankDetail = bankList.find(e => e.value === bank)

    const payload = {
      customer_id: customer_id,
      employee_id: selectedEmployee,
      booking_date: `${yyyy}-${mm}-${dd}`,
      booking_time: ((selectedTimes < 10) ? "0" + selectedTimes : selectedTimes) + ":00:00",
      is_down_payment: is_down_payment,
      celine_bank_name: bankDetail.name,
      celine_account_name: bankDetail.user,
      celine_account_number: bankDetail.rek,
      transfer_evidence: selectedFile[0],
      customer_account_name: customer_account_name,
      customer_account_number: customer_account_number,
      customer_payment_nominal: String(paymentUser),
      total_payment: total_payment,
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
      isLoading,

      customer_account_name,
      customer_account_number,
      checkedB,
      tab,
      is_down_payment,
      is_down_paymentList,

      bank, bankList, selectedFile,
      total_payment
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

    const isNextTab = tab < 5
    const isBackTab = tab > 1
    const isSubmitTab = tab === 5


    if (tab === 2 && !isLoading && employees.length) {
      this.setState({ employees: [], selectedEmployee: "" })
    }

    if (tab === 3 && !isLoading && !employees.length) {
      this.getEmployee(date);
    }

    if (tab === 4 && !isLoading && employees.length && !selectedEmployee) {
      this.handleChange(employees?.[Math.floor(Math.random() * employees.length) + 1].employee_id, "selectedEmployee")
    }

    const bankDetail = bankList.find(e => e.value === bank);
    const paymentUser = products.filter((product) =>
      selectedProducts
        .indexOf(product.service_id) !== -1)
      .map(e => e.price.replace(".", "") - 0)
      .reduce((a, b) => a + b, 0)
    const dataDate = dd + " " + monthNames[today.getMonth()] + " " + yyyy;
    let dataTime = selectedTimes;
    if (selectedTimes - 0 < 10) {
      dataTime = '0' + selectedTimes;
    }

    if (isSubmitTab && total_payment === 0) {
      let total_payment = 0
      if (is_down_payment) {
        total_payment = (products.filter((product) =>
          selectedProducts
            .indexOf(product.service_id) !== -1)
          .map(e => e.price.replace(".", "") - 0)
          .reduce((a, b) => a + b, 0) * 0.1 + Math.floor(Math.random() * 1000) + 101);
        if (total_payment < 20001) {
          total_payment = total_payment + Math.floor(Math.random() * 1000) + 101
        }
      } else {
        total_payment = (products.filter((product) =>
          selectedProducts
            .indexOf(product.service_id) !== -1)
          .map(e => e.price.replace(".", "") - 0)
          .reduce((a, b) => a + b, 0) + Math.floor(Math.random() * 1000) + 101)
      }
      this.setState({ total_payment, paymentUser })
    }

    var today2 = new Date();
    var dd2 = today2.getDate();
    var mm2 = today2.getMonth() + 1;
    var yyyy2 = today2.getFullYear();
    if (dd2 < 10) dd2 = '0' + dd2;
    if (mm2 < 10) mm2 = '0' + mm2;

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
                    // description={product.description}
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
            disabledDays={day => day < (new Date(`${yyyy2}-${mm2}-${dd2}`))}
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
              let MyTime = true;
              if (`${yyyy}-${mm}-${dd}` === `${yyyy2}-${mm2}-${dd2}`) {
                MyTime = data - 0 > new Date().getHours() - 0 ? true : false
              }

              return (
                <Grid
                  item
                  key={time}
                  lg={3}
                  md={4}
                  xs={6}
                  onClick={() => date && MyTime ? this.handleChange(time, "selectedTimes") : null}
                >
                  <BookingCard checked={selectedTimes == time} title={"Jam " + time} status={MyTime ? "Tersedia" : "Tidak Tersedia"} />
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

        {!isLoading ? (
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
              {
                is_down_paymentList.map(e =>
                  <option value={e.value}>{e.name}</option>
                )
              }
            </Select>
          </FormControl>
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
          <Typography variant="h6" className={classes.title}>
            Nama Pemesan
          </Typography>
          <Typography variant="body1" className={classes.title}>
            {customer_account_name}
          </Typography>
        </div>

        <div className={classes.field}>
          <Typography variant="h6" className={classes.title}>
            Nomor Rekening
          </Typography>
          <Typography variant="body1" className={classes.title}>
            {customer_account_number}
          </Typography>
        </div>
        {/* <div className={classes.field}>
          <Typography
            className={classes.title}
            variant="h5"
          >
            Total Nominal Pembayaran {is_down_payment ? "Down Payment" : "Keseluruhan"}
          </Typography>
          <div className={classes.field}>
            <Typography
              className={classes.title}
              variant="h4"
              style={{ textAlign: "center" }}
            >
            </Typography>
          </div>
          <Typography
            className={classes.title}
            variant="body2"
            style={{ marginTop: 4 }}
          >
            Pastikan nominal sesuai hingga 3 digit terakhir
          </Typography>
        </div>

        <div className={classes.field}>
          <Typography
            className={classes.title}
            variant="h4"
            style={{ textAlign: "center" }}
          >
            0 Hari : 01 Jam : 30 Menit : 29 Detik
          </Typography>
        </div> */}

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
              {bankList.map((e) =>
                <option value={e.value}>{e.name}</option>
              )}
            </Select>
          </FormControl>
        </div>
        <div className={classes.field}>
          <BookingCard noWrap={false} title={bankDetail.name} status={"Kirim jumlah uang ke nomor Rek " + bankDetail.rek + " atas nama " + bankDetail.user} />
        </div>

        <div className={classes.field}>
          <Typography
            className={classes.title}
            variant="h5"
          >
            Total Nominal Pembayaran {is_down_payment ? "Down Payment" : "Keseluruhan"}
          </Typography>
          <div className={classes.field}>
            <Typography
              className={classes.title}
              variant="h4"
              style={{ textAlign: "center" }}
            >
              {new Number(total_payment).toLocaleString('id', { style: 'currency', currency: 'IDR' }).split(",")[0]}
            </Typography>
          </div>
          <Typography
            className={classes.title}
            variant="body2"
            style={{ marginTop: 4, textAlign: "center" }}
          >
            Pastikan nominal sesuai hingga 3 digit terakhir
          </Typography>
        </div>
        <div className={classes.field}>
          <Typography
            className={classes.title}
            variant="h4"
            style={{ textAlign: "center" }}
          >
            {this.state.renderCountdown}
          </Typography>
        </div>
        <div className={classes.field}>
          <Typography
            className={classes.title}
            variant="h4"
          >
            Bukti Pembayaran
          </Typography>
        </div>
        <div className={classes.field}>
          {
            selectedFile && (
              <img
                src={selectedFile ? selectedFile : "/images/logos/logo.png"}
                style={{ maxWidth: "100%" }}
              />
            )
          }

          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
            onChange={this.handleUploadClick}
          />
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
                      disabled={(!selectedTimes || !selectedEmployee || !selectedProducts.length || !selectedFile)}
                      onClick={() => this.handleSubmit()}
                    >
                      Bayar
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
                    {console.log({
                      tab,
                      selectedProducts,
                      isLoadingProduct,
                      isLoading,
                      isNextTab,
                    })}
                    <Button
                      color="primary"
                      variant="contained"
                      disabled={(
                        (tab == 2 && (!selectedTimes || !date || !customer_id))
                        // || (tab == 3 && !selectedEmployee)
                        || (tab == 1 && !selectedProducts.length)
                        || (tab == 4 && (!customer_account_number || !customer_account_name))
                        || !isNextTab || (isLoadingProduct || isLoading)
                      )}
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
                          {!isSubmitTab && (
                            <ListItemSecondaryAction>
                              <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => this.handleSelectOne(product.service_id, "selectedProducts")}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </ListItemSecondaryAction>
                          )}
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

                <Typography variant="body1">
                  {paymentUser
                    .toLocaleString('id', { style: 'currency', currency: 'IDR' }).split(",")[0]
                  }</Typography>
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
