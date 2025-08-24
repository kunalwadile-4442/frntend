import { ActionTypes } from "./action";
import { IPassingYearTypes, IPassingYearRes } from "./types";

interface PassingYearState extends IPassingYearRes {}

const initialState: PassingYearState = {
  items: [],
  totalCount: 0,
  optionList: [],
};

const passingYearReducer = (state = initialState, action: any): PassingYearState => {
  switch (action.type) {
    case ActionTypes.PASSING_YEAR_LIST:
      return { ...state, ...action.payload };

    case ActionTypes.ADD_PASSING_YEAR:
      return { ...state, items: [action.payload, ...state.items] };

    case ActionTypes.UPDATE_PASSING_YEAR:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case ActionTypes.DELETE_PASSING_YEAR:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };

    default:
      return state;
  }
};

export default passingYearReducer;
