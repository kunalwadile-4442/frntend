import { ICustomerListTypes, ICustomers } from "./types";

export const ActionTypes = {
  SET_STORE_CUSTOMERS_LIST: "SET_STORE_CUSTOMERS_LIST",
  SET_STORE_CUSTOMERS_DETAILS:"SET_STORE_CUSTOMERS_DETAILS",
  SET_STORE_CUSTOMER_PROJECT_LIST:"SET_STORE_CUSTOMER_PROJECT_LIST",
  UPDATE_CUSTOMER:"UPDATE_CUSTOMER",

};
export const setStoreCustomerProjectList = (payload: {id:string, data?:ICustomerListTypes}) => ({
  type: ActionTypes.SET_STORE_CUSTOMER_PROJECT_LIST,
  payload,
});

export const setUpdateStatus = (payload: ICustomers) => ({
  type: ActionTypes.UPDATE_CUSTOMER,
  payload,
});
export const setStoreCustomersList = (payload: ICustomerListTypes) => ({
  type: ActionTypes.SET_STORE_CUSTOMERS_LIST,
  payload,
});
export const setStoreCustomersDetails = (payload: any) => ({
  type: ActionTypes.SET_STORE_CUSTOMERS_DETAILS,
  payload,
});