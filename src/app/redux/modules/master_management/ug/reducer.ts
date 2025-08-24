
import { ActionTypes } from "./action";
import { IUGCourseListTypes, IUGCourseRes  } from "./types";

interface UGCourseState extends IUGCourseRes {}

const initialState: UGCourseState = {
  items: [],
  totalCount: 0,
  optionList: [],
};

const ugcourseReducer = (state = initialState, action: any): UGCourseState => {
  switch (action.type) {
    case ActionTypes.UGCOURSE_LIST:
      return { ...state, ...action.payload };

    case ActionTypes.ADD_UGCOURSE:
      return { ...state, items: [action.payload, ...state.items] };

    case ActionTypes.UPDATE_UGCOURSE:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case ActionTypes.DELETE_UGCOURSE:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };

    default:
      return state;
  }
};

export default ugcourseReducer;
