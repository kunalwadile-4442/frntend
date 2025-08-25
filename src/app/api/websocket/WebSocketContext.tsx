/* eslint-disable */
import React, { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { usePosterReducers } from "../../redux/getdata/usePostReducer";
import io, { Socket } from "socket.io-client";
import {
  setConfirmModalPopup,
  setLogout,
  setModalLoader,
  setRequestLoader,
} from "../../redux/actions/action";
import { App_url } from "../../utils/constants/static";
import { handleSocketResponse } from "./webSocketResponse";
import { CommonResponse } from "../../utils/common";
import { getData } from "../rest/fetchData";
import { setAuthData } from "../../redux/modules/common/user_data/action";
import { useUiReducer } from "../../redux/getdata/useUiReducer";
import SocketSingleton from "./SocketSingleton";

interface WebSocketContextType {
  socket: any | null;
  send: (data: any) => void;
  receivedMessage: any | null;
  isConnect: boolean;
}

export const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined
);

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { requestLoader } = useUiReducer();
  const [socket, setSocket] = useState<any | null>(null);
  const [receivedMessage, setReceivedMessage] = useState<any | null>(null);
  const [isConnect, setIsConnect] = useState<boolean>(false);
  const { user_data } = usePosterReducers();
  console.log("user_data", user_data);

  const dispatch: any = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const send = (data: any) => {
    const api_permissions = user_data?.user?.api_permissions;

    if (
      user_data?.user?.role === "admin" ||
      api_permissions?.includes(`${data?.type}:${data?.action}`)
    ) {
      if (data?.demo?.loader) {
        dispatch(setRequestLoader(`${data?.type}:${data?.action}`));
      }
      if (data?.demo?.modal_load) {
        dispatch(setModalLoader(`${data?.type}:${data?.action}`));
      }
      if (socket && socket.connected) {
        const payloadData = {
          ...data,
        };
        if (data?.payload?.query) {
          payloadData.payload.query = data?.payload?.query.trim();
        }
        // if(data?.payload?.to_date){
          //   payloadData.payload.to_date = formatDate2(data?.payload?.to_date)
          // }
          if (isConnect) {
          console.log("Send ::", data);
          socket.emit("action", payloadData);
        }
      } else {
        console.error("Socket.io connection not open");
      }
    }
  };

  useEffect(() => {
    getUserDetails();
    if (isConnect && user_data?.user?.role === "back_office") {
      const joinPayload = {
        type: "ChatMessageService",
        action: "joinGroups",
        payload: {},
      };
      send(joinPayload);
    }
  }, [user_data?.accessToken, isConnect]);

  function isAuthPath(): boolean {
    if (
      location.pathname === App_url.link.SIGNIN_URL &&
      location.pathname === App_url.link.FORGET_PASSWORD_URL &&
      location.pathname === App_url.link.RESET_PASSWORD_URL
    )
      return false;
    return true;
  }

  const getUserDetails = async () => {
    if (user_data?.accessToken) {
      const response = await getData(
        App_url.link.ENDPOINT_LINKS.GET_USER_DETAILS,
        user_data?.accessToken
      );
      if (response?.status === "success") {
        const permission = response?.data?.user;
        const role_permissions = response?.data?.user?.role_permissions;
        const column_permissions = response?.data?.user?.column_permissions? JSON.parse(response?.data?.user?.column_permissions) :null
        const payload = {
          ...user_data,
          user: {
            ...user_data?.user,
            ...permission,
            api_permissions: permission?.api_permissions,
            role_permissions: JSON.parse(role_permissions),
            column_permissions: column_permissions,
          },
        };
        dispatch(setAuthData(payload));
      }
      if (response?.status === "fail") {
        dispatch(setLogout());
        navigate(App_url.link.SIGNIN_URL);
      }
    }
  };
  const connectSocket = () => {
    let socket1: Socket;
    const socketSingleton = SocketSingleton.getInstance(user_data);
    socket1 = socketSingleton.getSocket();
    socket1.connect();
    socket1.on("connect", () => {
      setSocket(socket1);
      dispatch(setRequestLoader(""));
      dispatch(setModalLoader(""));
      if (socket1?.connected) {
        console.log("Kunal Socket.io connected");
        setIsConnect(true);
      }

      // dispatch(setSocketStatus(true))
    });

    socket1.on("disconnect", () => {
      console.log("Socket.io disconnected");
      socket1.connected = false;
      setIsConnect(false);
      setSocket(null);
      dispatch(setRequestLoader(""));
      dispatch(setModalLoader(""));
      if (
        user_data?.accessToken &&
        location?.pathname !== App_url?.link?.SIGNIN_URL
      ) {
        dispatch(
          setConfirmModalPopup({
            title: "Reconnection Required",
            description: `Your connection has been interrupted. Reconnect now to resume your activity`,
            callBackModal: () => window.location.reload(),
            // callBackModal: () => setSocket(connectSocket()),
            buttonSuccess: "Yes",
            buttonCancel: "cancel",
          })
        );
      }
    });

    socket1.on("connect_error", (error: any) => {
      console.error("Socket.io error:", error);
      // dispatch(setSocketStatus(false))
      setIsConnect(false);
      setSocket(null);
      dispatch(setRequestLoader(""));
      dispatch(setModalLoader(""));
    });

    socket1.on("data", async (data: any) => {
      console.log("Socket.io message ::", data);
      if (data?.msg === "unauthorized") {
        const socketSingleton = SocketSingleton.getInstance(user_data);
        socketSingleton.disconnectSocket();
        dispatch(setLogout());
        navigate(App_url.link.SIGNIN_URL);
      }
      if (data?.status === false) {
        CommonResponse(data);
      }

      await dispatch(
        await handleSocketResponse(
          "data",
          data,
          dispatch,
          send,
          navigate,
          user_data
        )
      );
    });

    return socket1;
  };

  useEffect(() => {
    let socket: any | null = null;

    if (user_data?.is_Login && isAuthPath()) {
      socket = connectSocket(); // Initialize socket on first load

      // Cleanup on component unmount or dependency changes
      return () => {
        if (socket) {
          console.log("Cleaning up socket...");
          socket.disconnect();
        }
      };
    }
  }, [user_data?.is_Login, user_data?.accessToken]);

  const contextValue: WebSocketContextType = {
    socket: socket,
    send: send,
    receivedMessage: receivedMessage,
    isConnect: isConnect,
  };

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
};
