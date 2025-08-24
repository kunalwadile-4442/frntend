/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { MouseEventHandler, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Button from './button/Button';
import { IShowModalPopup } from '../../utils/types';
import { useDispatch } from 'react-redux';
import { setShowModalPopup } from '../../redux/actions/action';
import { useUiReducer } from '../../redux/getdata/useUiReducer';
import { usePosterReducers } from '../../redux/getdata/usePostReducer';
import Icon from './Icon';
import { App_url } from '../../utils/constants/static';
import { callSampleDownload } from '../../utils/common';

interface ModalProps {
  show: boolean;
  onSubmit?: Function;
  onShow?: Function;
  handleSubmit?: Function;
  onHide?: Function;
  multiSubmit?: any[];
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  children?: React.ReactNode;
  Title?: string | React.ReactNode;
  buttonRender?: string | React.ReactNode;
  closeButton?: boolean;
  ConfirmModal?: IShowModalPopup;
  action_loader?:string[];
  reset?:any;
  loader?: boolean;
}

const Modal: React.FC<ModalProps> & {
  Header: React.FC<{ closeButton?: boolean; onClose?: MouseEventHandler<HTMLButtonElement>; children?: React.ReactNode, buttonRender?: React.ReactNode, headerClassName?: string,sampleFile?:boolean }>;
  Body: React.FC<{ children?: React.ReactNode; className?: string }>;
  Footer: React.FC<{ children?: React.ReactNode }>;
} = (props) => {
  const { show, onHide, className, contentClassName, children, } = props;

  const {modalLoader,PreviewPopup} = useUiReducer();
  const {socketResponse} = usePosterReducers()
  const dispatch = useDispatch();
  useEffect(()=>{
    
    if(socketResponse?.request?.demo?.modal_load){
      props?.reset({})
    }
  },[socketResponse]);

  useEffect(()=>{
    if(show === true){
      props?.onShow?.()
    }
  },[show])

  const callCancelFunction = () => {
    if(props.ConfirmModal?.callBackModal){
      props.ConfirmModal?.callBackModal?.();
    }
    if(props.ConfirmModal){
      dispatch(setShowModalPopup());
    }
    onHide();
  };
  const handleFormSubmit = (e: any,label?:string) => {
    e.preventDefault();
    e.stopPropagation();
    if (props.handleSubmit && props.onSubmit) {
      props.handleSubmit(props.onSubmit)();
    }else if(props.ConfirmModal.callBackModal){
      props.handleSubmit(props.ConfirmModal.callBackModal)();
    }
    else if(props.multiSubmit.length!==0) {
      props.multiSubmit.filter((item) => {
        if(item.label===label){
          props.handleSubmit(item.callBack)();
        }
      });
    }
  };
  if (!show) return <React.Fragment/>;

  return ReactDOM.createPortal(
    <div className={`modal-overlay ${className}`}>
      <div className={`modal-content ${contentClassName}`}>
        {props.Title && (
          <Modal.Header headerClassName={props?.headerClassName} closeButton={props.closeButton} onClose={()=>onHide()} buttonRender={props?.buttonRender} sampleFile={PreviewPopup?.sampleFile}>
            {props.Title}
          </Modal.Header>
        )}
        {children}
        {(props.ConfirmModal?.buttonSuccess || props.ConfirmModal?.buttonCancel) && (
          <Modal.Footer>
            {props.ConfirmModal?.buttonCancel && (
              <button
                className="py-2.5 px-5 ms-3 text-sm font-medium border hover:bg-slate-100 rounded-lg"
                onClick={callCancelFunction}
              >
                {props.ConfirmModal.buttonCancel}
              </button>
            )}
            {props.ConfirmModal?.buttonSuccess && (
              <Button
                label={props.ConfirmModal.buttonSuccess}
                className='button btn-primary-1'
                onClick={handleFormSubmit}
                isLoading={props?.loader || modalLoader !== ""}
                disabled={modalLoader === ""?false:true}
              />
            )}
          </Modal.Footer>
        )}
      </div>
    </div>,
    document.body // Append modal to the body
  );
};

// Modal.Header Component
Modal.Header = ({ closeButton, onClose, children, buttonRender, headerClassName,sampleFile }) => (
  <div className={`modal-header ${headerClassName}`}>
    {children}
    {buttonRender && <div className='button-render'>{buttonRender}</div>}
    {sampleFile&&<div className='flex gap-1 items-center border-primary border p-1 px-2 rounded-md text-gray-600 cursor-pointer hover:bg-blue-50' onClick={callSampleDownload}>
      <Icon image attrIcon={App_url.image.Download} className="sm" />
      <p>sample.xlsx</p>
      </div>}
    {closeButton && <button className="modal-close-button" onClick={onClose}>&times;</button>}
  </div>
);

// Modal.Body Component
Modal.Body = ({ children, className }) => (
  <div className={`modal-body ${className}`}>
    {children}
  </div>
);

// Modal.Footer Component
Modal.Footer = ({ children }) => (
  <div className="modal-footer px-2">
    {children}
  </div>
);

export default Modal;
