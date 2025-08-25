/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable eqeqeq */
import { toast } from "react-toastify";
import {
  setFormPopup,
  setModalLoader,
  setRequestLoader,
  setShowModalPopup,
  setStoreSocketResponse,
  WarnFormSetFunctions,
} from "../../redux/actions/action";
import { App_url } from "../../utils/constants/static";
import { setUpdateUserLogin, setUpdateUserPermission } from "../../redux/modules/common/user_data/action";



export const handleSocketResponse = async (
  type: string,
  data: any,
  dispatch: any,
  send: any,
  navigate: any,
  user_data?: any,
  accessToken?: any,
) => (async (dispatch, getState) => {

  const response = data;
  const { requestLoader, modalLoader, PreviewPopup } = getState()?.combinedReducer?.uiReducer;
  const { user } = getState()?.combinedReducer?.user_data;

  const payloadRequest = {
    ...data,
    action: data?.request?.action,
    type: data?.request?.type,
    payload: data?.request?.payload,
  };
  dispatch(setStoreSocketResponse(payloadRequest));

  setTimeout(() => {
    dispatch(setStoreSocketResponse());
  }, 500);
  if (data?.request?.demo?.handle_modal && data?.status === true) {
    dispatch(setFormPopup({ status: "hide" }));
  }
  if (requestLoader == `${data?.request?.type}:${data?.request?.action}`) {
    dispatch(setRequestLoader(""));
  }
  if (modalLoader == `${data?.request?.type}:${data?.request?.action}`) {
    setTimeout(() => {
      dispatch(setModalLoader(""));
      dispatch(setShowModalPopup());
    }, 70)
    if (PreviewPopup.callBackModal) {
      PreviewPopup.callBackModal(data)
    }
  }
  switch (data?.request?.type) {

    case "userService":
      if (data?.request?.action === "create") {
      }
      if (data?.request?.action === "update") {
      }
      if (data?.request?.action === "changePassword") {
        if (data?.status === true) {
          toast.success(data?.msg);
          dispatch(setUpdateUserLogin(data?.data));
        }
      }
      if (data?.request?.action == "updateColumnPermission") {
        if (data?.status === true) {
          dispatch(setUpdateUserPermission(data?.data))
        }
      }
      break;

    default:
      console.log("Unhandled socket response type:", type);
      break;
  }
})