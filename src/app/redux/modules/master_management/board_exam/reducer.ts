import { ActionTypes } from "./action";
import { IBoardExamTypes, IBoardExamRes } from "./types";

interface BoardExamState extends IBoardExamRes {}

const initialState: BoardExamState = {
  items: [],
  totalCount: 0,
  optionList: [],
};

const boardExamReducer = (state = initialState, action: any): BoardExamState => {
  switch (action.type) {
    case ActionTypes.BOARD_EXAM_LIST:
      return { ...state, ...action.payload };

    case ActionTypes.ADD_BOARD_EXAM:
      return { ...state, items: [action.payload, ...state.items] };

    case ActionTypes.UPDATE_BOARD_EXAM:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case ActionTypes.DELETE_BOARD_EXAM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };

    default:
      return state;
  }
};

export default boardExamReducer;
