import moment from "moment";
import localization from "moment/locale/id";

import "./styles.css";
import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { logoutMethod } from "./redux/userRedux";
import MainRoute from "./Routes";

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
    <BrowserRouter basename="/" forceRefresh>
      <MainRoute />
    </BrowserRouter>
  );
};

export default App;
