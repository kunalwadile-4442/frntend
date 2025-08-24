/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActionTypes } from './action';
import { ICountriesTypesRes } from "./types";


const initialState: ICountriesTypesRes = {
  country_list:{
    serializedItems: [],
    totalCount: 0,
    optionList: [],
  },
  state_list:{
    serializedItems: [],
    totalCount: 0,
    optionList: [],
  },
  city_list:{
    serializedItems: [],
    totalCount: 0,
    optionList: [],
  },
};

const countriesReducers = (state: ICountriesTypesRes = initialState, action): ICountriesTypesRes => {
  switch (action?.type) {
    case ActionTypes.SET_STORE_COUNTRY_LIST:{
      const optionList = action?.payload?.serializedItems?.map((item: any, index: any)=>{
        return{
          ...item,
          value: item.name,
          label: item.name,
        }
      })
      return {
        ...state,
        country_list: {
          ...state?.country_list,
          optionList: optionList
        }
      };
    }
    case ActionTypes.SET_STORE_STATE_LIST:{
      const optionList = action?.payload?.serializedItems?.map((item: any, index: any)=>{
        return{
          ...item,
          value: item.name,
          label: item.name,
        }
      })
      return {
        ...state,
        state_list: {
          ...state?.state_list,
          optionList: optionList
        }
      };
    }
    case ActionTypes.SET_STORE_CITY_LIST:{
      const optionList = action?.payload?.serializedItems?.map((item: any, index: any)=>{
        return{
          ...item,
          value: item.name,
          label: item.name,
        }
      })
      return {
        ...state,
        city_list: {
          ...state?.city_list,
          optionList: optionList
        }
      };
    }
    case ActionTypes.SET_STORE_CITY_SELECT_STATE_LIST:{
      const optionList = state?.state_list?.optionList?.filter((item)=>item?.id == action?.payload);

      return {
        ...state,
        city_list: {
          ...state?.city_list,
          optionList: optionList
        }
      };
    }
    case ActionTypes.SET_STORE_STATE_SELECT_COUNTRY_LIST:{
      const optionList = state?.country_list?.optionList?.filter((item)=>item?.id == action?.payload);
      return {
        ...state,
        state_list: {
          ...state?.state_list,
          optionList: optionList
        }
      };
    }
    case ActionTypes.ADMIN_LOGOUT:{
      return initialState
    }
    default:
      return state;
  }
};

export default countriesReducers;
