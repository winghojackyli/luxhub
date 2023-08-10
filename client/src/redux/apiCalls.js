import { publicRequest, userRequest } from "../requestMethods";
import { resetStore } from "./store";
import {
  loginStart,
  loginFailure,
  loginSuccess,
  logoutSuccess,
  updateStart,
  updateSuccess,
  updateFailure,
} from "./userRedux";

const currentUser = JSON.parse(
  localStorage.getItem("persist:root")
)?.currentUser;

const TOKEN = currentUser && JSON.parse(currentUser)?.accessToken;

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess({ ...res.data, accessToken: TOKEN }));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const logout = (dispatch) => {
  dispatch(logoutSuccess());
  resetStore();
};

export const updateState = async (dispatch, id) => {
  dispatch(updateStart());
  try {
    const res = await userRequest.get(`/users/find/${id}`);
    dispatch(updateSuccess({ ...res.data, accessToken: TOKEN }));
  } catch (err) {
    dispatch(updateFailure());
  }
};
