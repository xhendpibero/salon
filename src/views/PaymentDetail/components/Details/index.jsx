import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// Externals
import compose from 'recompose/compose';
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

import 'react-day-picker/lib/style.css';


// Material components
import {
  Button,
  Grid,
  Typography,
  List,
  ListItem,
  FormControl,
  InputLabel,
  Select,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@material-ui/core';

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  BookingCard,
  Status,
  PortletFooter,
} from 'components';

// Component styles
import styles from './styles';

class Account extends Component {
  constructor(props) {
    super(props);
    this.time = React.createRef();
  }

  state = {
    bank: 1,
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
  };

  handleChange = (e, name) => {
    this.setState({
      [name]: e && e.target && e.target.value ? e.target.value : e || ""
    });
  };

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

  componentDidMount() {

    // // Set the date we're counting down to
    // var countDownDate = new Date("Jan 5, 2022 15:37:25").getTime();

    //     setInterval(() => {
    //       // Get today's date and time
    //       var now = new Date().getTime();

    //       // Find the distance between now and the count down date
    //       var distance = countDownDate - now;

    //       // Time calculations for days, hours, minutes and seconds
    //       var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    //       var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //       var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    //       var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    //       const pad = (n) => {
    //         return (n < 10 ? "0" + n : n);
    //       }

    //       // Output the result in an element with id="demo"
    //       this.time = pad(days) + " Hari : " + pad(hours) + " Jam : " + pad(minutes) + " Menit : " + pad(seconds) + " Detik"

    //       // If the count down is over, write some text 
    //       if (distance < 0) {
    //         clearInterval(x);
    //         this.time = "Telat transfer melebihi batas waktu";
    //       }
    //     }, 1000)

    // setInterval(() => {
    //   var seconds = 0
    //   var startDate = new Date(this.props.data?.booking_date || new Date());
    //   var endDate = new Date();
    //   seconds = parseInt(((endDate.getTime() - startDate.getTime()) / 1000) || 0);
    //   if (seconds > 0 && !this.state.seconds) {
    //     this.setState({
    //       seconds
    //     });
    //   }
    //   const timer = () => {
    //     const seconds = this.state.seconds;
    //     var days = Math.floor(seconds / 24 / 60 / 60);
    //     var hoursLeft = Math.floor((seconds) - (days * 86400));
    //     var hours = Math.floor(hoursLeft / 3600);
    //     var minutesLeft = Math.floor((hoursLeft) - (hours * 3600));
    //     var minutes = Math.floor(minutesLeft / 60);
    //     var remainingSeconds = seconds % 60;
    //     const pad = (n) => {
    //       return (n < 10 ? "0" + n : n);
    //     }
    //     if (seconds <= 0) {
    //       return "Telat transfer melebihi batas waktu";
    //     } else {
    //       return pad(days) + " Hari : " + pad(hours) + " Jam : " + pad(minutes) + " Menit : " + pad(remainingSeconds) + " Detik";
    //     }
    //   }

    //   this.setState({
    //     countdown: timer(),
    //     seconds: this.state.seconds - 1
    //   });
    // }, 1000);
  }

  render() {
    const { classes, className, history, handleSubmit, editOrders, ...rest } = this.props;
    const {
      order_id,
      employee_id,
      customer_id,
      schedule_id,
      booking_date,
      is_down_payment,
      customer_account_name,
      customer_account_number,
      customer_payment_nominal,
      transfer_evidence,
      status,
      created,
      created_by,
      updated,
      updated_bys,
      celine_bank_name,
      celine_account_name,
      celine_account_number,
      total_payment,
      total,
      services,
      serviceList,
      employee,
    } = this.props.data
    const { bank, bankList, selectedFile } = this.state

    const role = localStorage.getItem("role") === "admin";

    const statusColors = {
      "completed": 'success',
      "confirmed": 'primary',
      "on-progress": 'info',
      "unconfirmed": 'warning',
      "canceled": 'danger'
    };

    const statusText = {
      "completed": 'Selesai',
      "confirmed": 'Pemesanan berhasil',
      "on-progress": 'Sedang berjalan',
      "unconfirmed": 'Perlu konfirmasi',
      "canceled": 'Pemesanan batal'
    };

    var today = new Date(booking_date);
    var dd = today.getDate();

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

    const dataDate = dd + " " + monthNames[today.getMonth()] + " " + yyyy;
    let dataTime = new Date(booking_date).getHours();
    if (dataTime - 0 < 10) {
      dataTime = '0' + dataTime;
    }
    const bankDetail = bankList.find(e => e.value === bank)

    const rootClassName = classNames(classes.root, className);

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

                <div className={classes.field}>
                  <Typography
                    className={classes.title}
                    variant="h4"
                  >
                    Status Pemesanan
                  </Typography>
                </div>

                <div className={classes.field}>
                  <Typography variant="h6" className={classes.title}>
                    Status
                  </Typography>
                  <div className={classes.statusWrapper}>
                    <Status
                      className={classes.status}
                      color={statusColors[status]}
                      size="sm"
                    />
                    <Typography variant="body1" className={classes.title}>
                      {statusText[status]}
                    </Typography>
                  </div>
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
                  <Typography variant="h6" className={classes.title}>
                    Nama Pemesan
                  </Typography>
                  <Typography variant="body1" className={classes.title}>
                    {customer_account_name}
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

                <div className={classes.field}>
                  <Typography
                    className={classes.title}
                    variant="h4"
                  >
                    Bank Tujuan
                  </Typography>
                </div>
                {/* {!transfer_evidence ? ( */}
                {/* <>
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
                    <Grid
                      container
                      spacing={3}
                    >
                      <Grid
                        item
                        md={12}
                      >
                        <BookingCard noWrap={true} title={bankDetail.name} status={"Kirim jumlah uang ke nomor Rek " + bankDetail.rek + " atas nama " + bankDetail.user} />
                      </Grid>
                    </Grid>
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
                  {this.state.countdown > 0 && (
                    <div className={classes.field}>
                      <Typography
                        className={classes.title}
                        variant="h4"
                        style={{ textAlign: "center" }}
                      >
                        {this.state.countdown}
                      </Typography>
                    </div>
                  )}

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
                </> */}
                {/* // ) : ( */}
                <>
                  <div className={classes.field}>
                    <Typography variant="h6" className={classes.title}>
                      Bank
                    </Typography>
                    <Typography variant="body1" className={classes.title}>
                      {celine_bank_name}
                    </Typography>
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
                        <BookingCard noWrap={false} title={celine_bank_name} status={"Kirim jumlah uang ke nomor Rek " + celine_account_number + " atas nama " + celine_account_name} />
                      </Grid>
                    </Grid>
                  </div>
                  <div className={classes.field}>
                    <Typography variant="h6" className={classes.title}>
                      Pembayaran yang telah dilakukan ({is_down_payment ? "DP" : "Penuh"})
                    </Typography>
                    <Typography variant="body1" className={classes.title}>
                      {new Number(total_payment).toLocaleString('id', { style: 'currency', currency: 'IDR' }).split(",")[0]}
                    </Typography>
                  </div>
                  <div className={classes.field}>
                    <Typography variant="h6" className={classes.title}>
                      Total Pembayaran
                    </Typography>
                    <Typography variant="body1" className={classes.title}>
                      {new Number(customer_payment_nominal).toLocaleString('id', { style: 'currency', currency: 'IDR' }).split(",")[0]}
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
                    <img
                      src={transfer_evidence && transfer_evidence.substring(0, 1) === `{` ? transfer_evidence.substring(2, transfer_evidence.length - 2) : transfer_evidence}
                      style={{ maxWidth: "100%" }}
                    />
                  </div>
                </>
                {/* // )} */}
              </form>
            </PortletContent>
            <PortletFooter className={classes.portletFooter}>

              {(!transfer_evidence) && (
                <></>
                // <Button
                //   color="primary"
                //   variant="contained"
                //   disabled={!selectedFile}
                //   onClick={() => {
                //     const {
                //       order_id,
                //       customer_id,
                //       employee_id,
                //       schedule_id,
                //       booking_date,
                //       booking_time,
                //       is_down_payment,
                //       customer_account_name,
                //       customer_account_number,
                //       customer_payment_nominal,
                //       total_payment,
                //       status,
                //       detail_order,
                //     } = this.props.data
                //     // console.log(this.props.data, "asdasds")
                //     editOrders({
                //       order_id,
                //       customer_id,
                //       employee_id,
                //       schedule_id,
                //       booking_date,
                //       booking_time,
                //       is_down_payment,
                //       customer_account_name,
                //       customer_account_number,
                //       customer_payment_nominal,
                //       total_payment,
                //       status,
                //       detail_order,
                //       celine_bank_name: bankDetail.name,
                //       celine_account_name: bankDetail.user,
                //       celine_account_number: bankDetail.rek,
                //       transfer_evidence: selectedFile,
                //     })
                //   }}
                // >
                //   Bayar
                // </Button>
              )}

              {(status === "unconfirmed" && role && transfer_evidence) && (
                <>
                  <Button
                    color="primary"
                    variant="contained"
                    style={{ marginRight: 10 }}
                    onClick={() => handleSubmit("confirm", { order_id: order_id })}
                  >
                    Konfirmasi
                  </Button>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => handleSubmit("cancel", { order_id: order_id })}
                  >
                    Batalkan
                  </Button>
                </>
              )}
              {(status === "confirmed" && role) && (
                <>
                  <Button
                    color="secondary"
                    variant="contained"
                    style={{ marginRight: 10, backgroundColor: "#45B880" }}
                    onClick={() => handleSubmit("complete", { order_id: order_id })}
                  >
                    Selesai
                  </Button>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => handleSubmit("cancel", { order_id: order_id })}
                  >
                    Batalkan
                  </Button>
                </>
              )}
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
                title={"Pemesanan No#" + order_id}
              />
            </PortletHeader>
            <PortletContent noPadding>
              <div className={classes.field}>
                <Typography variant="h6" className={classes.title}>
                  Jenis Layanan
                </Typography>
                <div className={classes.demo}>
                  <List dense={true}>
                    {services?.map((product, index) =>
                      <ListItem key={product.service_id}>
                        <ListItemAvatar>
                          <Avatar
                            className={classes.avatar}
                            src={serviceList?.[index].thumbnail}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={product.service_name}
                          secondary={new Number(product.price).toLocaleString('id', { style: 'currency', currency: 'IDR' }).split(",")[0]}
                        />
                      </ListItem>
                    )}
                  </List>
                </div>
              </div>
              <div className={classes.field}>
                <Typography variant="h6" className={classes.title}>
                  Pegawai
                </Typography>
                <Typography variant="body1" className={classes.title}>
                  {employee?.fullname}
                </Typography>
              </div>
              <div className={classes.field}>
                <Typography variant="h6" className={classes.title}>
                  Jam pemesanan
                </Typography>
                <Typography variant="body1" className={classes.title}>
                  {dataDate}, jam {dataTime}:00
                </Typography>
              </div>
              <div className={classes.field}>
                <Typography variant="h6" className={classes.title}>
                  Total
                </Typography>
                <Typography variant="body1">
                  {new Number(total).toLocaleString('id', { style: 'currency', currency: 'IDR' }).split(",")[0]}
                </Typography>
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
