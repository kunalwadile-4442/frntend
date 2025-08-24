import { IDistrictTypes, IDistrictRes } from "./types";

export const ActionTypes = {
  DISTRICT_LIST: "DISTRICT_LIST",
  ADD_DISTRICT: "ADD_DISTRICT",
  UPDATE_DISTRICT: "UPDATE_DISTRICT",
  DELETE_DISTRICT: "DELETE_DISTRICT",
};

export const setDistrictList = (payload: IDistrictRes) => ({
  type: ActionTypes.DISTRICT_LIST,
  payload,
});

export const addDistrict = (payload: IDistrictTypes) => ({
  type: ActionTypes.ADD_DISTRICT,
  payload,
});

export const updateDistrict = (payload: IDistrictTypes) => ({
  type: ActionTypes.UPDATE_DISTRICT,
  payload,
});

export const deleteDistrict = (payload: IDistrictTypes) => ({
  type: ActionTypes.DELETE_DISTRICT,
  payload,
});
