import { IDashboardData } from "./types";

export const ActionTypes = {
  SET_DASHBOARD_DATA: "SET_DASHBOARD_DATA",
  SET_DASHBOARD_DATA1: "SET_DASHBOARD_DATA1",
  SET_ERRORS: "SET_ERRORS",
};

export const setDashboardData = (payload: IDashboardData) => ({
  type: ActionTypes.SET_DASHBOARD_DATA,
  payload
});

export const setDashboardData1 = (payload: IDashboardData) => ({
  type: ActionTypes.SET_DASHBOARD_DATA1,
  payload
});

export const setErrors = (errors) => ({
  type: ActionTypes.SET_ERRORS,
  payload: errors
}); 