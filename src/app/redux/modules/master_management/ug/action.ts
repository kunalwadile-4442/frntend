// actions.ts

import { IUGCourseListTypes, IUGCourseRes } from "./types";

export const ActionTypes = {
  UGCOURSE_LIST: "UGCOURSE_LIST",
  ADD_UGCOURSE: "ADD_UGCOURSE",
  UPDATE_UGCOURSE: "UPDATE_UGCOURSE",
  DELETE_UGCOURSE: "DELETE_UGCOURSE",
};

export const setUGCourseList = (payload: IUGCourseRes) => ({
  type: ActionTypes.UGCOURSE_LIST,
  payload,
});

export const addUGCourse = (payload: IUGCourseListTypes) => ({
  type: ActionTypes.ADD_UGCOURSE,
  payload,
});

export const updateUGCourse = (payload: IUGCourseListTypes) => ({
  type: ActionTypes.UPDATE_UGCOURSE,
  payload,
});

export const deleteUGCourse = (payload: IUGCourseListTypes) => ({
  type: ActionTypes.DELETE_UGCOURSE,
  payload,
});
