import { createReducer } from "@reduxjs/toolkit";
import { Action, ActionTypes } from "../../../actions/action";
import { IUiInitialTypes } from "../../../../utils/types";

const initialData: IUiInitialTypes = {
  clearForm: { url: null, status: 'hide', name: '' },
  warnForm: { url: null, status: 'hide', name: '' },
  formContent: { url: null, status: 'hide', name: '' },
  ModalPopup:{
    title: "",
    name: "",
    description: "",
    data: {},
    show: "",
    callBackModal: null,
    callBackCancelModal: null,
    buttonSuccess: "",
    buttonCancel: ""
  },
  PreviewPopup:{
    title: "",
    name: "",
    description: "",
    data: {},
    show: "",
    callBackModal: null,
    callBackCancelModal: null,
    buttonSuccess: "",
    buttonCancel: ""
  },
  showUploadFile:{
    title: "",
    name: "",
    description: "",
    data: {},
    show: "",
    callBackModal: null,
    callBackCancelModal: null,
    buttonSuccess: "",
    buttonCancel: ""
  },
  requestLoader: "",
  pageLoader: "",
  modalLoader:"",
  formloader:{flag:false,name:''},
  randomNo:'',
  FullScreen:{
    title: "",
    name: "",
    description: "",
    data: {},
    show: "",
    callBackModal: null,
    callBackCancelModal: null,
    buttonSuccess: "",
    buttonCancel: "",
    loader:false,
  },
};

const uiReducer = createReducer(initialData, (builder) => {
  builder.addCase(ActionTypes.CLEAR_FORM_SET_FUCT, (state, action: Action) => {
    return { ...state, clearForm: action.payload };
  });
  builder.addCase(ActionTypes.RANDOM_NO, (state, action: Action) => {
    return { ...state, randomNo: action.payload };
  });
  builder.addCase(ActionTypes.SET_FORM_LOADER, (state, action: Action) => {
    return { ...state, formloader: action.payload };
  });
  builder.addCase(ActionTypes.WARN_FORM_SET_FUCT, (state, action: Action) => {
    return { ...state, warnForm: action.payload };
  });
  builder.addCase(ActionTypes.ADMIN_LOGOUT, (state, action: Action) => {
    return initialData
  });
  builder.addCase(ActionTypes.SET_STORE_MODAL_CONFIRM, (state, action: Action) => {
    return {
      ...state,
      ModalPopup: action?.payload ? {
        ...action?.payload,
        show: "CONFIRM_MODAL",
        buttonSuccess: action?.payload?.buttonSuccess || "Submit",
        buttonCancel: action?.payload?.buttonCancel || "Close",
      } : initialData?.ModalPopup
    }
  });
  builder.addCase(ActionTypes.SET_FULLSCREEN_POPUP, (state, action: Action) => {
    return {
      ...state,
      FullScreen:action?.payload
    }
  });
  builder.addCase(ActionTypes.SET_SHOW_MODAL_POPUP, (state, action: Action) => {
    return {
      ...state,
      PreviewPopup: action?.payload ? {
        ...action?.payload,
        buttonSuccess: action?.payload?.buttonSuccess !== undefined && action?.payload?.buttonSuccess !=null ? action?.payload?.buttonSuccess : "Submit",
        buttonCancel: action?.payload?.buttonCancel !== undefined && action?.payload?.buttonCancel !== null ?action?.payload?.buttonCancel:"Close",
      } : initialData?.PreviewPopup
    }
  });
  builder.addCase(ActionTypes.SET_SHOW_UPLOAD_FILES, (state, action: Action) => {
    return {
      ...state,
      showUploadFile: action?.payload ? {
        ...action?.payload,
        buttonSuccess: action?.payload?.buttonSuccess !== undefined && action?.payload?.buttonSuccess !=null ? action?.payload?.buttonSuccess : "Submit",
        buttonCancel: action?.payload?.buttonCancel !== undefined && action?.payload?.buttonCancel !== null ?action?.payload?.buttonCancel:"Close",
      } : initialData?.showUploadFile
    }
  });
  builder.addCase(ActionTypes.SET_REQUEST_LOADER, (state, action: Action) => {
    return { ...state, requestLoader: action.payload };
  });
  builder.addCase(ActionTypes.SET_MODAL_LOADER, (state, action: Action) => {
    return { ...state, modalLoader: action.payload };
  });
  builder.addCase(ActionTypes.SET_PAGE_LOADER, (state, action: Action) => {
    return { ...state, pageLoader: action.payload };
  });
});

export default uiReducer;
