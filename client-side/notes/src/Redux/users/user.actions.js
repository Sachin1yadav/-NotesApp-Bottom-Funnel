import axios from "axios";

import {
  LOGIN_USER_ERROR,
  LOGIN_USER_LOADING,
  LOGIN_USER_SUCCESS,
  LOGOUT,
} from "./user.types";

export const getUser = (obj) => async (dispatch) => {
  dispatch({ type: LOGIN_USER_LOADING });
  try {
    let data = await axios(
      "https://lively-bear-galoshes.cyclic.app/users/login",
      {
        method: "post",
        data: obj,
      }
    );

    let { token } = data.data;
    if (token) {
      dispatch({ type: LOGIN_USER_SUCCESS, payload: token });
    } else {
      alert("somting went wrong");
      dispatch({ type: LOGIN_USER_ERROR });
    }
  } catch (error) {
    dispatch({ type: LOGIN_USER_ERROR });
  }
};


export const userLogout=()=>(dispatch)=>{
  dispatch({type:LOGOUT})
}