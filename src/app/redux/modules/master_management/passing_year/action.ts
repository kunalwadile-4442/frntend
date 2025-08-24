import { IPassingYearTypes, IPassingYearRes } from "./types";

export const ActionTypes = {
  PASSING_YEAR_LIST: "PASSING_YEAR_LIST",
  ADD_PASSING_YEAR: "ADD_PASSING_YEAR",
  UPDATE_PASSING_YEAR: "UPDATE_PASSING_YEAR",
  DELETE_PASSING_YEAR: "DELETE_PASSING_YEAR",
};

export const setPassingYearList = (payload: IPassingYearRes) => ({
  type: ActionTypes.PASSING_YEAR_LIST,
  payload,
});

export const addPassingYear = (payload: IPassingYearTypes) => ({
  type: ActionTypes.ADD_PASSING_YEAR,
  payload,
});

export const updatePassingYear = (payload: IPassingYearTypes) => ({
  type: ActionTypes.UPDATE_PASSING_YEAR,
  payload,
});

export const deletePassingYear = (payload: IPassingYearTypes) => ({
  type: ActionTypes.DELETE_PASSING_YEAR,
  payload,
});
