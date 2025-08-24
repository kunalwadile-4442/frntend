import { ActionTypes } from "./action";
import { ICollegeTypes, ICollegeTypeRes } from "./types";

interface CollegeState extends ICollegeTypeRes {}

const initialState: CollegeState = {
  items: [],
  totalCount: 0,
  optionList: [],
};

const collegeTypeReducer = (state = initialState, action: any): CollegeState => {
  switch (action.type) {
    case ActionTypes.COLLEGE_TYPE_LIST:
      return { ...state, ...action.payload };

    case ActionTypes.ADD_COLLEGE_TYPE:
      return { ...state, items: [action.payload, ...state.items] };

    case ActionTypes.UPDATE_COLLEGE_TYPE:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case ActionTypes.DELETE_COLLEGE_TYPE:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };

    default:
      return state;
  }
};

export default collegeTypeReducer;
