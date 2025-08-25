import { createReducer } from "@reduxjs/toolkit";
import { Action, ActionTypes } from "../../../actions/action";
import { InitialStateType } from "../../../../utils/types";
import { initialState, initialUserData } from "../../../../utils/constants/static";

const initialData: InitialStateType = {
  is_login: false,
  accessToken: '',
  locality_list: initialState,
  role_list: initialState,
  user_profile: initialUserData,
  socketResponse: {
    data: null,
    errors: null,
    request: null,
    action: "",
    status: "",
    type: "",
    payload: null,
  }

};

const posterReducer = createReducer(initialData, (builder) => {
  builder.addCase(ActionTypes.IS_LOGIN, (state, action: Action) => {
    return { ...state, is_login: action.payload };
  });
  builder.addCase(ActionTypes.ACCESS_TOKEN, (state, action: Action) => {
    return { ...state, accessToken: action.payload };
  });
  builder.addCase(ActionTypes.ADMIN_LOGOUT, (state) => {
    localStorage.removeItem('persist:chathub-store');
    return initialData
  });
  builder.addCase(ActionTypes.SET_STORE_SOCKET_RESPONSE, (state, action: Action) => {
    return {
      ...state,
      socketResponse: action?.payload ? action?.payload : initialData.socketResponse,
    }
  });
  builder.addCase(ActionTypes.USER_PROFILE, (state, action: Action) => {
    return { ...state, user_profile: action.payload };
  });
});

export default posterReducer;
