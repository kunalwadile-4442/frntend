import { ActionTypes } from "./action";
import { IPackageListTypes, IPackageRes } from "./types";

interface PackageState extends IPackageRes {}

const initialState: PackageState = {
  items: [],
  totalCount: 0,
  optionList: [],
};

const packageReducer = (state = initialState, action: any): PackageState => {
  switch (action.type) {
    case ActionTypes.PACKAGE_LIST:
      return { ...state, ...action.payload };

    case ActionTypes.ADD_PACKAGE:
      return { ...state, items: [action.payload, ...state.items] };

    case ActionTypes.UPDATE_PACKAGE:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case ActionTypes.DELETE_PACKAGE:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };

    default:
      return state;
  }
};

export default packageReducer;
