// actions.ts

import { IPGCourseListTypes, IPGCourseRes } from "./types";

export const ActionTypes = {
  PGCOURSE_LIST: "PGCOURSE_LIST",
  ADD_PGCOURSE: "ADD_PGCOURSE",
  UPDATE_PGCOURSE: "UPDATE_PGCOURSE",
  DELETE_PGCOURSE: "DELETE_PGCOURSE",
};

export const setPGCourseList = (payload: IPGCourseRes) => ({
  type: ActionTypes.PGCOURSE_LIST,
  payload,
});

export const addPGCourse = (payload: IPGCourseListTypes) => ({
  type: ActionTypes.ADD_PGCOURSE,
  payload,
});

export const updatePGCourse = (payload: IPGCourseListTypes) => ({
  type: ActionTypes.UPDATE_PGCOURSE,
  payload,
});

export const deletePGCourse = (payload: IPGCourseListTypes) => ({
  type: ActionTypes.DELETE_PGCOURSE,
  payload,
});
