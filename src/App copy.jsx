import moment from "moment";
import localization from "moment/locale/id";

import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Test from "./pages/Test";
import "./styles.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Redirect,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { logoutMethod } from "./redux/userRedux";
import Transactions from "./pages/Transactions";
import TransactionDetail from "./pages/TransactionDetail";

const App = () => {
  moment().locale("id", localization);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = user.currentUser?.token;
    if (token) {
      const decodedToken = jwt_decode(token.split(" ")[1]);
      const dateNow = new Date().getTime();
      const dateExp = decodedToken.exp * 1000;

      const timediff = (dateExp - dateNow) / 1000;
      if (dateExp < dateNow) {
        logoutMethod(dispatch);
      } else {
        if (timediff / 1000 <= 15 * 60) {
          setTimeout(() => {
            logoutMethod(dispatch);
          }, timediff * 1000);
        }
      }
    }
  }, [user]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/" element={<UserRoute />}>
          <Route path="transactions" element={<Outlet />}>
            <Route index element={<Transactions />} />
            <Route path="detail/:orederId" element={<TransactionDetail />} />
          </Route>
        </Route>

        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/products/" element={<ProductList />} />
        <Route path="/product/:slug" element={<Product />} />
        <Route
          path="/cart"
          element={
            user.currentUser && !user.error ? (
              <Cart />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        {/* <Route
          path="/transactions"
          element={
            user.currentUser && !user.error ? (
              <Transactions />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/transactions/detail/:orderId"
          element={<TransactionDetail />}
        /> */}

        <Route
          path="/login"
          element={
            user.currentUser && !user.error ? (
              window.history.state?.usr ? (
                <Navigate to={window.history.state.usr} />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
      </Routes>
    </BrowserRouter>
  );
};

function UserRoute() {
  const user = useSelector((state) => state.user);

  return user.currentUser && !user.error ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
  // if (user.currentUser && !user.error){
  //   return <Outlet />;
  // } else{
  //   re
  // }
}

export default App;
