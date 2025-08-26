/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActionTypes } from './action';
import { IInternalUserTypesRes } from './types';


const initialState: IInternalUserTypesRes = {
    items: [],
    totalCount: 0,
    optionList: [],
};

const internalUserReducers = (state: IInternalUserTypesRes = initialState, action): IInternalUserTypesRes => {
  switch (action.type) {
    
    case ActionTypes.ADD_INTERNAL_USER:{
      const items = [];
      items.push(action?.payload);
      state?.items?.map((item, index)=>{
        items.push(item);
      })
      const totalCount = state?.totalCount + 1;
      return {
        ...state,
        items: items,
        totalCount: totalCount,
      };
    }
    case ActionTypes.UPDATE_INTERNAL_USER:{
      const updatedList = state?.items.map(role =>
        role.id === action.payload.id ? action.payload : role
      );
      return {
        ...state,
        items: updatedList,
      };
    }
    case ActionTypes.DELETE_INTERNAL_USER:{
      const updatedList = state.items.filter(role => role.id !== action.payload.id);
      const totalCount = state?.totalCount - 1;
      return {
        ...state,
        items: updatedList,
        totalCount: totalCount
      };
    }
    case ActionTypes.ADMIN_LOGOUT:{
      return initialState
    }
    default:
      return state;
  }
};

export default internalUserReducers;
