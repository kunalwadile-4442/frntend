/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { initialUserData } from "../../../../utils/constants/static";
import { ActionTypes } from "./action";
import { IUserRes } from "./types";

const initialState: IUserRes = {
  status: "",
  is_Login: false,
  user: null,
  access_token: "",
};

const userDataReducers = (
  state: IUserRes = initialState,
  action
): IUserRes => {
  switch (action.type) {
    case ActionTypes.AUTH_DATA: {
      return {
        ...state,
        ...action.payload
      };
    }
    case ActionTypes.IS_LOGIN: {
      return {
        ...state,
        is_Login:action.payload,
      };
    }
    case ActionTypes.SET_UPDATE_USER_LOGIN: {
      const column_permissions = action?.payload?.column_permissions? JSON.parse(action?.payload?.column_permissions) :null
      return {
        ...state,
        user:{
          ...state?.user,
          is_reset: action?.payload?.is_reset,
          column_permissions: column_permissions,
        }
        // is_Login:action.payload,
      };
    }
    case ActionTypes.SET_UPDATE_USER_PERMISSION: {
      const column_permissions = action?.payload?.column_permissions? JSON.parse(action?.payload?.column_permissions) :null
      return {
        ...state,
        user:{
          ...state?.user,
          is_reset: action?.payload?.is_reset,
          column_permissions: column_permissions,
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

export default userDataReducers;
