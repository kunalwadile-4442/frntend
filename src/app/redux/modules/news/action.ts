import { IInternalUserTypes, IInternalUserTypesRes } from "./types";

export const ActionTypes = {
  INTERNAL_USER_LIST: "INTERNAL_USER_LIST",
  ADD_INTERNAL_USER: "ADD_INTERNAL_USER",
  UPDATE_INTERNAL_USER: "UPDATE_INTERNAL_USER",
  DELETE_INTERNAL_USER: "DELETE_INTERNAL_USER",
  ADMIN_LOGOUT: "ADMIN_LOGOUT",

};

export const setInternalUserList = (payload: IInternalUserTypesRes) => ({
  type: ActionTypes.INTERNAL_USER_LIST,
  payload,
});

export const addInternalUser = (payload: IInternalUserTypes) => ({
  type: ActionTypes.ADD_INTERNAL_USER,
  payload,
});

export const updateInternalUser = (payload: IInternalUserTypes) => ({
  type: ActionTypes.UPDATE_INTERNAL_USER,
  payload,
});

export const deleteInternalUser = (payload: IInternalUserTypes) => ({
  type: ActionTypes.DELETE_INTERNAL_USER,
  payload,
});