import { loginFailure, loginStart, loginSuccess, logout } from "./userRedux";

import { reset as resetCart } from "./cartRedux";

import { publicRequest } from "../requestMethod";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

// export const logoutMethod = (dispatch) => {
//     try {
//         localStorage.removeItem('persist:root')
//         dispatch(logout())
//     } catch (err) {
//         console.log(err)
//     }
// }
