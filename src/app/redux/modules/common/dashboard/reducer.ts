
import { ActionTypes } from "./action";
import { IDashboardData } from "./types";


const initialState: IDashboardData = {
  InventoryChanges: {
    ADD: Array(12).fill(0),
    SUB: Array(12).fill(0)
  },
  ISalesChanges: {
    total: Array(12).fill(0),
    balance: Array(12).fill(0),
  }
};

const dashboardReducers = (state: IDashboardData = initialState, action): IDashboardData => {
  switch (action.type) {
    case ActionTypes.SET_DASHBOARD_DATA:
      return {
        ...state,
        InventoryChanges: action?.payload,
      };
    case ActionTypes.SET_DASHBOARD_DATA1:
      return {
        ...state,
        ISalesChanges: action?.payload
      };
    default:
      return state;
  }
};

export default dashboardReducers;
