
import { ActionTypes } from "./action";
import { IPGCourseListTypes, IPGCourseRes  } from "./types";

interface PGCourseState extends IPGCourseRes {}

const initialState: PGCourseState = {
  items: [],
  totalCount: 0,
  optionList: [],
};

const PGcourseReducer = (state = initialState, action: any): PGCourseState => {
  switch (action.type) {
    case ActionTypes.PGCOURSE_LIST:
      return { ...state, ...action.payload };

    case ActionTypes.ADD_PGCOURSE:
      return { ...state, items: [action.payload, ...state.items] };

    case ActionTypes.UPDATE_PGCOURSE:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case ActionTypes.DELETE_PGCOURSE:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };

    default:
      return state;
  }
};

export default PGcourseReducer;
