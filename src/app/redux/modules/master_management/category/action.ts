// actions.ts

import { ICategoryListTypes, ICategoryRes } from "./types";

export const ActionTypes = {
  CATEGORY_LIST: "CATEGORY_LIST",
  ADD_CATEGORY: "ADD_CATEGORY",
  UPDATE_CATEGORY: "UPDATE_CATEGORY",
  DELETE_CATEGORY: "DELETE_CATEGORY",
};

export const setCategoryList = (payload: ICategoryRes) => ({
  type: ActionTypes.CATEGORY_LIST,
  payload,
});

export const addCategory = (payload: ICategoryListTypes) => ({
  type: ActionTypes.ADD_CATEGORY,
  payload,
});

export const updateCategory = (payload: ICategoryListTypes) => ({
  type: ActionTypes.UPDATE_CATEGORY,
  payload,
});

export const deleteCategory = (payload: ICategoryListTypes) => ({
  type: ActionTypes.DELETE_CATEGORY,
  payload,
});
