import { json } from "react-router-dom";
import {
  LOGIN_USER_ERROR,
  LOGIN_USER_LOADING,
  LOGIN_USER_SUCCESS,
  LOGOUT,
} from "./user.types";
const token = JSON.parse(localStorage.getItem("token"));
const initialState = {
  token: token || null,
  auth: token ? true : false,
  loading: false,
  error: false,
};

export default function userReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_USER_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }

    case LOGIN_USER_SUCCESS: {
      localStorage.setItem("token", JSON.stringify(payload));
      return {
        ...state,
        loading: false,
        error: false,
        token: payload,
        auth: true,
      };
    }

    case LOGIN_USER_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    case LOGOUT: {
      localStorage.removeItem("token");
      return initialState;
    }

    default: {
      return state;
    }
  }
}
