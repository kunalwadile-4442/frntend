import { ICollegeTypes, ICollegeTypeRes } from "./types";

export const ActionTypes = {
  COLLEGE_TYPE_LIST: "COLLEGE_TYPE_LIST",
  ADD_COLLEGE_TYPE: "ADD_COLLEGE_TYPE",
  UPDATE_COLLEGE_TYPE: "UPDATE_COLLEGE_TYPE",
  DELETE_COLLEGE_TYPE: "DELETE_COLLEGE_TYPE",
};

export const setCollegeTypeList = (payload: ICollegeTypeRes) => ({
  type: ActionTypes.COLLEGE_TYPE_LIST,
  payload,
});

export const addCollegeType = (payload: ICollegeTypeRes) => ({
  type: ActionTypes.ADD_COLLEGE_TYPE,
  payload,
});

export const updateCollegeType = (payload: ICollegeTypeRes) => ({
  type: ActionTypes.UPDATE_COLLEGE_TYPE,
  payload,
});

export const deleteCollegeType = (payload: ICollegeTypeRes) => ({
  type: ActionTypes.DELETE_COLLEGE_TYPE,
  payload,
});
