
import { ActionTypes } from "./action";
import { ICategoryListTypes, ICategoryRes  } from "./types";

interface CategoryState extends ICategoryRes {}

const initialState: CategoryState = {
  items: [],
  totalCount: 0,
  optionList: [],
};

const CategoryReducer = (state = initialState, action: any): CategoryState => {
  switch (action.type) {
    case ActionTypes.CATEGORY_LIST:
      return { ...state, ...action.payload };

    case ActionTypes.ADD_CATEGORY:
      return { ...state, items: [action.payload, ...state.items] };

    case ActionTypes.UPDATE_CATEGORY:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case ActionTypes.DELETE_CATEGORY:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };

    default:
      return state;
  }
};

export default CategoryReducer;
