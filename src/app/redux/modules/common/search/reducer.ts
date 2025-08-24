/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActionTypes } from "./action";
import { ISearchRes } from "./types";

const initialState: ISearchRes = {
  searchList: {
    optionsList: [],
    items: [],
    totalCount: 0,
  },
  searchDetails: null,
}

const searchReducer = (state: ISearchRes = initialState, action): ISearchRes => {
  switch (action?.type) {
    case ActionTypes.SET_SEARCH_LIST: {
      const optionsList = action?.payload?.items?.map((item, index) => ({
        ...item,
        label: item?.name,
        value: item?.id
      }));
      return {
        ...state,
        searchList: {
          ...action?.payload,
          optionsList: optionsList,
        },
      };
    }
   
    default:
      return state;
  }
};

export default searchReducer;
