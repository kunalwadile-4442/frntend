/* eslint-disable array-callback-return */

import { ActionTypes } from './action';
import { ICustomersRes } from "./types";


const initialState: ICustomersRes = {
  customersList:{
    optionsList: [],
    parsedItems: [],
    totalCount: 0,
  },
  customerDetails: null,
  customerProjects: null,
};

const customersReducers = (state: ICustomersRes = initialState, action): ICustomersRes => {
  switch (action?.type) {
    case ActionTypes.SET_STORE_CUSTOMERS_LIST:{
      const optionsList = action?.payload?.parsedItems?.map((item, index)=>({
        ...item,
        label: item?.name,
        value: item?.id
      }));
      return {
        ...state,
        customersList:{
          ...action?.payload,
          optionsList: optionsList,
        },
      };
    }
    case ActionTypes.SET_STORE_CUSTOMERS_DETAILS:{
      const contact_person = [];
      if(action?.payload){
        action?.payload?.contact_person?.map((item)=>{
          contact_person.push({
            ...item,
            label: item?.name,
            value: item?.name,
          })
        })
      }
      const data = action?.payload?{...action?.payload, contact_person: contact_person}:null
      return{
        ...state,
        customerDetails:data,
      }
    }
    case ActionTypes.SET_STORE_CUSTOMER_PROJECT_LIST:{
      return{
        ...state,
        customerProjects:{
          ...state?.customerProjects,
          [action?.payload?.id]: action?.payload?.data,
        },
      }
    }
    case ActionTypes.UPDATE_CUSTOMER:{
      const updatedList = state?.customersList?.parsedItems?.map?.(
        (item) => item.id === action.payload?.id?action?.payload:item
      );
      return {
        ...state,
        customersList: {
          parsedItems: updatedList,
        },
      };
    }
    default:
      return state;
  }
};

export default customersReducers;
