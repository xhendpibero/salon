import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ProtectedRoute from 'ProtectedRoute';

// Views
import Dashboard from './views/Dashboard';
import ProductList from './views/ProductList';
import UserList from './views/UserList';
import CustomerList from './views/CustomerList';
import Customer from './views/Customer';
import OrderList from './views/OrderList';
import AddOrder from './views/AddOrder';
import Payment from './views/Payment';
import PaymentProof from './views/PaymentProof';
import PaymentDetail from './views/PaymentDetail';
import Account from './views/Account';
import Employee from './views/Employee';
import Product from './views/Product';
import Settings from './views/Settings';
import Report from './views/Report';
import About from './views/About';
import SignUp from './views/SignUp';
import SignIn from './views/SignIn';
import UnderDevelopment from './views/UnderDevelopment';
import NotFound from './views/NotFound';

export default class Routes extends Component {
  render() {
    const redirectPath = JSON.parse(localStorage.getItem("isAuthenticated")) ? "/dashboard" : "/sign-in";
    return <Switch>
      <Redirect
        exact
        from="/"
        to={redirectPath}
      />
      <ProtectedRoute
        component={Dashboard}
        exact
        path="/dashboard"
      />
      <ProtectedRoute
        component={UserList}
        exact
        path="/users"
      />
      <ProtectedRoute
        component={Employee}
        exact
        path="/users/employee"
      />
      <ProtectedRoute
        component={OrderList}
        exact
        path="/orders"
      />
      <ProtectedRoute
        component={AddOrder}
        exact
        path="/orders/add"
      />
      <ProtectedRoute
        component={Payment}
        exact
        path="/orders/payment"
      />
      <ProtectedRoute
        component={Report}
        exact
        path="/report/orders"
      />
      <ProtectedRoute
        component={PaymentProof}
        exact
        path="/orders/payment/proof"
      />
      <ProtectedRoute
        component={PaymentDetail}
        exact
        path="/orders/detail"
      />
      <ProtectedRoute
        component={CustomerList}
        exact
        path="/customers"
      />
      <ProtectedRoute
        component={Customer}
        exact
        path="/customers/s"
      />
      <ProtectedRoute
        component={ProductList}
        exact
        path="/products"
      />
      <ProtectedRoute
        component={Product}
        exact
        path="/products/service"
      />
      <ProtectedRoute
        component={Account}
        exact
        path="/account"
      />
      <ProtectedRoute
        component={Settings}
        exact
        path="/settings"
      />
      <ProtectedRoute
        component={About}
        exact
        path="/about"
      />
      <Route
        component={UnderDevelopment}
        exact
        path="/under-development"
      />
      <Route
        component={NotFound}
        exact
        path="/not-found"
      />
      <Route
        component={SignUp}
        exact
        path="/sign-up"
      />
      <Route
        component={SignIn}
        exact
        path="/sign-in"
      />
      <Redirect to="/not-found" />
    </Switch>
  }
}
