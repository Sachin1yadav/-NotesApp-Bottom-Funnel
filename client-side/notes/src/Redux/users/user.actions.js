import axios from "axios";
import { BASE_URL } from "../../constants/config";
import {
  LOGIN_USER_ERROR,
  LOGIN_USER_LOADING,
  LOGIN_USER_SUCCESS,
} from "./user.types";

export const getUser = (obj) => async (distpatch) => {
  distpatch({ type: LOGIN_USER_LOADING });
  try {
    let data = await axios("https://lively-bear-galoshes.cyclic.app/users/login", {
      method: "post",
      data: obj,
    });

    let { token } = data.data;
    if (token) {
      distpatch({ type: LOGIN_USER_SUCCESS, payload: token });
    } else {
      alert("somting went wrong");
      distpatch({ type: LOGIN_USER_ERROR });
    }
  } catch (error) {
    distpatch({ type: LOGIN_USER_ERROR });
  }
};
