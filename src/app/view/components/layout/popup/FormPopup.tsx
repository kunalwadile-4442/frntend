/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setFormPopup } from "../../../../redux/actions/action";
import { useUiReducer } from "../../../../redux/getdata/useUiReducer";
import Button from "../../button/Button";
import { useWebSocket } from "../../../../api/websocket/WebSocketContext";
import { App_url } from "../../../../utils/constants/static";
import { useNavigate } from "react-router-dom";
import Icon from "../../Icon";
import { usePosterReducers } from "../../../../redux/getdata/usePostReducer";
import Scrollbar from "../../Scrollbar";
import SpinnerSm from "../../loader/SpinnerSm";

interface IRequestPayload {
  action: string;
  type: string;
  payload: any;
  demo?: any;
}
interface IFormPopupProps {
  disableEnter?:boolean
  children: React.ReactNode;
  handleSubmit?: any;
  onSubmit?: Function;
  isCenter?: boolean;
  hideFooter?: boolean;
  isAdd?: boolean;
  edit?: boolean;
  isBack?: boolean;
  item?: any;
  onEditClick?: (item: any) => void;
  onShow?: Function;
  route?: string;
  addTitle?: string;
  type?: string;
  titleButton?: boolean;
  handleOpen?: Function | string;
  modalName?: string;
  titleClassName?: string;
  loader?: boolean;
  className?: string;
  bodyClassName?: string;
  formTitle?: string | React.ReactNode;
  fullWidth?: boolean;
  autoHeight?: boolean;
  content: {
    title: string;
    submit?: string;
    close?: string;
    key?: string;
  };
  multiSubmit?: { callBack: (data: any) => void, label: string, className?: string }[]
  reset?: Function;
  loader_action?: string[];
  loader_action_reset?: string[];
  initialRequest?: any[];
  footerAction?: Function
  disable?: boolean;
  request?: IRequestPayload;
  pageTitle?: string;
  pageNumber?: string;
  onClose?: () => void;
  callBackClose?: () => void;
  showHeader?: Function;
  isLoader?: boolean;
}



export const checkPermission = (user_data: any, data: any) => {
  const api_permissions = user_data?.user?.api_permissions;
  if (user_data?.user?.role === "admin" || api_permissions?.includes(`${data},`)) {
    return true;
  } else {
    return false;
  }
}

const FormPopup: React.FC<IFormPopupProps> = (props) => {
  const [loaderLabel, setLoaderLabel] = useState(null)
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { send, isConnect } = useWebSocket()
  const { clearForm, requestLoader, PreviewPopup, formloader } = useUiReducer();
  const { socketResponse } = usePosterReducers()
  const navigate = useNavigate()
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (props?.initialRequest && clearForm?.status !== "hide") {
      props?.initialRequest?.map((item, index) => {
        if (isConnect) {
          send(item);
        }
      });
    }
  }, [isConnect, clearForm?.status]);

  useEffect(() => {
    if (props?.loader_action_reset) {
      const actions = `${socketResponse?.type}:${socketResponse?.action}`;
      const check = props?.loader_action_reset?.includes(actions);
      if (check) {
        onClearForm();
      }
    }
  }, [socketResponse?.type, socketResponse?.action])

  useEffect(() => {
    if (clearForm.name == props.content?.title) {
      props?.onShow?.(clearForm);
      if (isConnect && props?.request) {
        send(props?.request);
      }
    }
  }, [clearForm?.name == props?.content?.title, isConnect])
  const handleFormSubmit = (e: any, label?: string) => {
    setLoaderLabel(label)
    e.preventDefault();
    if (props.handleSubmit && props.onSubmit) {
      props.handleSubmit(props.onSubmit)();
    }
    else if (props.multiSubmit?.length !== 0) {
      props.multiSubmit?.filter?.((item) => {
        if (item.label === label) {
          props.handleSubmit(item.callBack)();
        }
      });
    }
  };
  const onClearForm = () => {
    dispatch(setFormPopup({
      status: "hide",
      key: ""
    }));
    if (props?.reset) {
      props?.reset();
    }
    if (props?.onClose) {
      props?.onClose()
    }
    if (props?.callBackClose) {
      props?.callBackClose()
    }
  };

  const isLoader = () => {
    const ItemFind = props?.loader_action?.find(
      (item) => item == requestLoader
    );
    return ItemFind ? true : false;
  };




  const bottomFooterRender = () => {
    if (props?.hideFooter) {
      return <></>;
    }
    return (
      <div className={`flex items-center bg-white rounded-lg  justify-end gap-4  ${props.isCenter ? " p-3 md:p-3" : "pb-0 px-3 pt-5"}`}>
        {props?.footerAction && props?.footerAction()}
        <>
          {props.content.close && (
            <button
              onClick={() => onClearForm()}
              className="py-2.5 px-5 ms-3 text-sm font-medium border hover:bg-slate-100 rounded-lg"
              disabled={(isLoader() || props?.loader)}
            >
              {props.content.close}
            </button>
          )}

          {props?.multiSubmit?.map?.(i => (
            <Button
              type="button"
              onClick={(e) => handleFormSubmit(e, i?.label)}
              isLoading={(isLoader() || props?.loader) && loaderLabel == i?.label}
              disabled={isLoader() || props?.loader || props.disable}
              className={`font-medium rounded-md text-sm px-5 py-2.5 ${i?.className ?? 'text-center focus:outline-none focus:ring-blue-300 bg-primary text-white hover:bg-primary-100 dark:hover:bg-primary-100'} `}
              label={i?.label}
            />
          ))}

          {(props.content.submit && props.onSubmit) && (
            <Button
              type="button"
              onClick={handleFormSubmit}
              disabled={isLoader() || props?.loader || props.disable}
              isLoading={isLoader() || props?.loader}
              className={`text-white ${props.fullWidth ? 'w-full' : ''} bg-primary focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primary-100 hover:bg-primary-100 dark:focus:ring-blue-800`}
              label={props.content.submit}
            />
          )}
        </>
        {/* )} */}
      </div>
    )
  }
  if (clearForm.name != props.content?.title) {
    return <React.Fragment></React.Fragment>;
  }
  if (clearForm.name === props.content?.title) {
    if (clearForm.key !== props.content?.key) {
      return <></>;
    }
  }

  const callShowLoader = () => {
    if (formloader?.flag && formloader?.name === 'FORM_POPUP' && props?.isLoader) {
      return (
        <div className="bg-secondary !h-full !w-full absolute z-50 opacity-20 flex justify-center items-center">
          <SpinnerSm className="h-20 w-20  -8 border-blue-700 " />
        </div>
      );
    }
  };

  const callKeyDown=(e) => {
    if (props?.disableEnter && e.key === "Enter") {
      e.preventDefault(); // Prevent form submission on Enter
    }
  }

  return (
    <>
      <div
        id="default-modal"
        className={`fixed top-0 right-0 left-0 !z-50 flex  items-center  ${props.isCenter ? "justify-center" : "justify-end"
          } w-full h-full overflow-auto bg-gray-950 bg-opacity-50 `}
      >
        <div
          className={`${props.className
            ? props.className
            : props.isCenter
              ? " p-4 w-full max-w-4xl  max-h-[100vh]"
              : " w-96 max-w-lg h-full "
            } relative`}
        >
          <div
            ref={dropdownRef}
            className={`${props.isCenter ? "rounded-lg" : "h-full"} relative bg-white  shadow`}
          >
            <Scrollbar containerClassName={"!overflow-auto"} style={{ maxHeight: props.isCenter ? "calc(100vh - 60px)" : "100vh", }} className={"!relative !mr-0 !pr-0 !overflow-auto !mb-0"}>
              {callShowLoader()}
              {!props?.showHeader ? <div className=" flex items-center justify-between p-4 md:p-4 rounded-t">
                <div className="w-full text-start">

                  {props.isBack ? (
                    <div
                      className="flex items-center gap-2 "
                      // onClick={() => navigate(props?.route || route)}
                      onClick={() => dispatch(
                        setFormPopup({
                          status: "hide",
                          key: ""
                        })
                      )}
                    >
                      <Icon
                        style={{ height: "10px" }}
                        className="cursor-pointer"
                        attrIcon={App_url.image.arrowleft}
                      />
                      {props.titleButton ?
                        <button className={`bg-[#2C2D2D] border border-[#C8C9C9] rounded-[5px] p-[8px_16px] gap-[8px] text-white  ${props?.titleClassName}`}>{props.content.title}</button> :
                        <p className={`font-semibold ${props?.titleClassName}`}>{props.content.title}</p>
                      }
                    </div>
                  ) :
                    <>
                      <div className="flex justify-start gap-4 items-center">
                        <h3 className="text-xl font-semibold dark:text-black">
                          {props?.formTitle ? props?.formTitle : props.content.title}
                        </h3>
                        {props?.pageTitle &&
                          <h1 className="text-sm ">
                            {props?.pageTitle}
                          </h1>}
                        {props?.pageNumber &&
                          <h1 className="text-sm ">
                            {props?.pageNumber}
                          </h1>}
                      </div>
                    </>
                  }
                </div>

                <div className="flex items-center justify-end gap-4 w-1/2">
                  {(props.isAdd) && (
                    <button className="bg-primary border border-[#0EADE5] rounded-[5px] p-[8px_16px] gap-[8px] text-white">{props.addTitle}</button>
                  )}
                  {(props.edit) && (
                    <Icon
                      image
                      attrIcon={App_url.image.Edit}
                      button
                      onClick={() => props?.onEditClick?.(props.item)}
                      size="md"
                    />
                  )}
                  {!props.content.close && (
                    <button
                      onClick={() => onClearForm()}
                      className="text-black bg-transparent hover:bg-gray-200 hover:text-primary rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-primary dark:hover:text-white"
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span className="sr-only">{props.content.close}</span>
                    </button>
                  )}
                </div>
              </div> : <>{props?.showHeader()}</>}

              <div
                id="modal-sidebar"
                className={` ${props?.bodyClassName} ${props.isCenter ? "" : "  max-h-[calc(100vh-70px)] h-full overflow-auto"} pb-2 px-4 `}
              // className={`${props.isCenter ? "overflow-auto max-h-[calc(100vh-168px)] " : "  max-h-[calc(100vh-70px)] h-full overflow-auto"} pb-2 px-4 `}
              >
                {(props.handleSubmit && props.onSubmit) ? (
                  <form ref={formRef} onSubmit={handleFormSubmit}  onKeyDown={callKeyDown}>
                    {props.children}
                  </form>
                ) : (
                  props.children
                )}
                {!props?.isCenter && bottomFooterRender()}
              </div>
              {props.isCenter && bottomFooterRender()}
            </Scrollbar>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormPopup;