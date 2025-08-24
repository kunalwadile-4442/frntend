import { ICollegeListTypes, ICollegeListTypesRes } from "./types";

export const ActionTypes = {
  SET_COLLEGE_LIST: "SET_COLLEGE_LIST",
  SET_ADD_COLLEGE: "SET_ADD_COLLEGE",
  SET_UPDATE_COLLEGE: "SET_UPDATE_COLLEGE",
};

export const setCollegeList = (payload: ICollegeListTypesRes) => ({
  type: ActionTypes.SET_COLLEGE_LIST,
  payload,
});

export const addCollege = (payload: ICollegeListTypes) => ({
  type: ActionTypes.SET_ADD_COLLEGE,
  payload,
});

export const updateCollege = (payload: ICollegeListTypes) => ({
  type: ActionTypes.SET_UPDATE_COLLEGE,
  payload,
});
