
import { ActionTypes } from "./action";
import { ISubCategoryListTypes, ISubCategoryRes  } from "./types";

interface SubCategoryState extends ISubCategoryRes {}

const initialState: SubCategoryState = {
  items: [],
  totalCount: 0,
  optionList: [],
};

const CategoryReducer = (state = initialState, action: any): SubCategoryState => {
  switch (action.type) {
    case ActionTypes.SUB_CATEGORY_LIST:
      return { ...state, ...action.payload };

    case ActionTypes.ADD_SUB_CATEGORY:
      return { ...state, items: [action.payload, ...state.items] };

    case ActionTypes.UPDATE_SUB_CATEGORY:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case ActionTypes.DELETE_SUB_CATEGORY:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };

    default:
      return state;
  }
};

export default CategoryReducer;
