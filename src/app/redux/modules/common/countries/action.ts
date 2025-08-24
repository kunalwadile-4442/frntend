/* eslint-disable @typescript-eslint/no-unused-vars */
import { ICountriesTypesRes, ICountriesTypes, IStateTypes, ICityTypes } from "./types";

export const ActionTypes = {
  SET_STORE_COUNTRY_LIST: "SET_STORE_COUNTRY_LIST",
  SET_STORE_STATE_LIST: "SET_STORE_STATE_LIST",
  SET_STORE_CITY_LIST: "SET_STORE_CITY_LIST",
  ADMIN_LOGOUT: "ADMIN_LOGOUT",
  SET_STORE_CITY_SELECT_STATE_LIST: "SET_STORE_CITY_SELECT_STATE_LIST",
  SET_STORE_STATE_SELECT_COUNTRY_LIST: "SET_STORE_STATE_SELECT_COUNTRY_LIST",

};

export const setStoreCountryList = (payload: ICountriesTypes) => ({
  type: ActionTypes.SET_STORE_COUNTRY_LIST,
  payload,
});
export const setStoreStateList = (payload: IStateTypes) => ({
  type: ActionTypes.SET_STORE_STATE_LIST,
  payload,
});
export const setStoreCityList = (payload: ICityTypes) => ({
  type: ActionTypes.SET_STORE_CITY_LIST,
  payload,
});
export const setStoreCitySelectStateList = (payload: string|number) => ({
  type: ActionTypes.SET_STORE_CITY_SELECT_STATE_LIST,
  payload,
});
export const setStoreStateSelectCountryList = (payload: string|number) => ({
  type: ActionTypes.SET_STORE_STATE_SELECT_COUNTRY_LIST,
  payload,
});