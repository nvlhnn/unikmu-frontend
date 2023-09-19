import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter,
  Routes,
  Route,
  Redirect,
  Navigate,
  Outlet,
} from "react-router-dom";

import Transactions from "./pages/Transactions";
import TransactionDetail from "./pages/TransactionDetail";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Test from "./pages/Test";

const MainRoute = () => {
  const user = useSelector((state) => state.user);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/test" element={<Test />} />

      {/* user route */}
      <Route path="/" element={<UserRoute />}>
        <Route path="transactions" element={<Outlet />}>
          <Route index element={<Transactions />} />
          <Route path="detail/:orderId" element={<TransactionDetail />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
      </Route>

      {/* public route */}
      <Route path="/" element={<Outlet />}>
        <Route path="products" element={<Outlet />}>
          <Route index element={<ProductList />} />
          <Route path=":category" element={<ProductList />} />
          <Route path="detail/:slug" element={<Product />} />
        </Route>
      </Route>

      {/* non auth route */}
      <Route path="/" element={<NonAuth />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
};

function UserRoute() {
  const user = useSelector((state) => state.user);
  if (user.currentUser && !user.error) {
    if (window.history.state?.usr) {
      return <Navigate to={window.history.state.usr} />;
    } else {
      return <Outlet />;
    }
  } else {
    return <Navigate to="/login" />;
  }
}

function NonAuth() {
  const user = useSelector((state) => state.user);
  if (user.currentUser && !user.error) {
    if (window.history.state?.usr) {
      return <Navigate to={window.history.state.usr} />;
    } else {
      return <Navigate to="/" />;
    }
  } else {
    return <Outlet />;
  }
  // return user.currentUser && !user.error ? <Navigate to="/" /> : <Outlet />;
}

export default MainRoute;
