/* eslint-disable @typescript-eslint/no-unused-vars */
import { IUserRes } from "./types";

export const ActionTypes = {
  AUTH_DATA: "AUTH_DATA",
  IS_LOGIN: "IS_LOGIN",
  ADMIN_LOGOUT: "ADMIN_LOGOUT",
  SET_UPDATE_USER_LOGIN: "SET_UPDATE_USER_LOGIN",
  SET_UPDATE_USER_PERMISSION: "SET_UPDATE_USER_PERMISSION",

};

export const setAuthData = (payload: IUserRes) => ({
  type: ActionTypes.AUTH_DATA,
  payload,
});

export const setLogin = (payload: boolean) => ({
  type: ActionTypes.IS_LOGIN,
  payload,
});

export const setUpdateUserLogin = (payload: boolean) => ({
  type: ActionTypes.SET_UPDATE_USER_LOGIN,
  payload,
});
export const setUpdateUserPermission = (payload: any) => ({
  type: ActionTypes.SET_UPDATE_USER_PERMISSION,
  payload,
});