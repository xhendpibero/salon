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
    selectedProducts: [],
    selectedUsers: "",
    selectedTimes: 0,
    error: null,
    date: "",
    password: "",
    passwordConfirm: "",
    name: "",
    email: "",
    checkedB: false,
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

  render() {
    const { classes, className, history, ...rest } = this.props;
    const { date,
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
    } = this.state;
    var today = new Date(date);
    var dd = today.getDate();

    const top100Films = [
      { title: 'The Shawshank Redemption', year: 1994 },
      { title: 'The Godfather', year: 1972 },
      { title: 'The Godfather: Part II', year: 1974 },
      { title: 'The Dark Knight', year: 2008 },
      { title: '12 Angry Men', year: 1957 },
      { title: "Schindler's List", year: 1993 },
      { title: 'Pulp Fiction', year: 1994 },
      { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
      { title: 'The Good, the Bad and the Ugly', year: 1966 },
      { title: 'Fight Club', year: 1999 },
      { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
      { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
      { title: 'Forrest Gump', year: 1994 },
      { title: 'Inception', year: 2010 },
      { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
      { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
      { title: 'Goodfellas', year: 1990 },
      { title: 'The Matrix', year: 1999 },
      { title: 'Seven Samurai', year: 1954 },
      { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
      { title: 'City of God', year: 2002 },
      { title: 'Se7en', year: 1995 },
      { title: 'The Silence of the Lambs', year: 1991 },
      { title: "It's a Wonderful Life", year: 1946 },
      { title: 'Life Is Beautiful', year: 1997 },
      { title: 'The Usual Suspects', year: 1995 },
      { title: 'Léon: The Professional', year: 1994 },
      { title: 'Spirited Away', year: 2001 },
      { title: 'Saving Private Ryan', year: 1998 },
      { title: 'Once Upon a Time in the West', year: 1968 },
      { title: 'American History X', year: 1998 },
      { title: 'Interstellar', year: 2014 },
      { title: 'Casablanca', year: 1942 },
      { title: 'City Lights', year: 1931 },
      { title: 'Psycho', year: 1960 },
      { title: 'The Green Mile', year: 1999 },
      { title: 'The Intouchables', year: 2011 },
      { title: 'Modern Times', year: 1936 },
      { title: 'Raiders of the Lost Ark', year: 1981 },
      { title: 'Rear Window', year: 1954 },
      { title: 'The Pianist', year: 2002 },
      { title: 'The Departed', year: 2006 },
      { title: 'Terminator 2: Judgment Day', year: 1991 },
      { title: 'Back to the Future', year: 1985 },
      { title: 'Whiplash', year: 2014 },
      { title: 'Gladiator', year: 2000 },
      { title: 'Memento', year: 2000 },
      { title: 'The Prestige', year: 2006 },
      { title: 'The Lion King', year: 1994 },
      { title: 'Apocalypse Now', year: 1979 },
      { title: 'Alien', year: 1979 },
      { title: 'Sunset Boulevard', year: 1950 },
      { title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', year: 1964 },
      { title: 'The Great Dictator', year: 1940 },
      { title: 'Cinema Paradiso', year: 1988 },
      { title: 'The Lives of Others', year: 2006 },
      { title: 'Grave of the Fireflies', year: 1988 },
      { title: 'Paths of Glory', year: 1957 },
      { title: 'Django Unchained', year: 2012 },
      { title: 'The Shining', year: 1980 },
      { title: 'WALL·E', year: 2008 },
      { title: 'American Beauty', year: 1999 },
      { title: 'The Dark Knight Rises', year: 2012 },
      { title: 'Princess Mononoke', year: 1997 },
      { title: 'Aliens', year: 1986 },
      { title: 'Oldboy', year: 2003 },
      { title: 'Once Upon a Time in America', year: 1984 },
      { title: 'Witness for the Prosecution', year: 1957 },
      { title: 'Das Boot', year: 1981 },
      { title: 'Citizen Kane', year: 1941 },
      { title: 'North by Northwest', year: 1959 },
      { title: 'Vertigo', year: 1958 },
      { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
      { title: 'Reservoir Dogs', year: 1992 },
      { title: 'Braveheart', year: 1995 },
      { title: 'M', year: 1931 },
      { title: 'Requiem for a Dream', year: 2000 },
      { title: 'Amélie', year: 2001 },
      { title: 'A Clockwork Orange', year: 1971 },
      { title: 'Like Stars on Earth', year: 2007 },
      { title: 'Taxi Driver', year: 1976 },
      { title: 'Lawrence of Arabia', year: 1962 },
      { title: 'Double Indemnity', year: 1944 },
      { title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
      { title: 'Amadeus', year: 1984 },
      { title: 'To Kill a Mockingbird', year: 1962 },
      { title: 'Toy Story 3', year: 2010 },
      { title: 'Logan', year: 2017 },
      { title: 'Full Metal Jacket', year: 1987 },
      { title: 'Dangal', year: 2016 },
      { title: 'The Sting', year: 1973 },
      { title: '2001: A Space Odyssey', year: 1968 },
      { title: "Singin' in the Rain", year: 1952 },
      { title: 'Toy Story', year: 1995 },
      { title: 'Bicycle Thieves', year: 1948 },
      { title: 'The Kid', year: 1921 },
      { title: 'Inglourious Basterds', year: 2009 },
      { title: 'Snatch', year: 2000 },
      { title: '3 Idiots', year: 2009 },
      { title: 'Monty Python and the Holy Grail', year: 1975 },
    ];


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

    return (
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
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
                title="Pesanan"
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
                    Pilih Layanan
                  </Typography>
                </div>
                <div className={classes.field}>
                  <Grid
                    container
                    spacing={2}
                  >
                    {products.map((product, index) => (
                      <Grid
                        item
                        key={product.id}
                        lg={4}
                        md={6}
                        xs={12}
                        onClick={() => this.handleSelectOne(product.id, "selectedProducts")}
                      >
                        <ProductCard
                          image={product.imageUrl}
                          title={product.title}
                          secondary={"Harga Rp " + product.price}
                          checked={selectedProducts.indexOf(product.id) !== -1}
                        />
                      </Grid>
                    ))
                    }
                  </Grid>
                </div>

                <div className={classes.field}>
                  <Typography
                    className={classes.title}
                    variant="h4"
                  >
                    Isi Data Diri
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
                        label="Email"
                        margin="dense"
                        required
                        value={email}
                        variant="outlined"
                        type="email"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        className={classes.textField}
                        label="Password"
                        name="password"
                        margin="dense"
                        required
                        onChange={event =>
                          this.handleChange(event.target.value, 'password')
                        }
                        type="password"
                        value={password}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        className={classes.textField}
                        label="Confirm password"
                        name="passwordConfirm"
                        margin="dense"
                        required
                        onChange={event =>
                          this.handleChange(event.target.value, 'passwordConfirm')
                        }
                        type="password"
                        value={passwordConfirm}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>

                </div>



                <div className={classes.field}>

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checkedB}
                        onChange={event =>
                          this.handleChange(event, 'checkedB')
                        }
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label="Primary"
                  />
                </div>



                <div className={classes.field}>




                </div>



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
                    {users.map((user, index) => (
                      <Grid
                        item
                        key={user.id}
                        lg={3}
                        md={6}
                        sm={6}
                        xs={12}
                        onClick={() => this.handleChange(user.id, "selectedUsers")}
                      >
                        <ProductCard
                          image={user.avatarUrl}
                          title={user.name}
                          secondary={""}
                          checked={selectedUsers === user.id}
                        />
                      </Grid>
                    ))
                    }
                  </Grid>
                </div>
                <div className={classes.field}>
                  <Typography
                    className={classes.title}
                    variant="h4"
                  >
                    Pilih Tanggal Booking
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
                    Pilih Jam Booking
                  </Typography>
                </div>
                <div className={classes.field}>
                  {date ? (
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
                            onClick={() => this.handleChange(time, "selectedTimes")}
                          >
                            <BookingCard checked={selectedTimes == time} title={time} status={"Tersedia"} />
                          </Grid>
                        )
                      })
                      }
                    </Grid>
                  ) : (

                    <Typography
                      className={classes.title}
                      variant="body1"
                    >
                      Pilih tanggal terlebih dahulu
                    </Typography>
                  )}
                </div>
              </form>
            </PortletContent>
          </Portlet>

        </Grid>
        <Grid
          item
          md={4}
          xs={12}
        >
          <Portlet
            {...rest}
            className={rootClassName}
          >
            <PortletHeader>
              <PortletLabel
                title="Total Harga"
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
                          <ListItemSecondaryAction>
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() => this.handleSelectOne(product.id, "selectedProducts")}
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
                  onDayClick={this.handleDayClick}
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
                  <Typography variant="body1">Tidak ada tanggal/jam yang dipilih</Typography>
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
            <PortletFooter className={classes.portletFooter}>
              <Button
                color="primary"
                variant="contained"
                disabled={!selectedTimes || !selectedUsers || !selectedProducts.length}
              >
                Booking
              </Button>


            </PortletFooter>
          </Portlet>
        </Grid>
      </Grid>
    );
  }
}

Account.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default compose(
  withRouter, withStyles(styles))(Account);
