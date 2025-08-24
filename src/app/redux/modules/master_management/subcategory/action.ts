// actions.ts

import { ISubCategoryListTypes, ISubCategoryRes } from "./types";

export const ActionTypes = {
  SUB_CATEGORY_LIST: "SUB_CATEGORY_LIST",
  ADD_SUB_CATEGORY: "ADD_SUB_CATEGORY",
  UPDATE_SUB_CATEGORY: "UPDATE_SUB_CATEGORY",
  DELETE_SUB_CATEGORY: "DELETE_SUB_CATEGORY",
};

export const setSubCategoryList = (payload: ISubCategoryRes) => ({
  type: ActionTypes.SUB_CATEGORY_LIST,
  payload,
});

export const addSubCategory = (payload: ISubCategoryListTypes) => ({
  type: ActionTypes.ADD_SUB_CATEGORY,
  payload,
});

export const updateSubCategory = (payload: ISubCategoryListTypes) => ({
  type: ActionTypes.UPDATE_SUB_CATEGORY,
  payload,
});

export const deleteSubCategory = (payload: ISubCategoryListTypes) => ({
  type: ActionTypes.DELETE_SUB_CATEGORY,
  payload,
});
