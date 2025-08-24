/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { App_url } from "../../../utils/constants/static";
import Icon from "../Icon";
import { useLocation, useNavigate } from "react-router-dom";
import Scrollbar from "../Scrollbar";
import { useUiReducer } from "../../../redux/getdata/useUiReducer";
import { useWebSocket } from "../../../api/websocket/WebSocketContext";
import Button from "../button/Button";
import NewButton from "../button/NewButton";
import TabToggleList from "../Table/TabToggleList";
import SpinnerSm from "../loader/SpinnerSm";
interface IFormTypes {
  isLoader?: boolean;
  children?: React.ReactNode;
  handleSubmit?: Function;
  onSubmit?: Function;
  isBack?: boolean;
  disable?: boolean;
  loader?: boolean;
  isScroll?: boolean;
  buttonIcon?: any;
  bodyClassName?: string;
  multiSubmit?: {
    callBack: (data: any) => void;
    label: string;
    className?: string;
  }[];
  className?: string;
  route?: string;
  path?: string;
  buttonChildren?: Array<React.ReactNode>;
  content: {
    title: string;
    submit: string;
  };
  loader_action?: string[];
  toggleForm?: {
    toggleData?: { label: string; link: string }[];
    tab?: { label: string; value: string }[];
    tabSelect?: string;
  };
  initialRequest?: any[];
  action?: string;
  classNameFooter?: string;
  type?: string;
  formParts?: React.ReactNode[];
  formTitle?: { name: string; required: boolean };
  CustomBtn?: React.ReactNode;
  onChangeTab?: Function;
  oldBtnView?: boolean;
  headerChildren?: React.ReactNode
  headerClassName?: string
}
const FormLayout: React.FunctionComponent<IFormTypes> = (prop) => {
  const { isScroll = true } = prop;
  const { requestLoader, formloader } = useUiReducer();

  const { isConnect, send } = useWebSocket();
  const navigate = useNavigate();
  const [LabelLoader, setLabelLoader] = useState(null);
  const { pathname } = useLocation();
  const route = pathname.split("/").slice(0, -1).join("/");
  const [selectedTab, setSelectedTab] = useState(prop?.toggleForm?.tabSelect);

  const isLoader = () => {
    const ItemFind = prop?.loader_action?.find(
      (item) => item === requestLoader
    );
    return ItemFind ? true : false;
  };

  useEffect(() => {
    if (prop?.initialRequest) {
      prop?.initialRequest?.map((item, index) => {
        if (isConnect) {
          send(item);
        }
      });
    }
  }, [isConnect]);

  const onChangeTab = (item) => {
    setSelectedTab(item?.value);
    prop?.onChangeTab?.(item);
  };
  function callToggleForm() {
    return (
      <>
        {prop.toggleForm && (
          <React.Fragment>
            {prop?.toggleForm?.toggleData && (
              <div className="pt-1 flex  gap-x-5 w-fit">
                {prop?.toggleForm?.toggleData?.map?.((i: any) => (
                  <span
                    className={`tab-form flex-grow w-1/2 cursor-pointer whitespace-nowrap ${i?.disabled ? "disabled" : ""
                      }`}
                    onClick={() => !i?.disabled && navigate(i?.link)}
                  >
                    <p className="font-semibold">{i?.label}</p>
                    <hr
                      className={`h-1 border-0 !-mb-5 ${i?.link === pathname ? "bg-sky-500" : "bg-sky-100"
                        }`}
                    />
                  </span>
                ))}
              </div>
            )}
            {prop?.toggleForm?.tab && (
              <TabToggleList
                list={prop?.toggleForm?.tab}
                onChangeTab={onChangeTab}
                value={selectedTab}
              />
            )}
          </React.Fragment>
        )}
      </>
    );
  }
  const callRenderForm = () => {
    if (!prop.handleSubmit) {
      return (
        <div
          className={`bg-white rounded-lg my-4 ${prop.className} pt-3 px-4 ${prop?.bodyClassName}`}
        >
          {prop?.children}
        </div>
      );
    }

    const handleFormSubmit = (e: any, callBack?: Function, label?: string) => {
      e.preventDefault();
      if (label) {
        setLabelLoader(label);
      }
      if (prop.onSubmit) {
        prop.handleSubmit(prop.onSubmit)();
      } else if (prop.multiSubmit.length !== 0) {
        prop.handleSubmit(callBack)();
      }
    };
    return (
      <>
        {prop?.oldBtnView && prop?.oldBtnView ? (
          <form
            onSubmit={prop.handleSubmit(prop.onSubmit)}
            className={`bg-white rounded-lg my-4 ${prop.className} pt-3 px-4`}
          >
            <p className="font-semibold">{prop?.content?.title}</p>
            <hr className="h-[5px] bg-[#F7F7F7] border-none mt-1 ml-[-20px] mr-[-20px]" />
            {callToggleForm()}
            {prop.children}

            <div
              className={`flex items-center justify-end p-3 md:p-3  gap-2 ${prop?.classNameFooter || "mb-14"
                }`}
            >
              {prop.multiSubmit?.map((i) => (
                <Button
                  key={i?.label}
                  type="submit"
                  onClick={(e) => handleFormSubmit(e, i?.callBack, i?.label)}
                  disabled={
                    ((isLoader() || prop?.loader) && LabelLoader === i?.label) || prop?.disable
                  }
                  isLoading={
                    (isLoader() || prop?.loader) && LabelLoader === i?.label
                  }
                  className={`font-medium rounded-md text-sm px-5 py-2.5 ${i?.className ??
                    "text-center focus:outline-none focus:ring-blue-300 bg-primary text-white hover:bg-primary-100"
                    } `}
                  label={i?.label}
                />
              ))}
              {prop.onSubmit && (
                <Button
                  type="submit"
                  onClick={handleFormSubmit}
                  disabled={isLoader() || prop?.loader}
                  isLoading={isLoader() || prop?.loader}
                  className="text-white bg-primary hover:bg-primary-100  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primary-100 dark:focus:ring-blue-800"
                  label={prop?.content?.submit}
                />
              )}
            </div>
          </form>
        ) : (
          <form
            onSubmit={prop.handleSubmit(prop.onSubmit)}
            className={`bg-white rounded-lg my-4 ${prop.className} px-4 py-3 w-full`}
          >
            <div className={`flex justify-between items-center font-semibold pb-2  border-[0px] mb-1  border-b-[1px] ${prop?.headerClassName}`}>
              {prop?.formTitle?.name && (
                <p>
                  {prop?.formTitle?.name}
                  {prop?.formTitle?.required && (
                    <span className="text-red-600"> *</span>
                  )}
                </p>
              )}
              {callToggleForm()}
              {prop?.headerChildren}
              <div className="">
                <div
                  className={`flex items-center justify-end  gap-2  ${prop?.classNameFooter || ""
                    }`}
                ></div>
                {prop.multiSubmit?.map((i) => (
                  <Button
                    key={i?.label}
                    type="submit"
                    onClick={(e) => handleFormSubmit(e, i?.callBack, i?.label)}
                    disabled={
                      (((isLoader() || prop?.loader) && LabelLoader === i?.label) || prop?.disable)
                    }
                    isLoading={
                      (isLoader() || prop?.loader) && LabelLoader === i?.label
                    }
                    className={`font-medium rounded-md text-sm px-5 py-2.5 ${i?.className ??
                      "text-center focus:outline-none focus:ring-blue-300 bg-primary text-white hover:bg-primary-100 ml-2"
                      } `}
                    label={i?.label}
                  />
                ))}
                <div className="flex gap-4 mx-2">
                  {prop.CustomBtn && prop.CustomBtn}
                  {prop.onSubmit && (
                    <NewButton
                      type="submit"
                      onClick={handleFormSubmit}
                      disabled={(isLoader() || prop?.loader) || prop?.disable}
                      isLoading={isLoader() || prop?.loader}
                      variant="primary"
                      radius={"md"}
                      fw="500"
                    >
                      {prop?.buttonIcon} {prop?.content?.submit}
                    </NewButton>
                  )}
                </div>
              </div>
            </div>
            {prop.children}
          </form>
        )}
      </>
    );
  };
  function callPartFormsRender() {
    if (prop?.formParts) {
      return prop.formParts?.map?.((i) => {
        return (
          <div className="bg-white p-4 pb-6 border h-fit  border-white rounded-md my-4 min-w-[320px]">
            {i}
          </div>
        );
      });
    }
    return null;
  }
  const ScrollbarView = () => {
    if (isScroll) {
      return (
        <Scrollbar style={{ height: "calc(100vh - 105px)" }}>
          <div className={prop?.formParts?.length > 0 && "flex"}>
            <div className="flex bg-tertiary">{callPartFormsRender()}</div>
            {callRenderForm()}
          </div>
        </Scrollbar>
      );
    }
    return callRenderForm();
  };
  const callShowLoader = () => {
    if (formloader?.flag && formloader?.name === 'FORM_LAYOUT' && prop?.isLoader) {
      return (
        <div className="bg-secondary !h-full !w-full absolute z-50 opacity-20 flex justify-center items-center">
          <SpinnerSm className="h-20 w-20 border-8 border-blue-700 " />
        </div>
      );
    }
  };
  return (
    <div className="overflow-y-auto h-screen bg-tertiary relative ">
      {requestLoader == `${prop?.type}:${prop?.action}` && (
        <div className="loader-wrapper">
          <div className="page-loader"></div>
          <div className="backdrop"></div>
        </div>
      )}
      {callShowLoader()}
      <div className="p-3 py-4">
        <div
          className="flex items-center gap-2 "
          onClick={() => navigate(prop?.route || route)}
        >
          {prop.isBack && (
            <div className="h-[30px] w-[30px] rounded-full bg-white flex justify-center items-center ml-4">
              <img src={App_url.image.arrowleft} className="cursor-pointer text-[#0077FF]" />
            </div>
          )}
          <p className="text-[#2659D8] cursor-pointer text-sm">Back To Listing</p>
        </div>
        {ScrollbarView()}
      </div>
    </div>
  );
};

export default FormLayout;
