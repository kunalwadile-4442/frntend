import { ISearchListType } from "./types";

export const ActionTypes = {
    SET_SEARCH_LIST:"SET_SEARCH_LIST",
};

export const setSearchList = (payload: ISearchListType) => ({
    type: ActionTypes.SET_SEARCH_LIST,
    payload,
  });