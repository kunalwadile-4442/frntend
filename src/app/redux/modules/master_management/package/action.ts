// actions.ts

import { IPackageListTypes, IPackageRes } from "./types";

export const ActionTypes = {
  PACKAGE_LIST: "PACKAGE_LIST",
  ADD_PACKAGE: "ADD_PACKAGE",
  UPDATE_PACKAGE: "UPDATE_PACKAGE",
  DELETE_PACKAGE: "DELETE_PACKAGE",
};

export const setPackageList = (payload: IPackageRes) => ({
  type: ActionTypes.PACKAGE_LIST,
  payload,
});

export const addPackage = (payload: IPackageListTypes) => ({
  type: ActionTypes.ADD_PACKAGE,
  payload,
});

export const updatePackage = (payload: IPackageListTypes) => ({
  type: ActionTypes.UPDATE_PACKAGE,
  payload,
});

export const deletePackage = (payload: IPackageListTypes) => ({
  type: ActionTypes.DELETE_PACKAGE,
  payload,
});
