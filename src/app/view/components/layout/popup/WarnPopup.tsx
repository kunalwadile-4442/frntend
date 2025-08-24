/* eslint-disable react-hooks/exhaustive-deps */
import React, { MouseEventHandler, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { WarnFormSetFunctions } from "../../../../redux/actions/action";
import { useUiReducer } from "../../../../redux/getdata/useUiReducer";

interface IWarnPopupTypes {
  onSubmit?: MouseEventHandler<HTMLButtonElement>;
  content?: {
    title: string;
    description: string;
    submit?: string;
    close?: string;
  };
}
const WarnPopup: React.FunctionComponent<IWarnPopupTypes> = (prop) => {
  const dispatch = useDispatch();
  const { warnForm } = useUiReducer();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    dispatch(WarnFormSetFunctions({ status: "hide" }));
  },[]);

  const onSubmit = async (e) =>{
    if(warnForm?.callBackButtonSuccess){
      await warnForm?.callBackButtonSuccess();
      dispatch(WarnFormSetFunctions({ status: "hide" }));
    }else{
      prop.onSubmit(e);
    }
  }
  return (
    <>
      {warnForm?.status !== "hide" 
      && warnForm?.name === prop.content?.title 
      &&
      (
        <div
          id="default-modal"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-gray-400 bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-lg ">
            <div
              ref={dropdownRef}
              className="relative  bg-white rounded-lg shadow"
            >
              <div className="flex items-center justify-between p-4  md:p-4 rounded-t">
                <div className="w-full text-center">
                  <h3 className="text-lg text-gray-700 ">
                    {prop.content?.title}
                  </h3>
                </div>
                <button
                  onClick={() =>
                    dispatch(WarnFormSetFunctions({ status: "hide" }))
                  }
                  className="confirmation-popup-close-btn text-gray-400 bg-transparent hover:bg-gray-200  rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-primary dark:hover:text-white"
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
                  <span className="sr-only">{prop.content?.close}</span>
                </button>
              </div>
              <div className="mx-2">
                <p className="text-center text-sm text-gray-600">
                  {prop.content?.description}
                </p>
              </div>
              <div className="flex items-center justify-center p-3 md:p-3 mt-2">
                {<button
                  type="button"
                  onClick={onSubmit}
                  className="warnpopup-button text-white hover:bg-primary-100  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primary-100"
                >
                  {prop.content?.submit}
                </button>}
                <button
                  onClick={() =>
                    dispatch(WarnFormSetFunctions({ status: "hide" }))
                  }
                  className="py-2.5 px-5 ms-3 text-sm font-medium bg-gray-300 hover:bg-gray-400 rounded-lg"
                >
                  {prop.content?.close}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WarnPopup;
