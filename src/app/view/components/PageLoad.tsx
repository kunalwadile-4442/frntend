/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useWebSocket } from '../../api/websocket/WebSocketContext'
import { usePosterReducers } from '../../redux/getdata/usePostReducer';
import { useDispatch } from 'react-redux';
import { setLogout, setPageLoader, WarnFormSetFunctions } from '../../redux/actions/action';
import WarnPopup from './layout/popup/WarnPopup';
import { warnContent } from '../../utils/common';
import { getData } from '../../api/rest/fetchData';
import { App_url, INITIAL_PERMISSION } from '../../utils/constants/static';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import PreviewModal from './PreviewModal';
import UploadFileComponent from './UploadFile';
import SocketSingleton from '../../api/websocket/SocketSingleton';

export default function PageLoad() {
  const { user_data, products } = usePosterReducers();
  const dispatch = useDispatch()
  const { send, isConnect } = useWebSocket();
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnect && user_data?.user?.role == "admin") {
      send({
        "type": "emailTemplateService",
        "action": "list",
        "payload": {
          "query": "",
          "limit": "10",
          "page": "1",
          "active": true,
          "sort_by": "",
          "sort_order": "asc"
        }
      })
    }
    if((user_data?.user?.role == "front_office" || user_data?.user?.role == "back_office") && products?.items?.length===0){
      const payload = {
        type: "productService",
        action: "list",
        payload: { query: "", limit: "5000", page: "1", active: true },
      }
      send(payload)
    }
  }, [isConnect, user_data?.user?.role == "admin"]);

  useEffect(()=>{
    if(user_data?.user?.role !== "admin" && user_data?.user?.api_permissions === `${INITIAL_PERMISSION},`){
      dispatch(setLogout())
      navigate(App_url.link.SIGNIN_URL);
    }
  },[user_data?.user?.api_permissions])

  useEffect(() => {
    dispatch(setPageLoader());
  }, []);
  
  const handleLogout = () => {
    
    navigate(App_url.link.SIGNIN_URL);
    const socketSingleton = SocketSingleton.getInstance(user_data);
    getData(App_url.link.ENDPOINT_LINKS.LOG_OUT, user_data?.accessToken).then((res) => {

      if (res?.data?.status === "success") {
        toast.success("User logged out successfully");
        socketSingleton.disconnectSocket()
        dispatch(setLogout());
        navigate(App_url.link.SIGNIN_URL);
      }
      else {
        socketSingleton.disconnectSocket()
        dispatch(setLogout());
        navigate(App_url.link.SIGNIN_URL);
      }
      if (res?.data?.status === "fail") {
        toast.error(res?.data?.message);
        navigate(App_url.link.SIGNIN_URL);

      }
      dispatch(WarnFormSetFunctions({ status: 'hide' }))
    });
    socketSingleton.disconnectSocket()
    dispatch(setLogout());
  };
  return (
    <React.Fragment>
      <WarnPopup
        content={warnContent("Logout", "Are you sure, you want to Log out?")}
        onSubmit={handleLogout}
      ></WarnPopup>
      <PreviewModal/>
      <UploadFileComponent/>
      </React.Fragment>
  )
}
