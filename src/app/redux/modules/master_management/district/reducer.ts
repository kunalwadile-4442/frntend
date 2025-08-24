import { ActionTypes } from "./action";
import { IDistrictTypes, IDistrictRes } from "./types";

interface DistrictState extends IDistrictRes {}

const initialState: DistrictState = {
  items: [],
  totalCount: 0,
  optionList: [],
};

const districtReducer = (state = initialState, action: any): DistrictState => {
  switch (action.type) {
    case ActionTypes.DISTRICT_LIST:
      return { ...state, ...action.payload };

    case ActionTypes.ADD_DISTRICT:
      return { ...state, items: [action.payload, ...state.items] };

    case ActionTypes.UPDATE_DISTRICT:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case ActionTypes.DELETE_DISTRICT:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };

    default:
      return state;
  }
};

export default districtReducer;
