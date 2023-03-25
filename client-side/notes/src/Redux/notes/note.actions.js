import axios from "axios";
import { useSelector } from "react-redux";
 import { store } from "../store";
import { LOGOUT } from "../users/user.types";
import {
  CREATE_NOTES_ERROR,
  CREATE_NOTES_LOADING,
  CREATE_NOTES_SUCCESS,
  DELETE_NOTES_ERROR,
  DELETE_NOTES_LOADING,
  DELETE_NOTES_SUCCESS,
  GET_NOTES_ERROR,
  GET_NOTES_LOADING,
  GET_NOTES_SUCCESS,
  UPDATE_NOTES_ERROR,
  UPDATE_NOTES_LOADING,
  UPDATE_NOTES_SUCCESS,
} from "./note.types";
const token = JSON.parse(localStorage.getItem("token"));

export const getNotes = () => async (dispatch) => {
  dispatch({ type: GET_NOTES_LOADING });
  try {
    const res = await axios.get(
      "https://lively-bear-galoshes.cyclic.app/notes",
      {
        headers: {
         
          Authorization: token,
        },
      }
    );
    let data = res.data;
    if (data) {
      dispatch({ type: GET_NOTES_SUCCESS, payload: data });
    } else {
      dispatch({ type: GET_NOTES_ERROR });
    }
  } catch (error) {
    dispatch({ type: GET_NOTES_ERROR });
  }
};

export const createNotes = (obj) => async (dispatch) => {
  dispatch({ type: CREATE_NOTES_LOADING });
  try {
    const res = await axios(
      "https://lively-bear-galoshes.cyclic.app/notes/add",
      {
        method: "post",
        data: obj,
        headers: {
          Authorization: token,
        },
      }
    );

    const data = res.data;
    console.log("notes added");
    if (data) {
      dispatch({ type: CREATE_NOTES_SUCCESS });
      dispatch(getNotes());
    } else {
      dispatch({ type: CREATE_NOTES_ERROR });
    }
  } catch (error) {
    dispatch({ type: CREATE_NOTES_ERROR });
  }
};

export const deleteNotes = (id) => async (dispatch) => {
  dispatch({ type: DELETE_NOTES_LOADING });
  try {
    const res = await axios.delete(
      `https://lively-bear-galoshes.cyclic.app/notes/delete/${id}`,
      {
         headers: {
          Authorization: token,
        },
      }
    );

    const data = res.data;

    if (data) {
      dispatch({ type: DELETE_NOTES_SUCCESS });
      dispatch(getNotes());
    } else {
      dispatch({ type: DELETE_NOTES_ERROR });
    }
  } catch (error) {
    dispatch({ type: DELETE_NOTES_ERROR });
  }
};

export const updateNotes = (id, obj) => async (dispatch) => {
  dispatch({ type: UPDATE_NOTES_LOADING });
  try {
    const res = await axios(
      `https://lively-bear-galoshes.cyclic.app/notes/update/${id}`,
      {
        method: "patch",
        data: obj,
        headers: {
          Authorization: token,
        },
      }
    );

    const data = res.data;
    console.log("note updated");
    if (data) {
      dispatch({ type: UPDATE_NOTES_SUCCESS });
      dispatch(getNotes());
    } else {
      dispatch({ type: UPDATE_NOTES_ERROR });
    }
  } catch (error) {
    dispatch({ type: UPDATE_NOTES_ERROR });
  }
};
