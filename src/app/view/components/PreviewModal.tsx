/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef } from 'react'
import { useDispatch } from 'react-redux';
import Modal from './Modal';
import { useUiReducer } from '../../redux/getdata/useUiReducer';
import { setShowModalPopup } from '../../redux/actions/action';
import Icon from './Icon';
import { App_url } from '../../utils/constants/static';

export default function PreviewModal() {
  const { PreviewPopup } = useUiReducer();

  const dispatch = useDispatch()
  const iframeRef = useRef(null); // To reference the iframe

  const onClose = () =>{
    dispatch(setShowModalPopup());
  }
  const callDownload = () =>{
    const link = document.createElement('a');
    const objectUrl = PreviewPopup?.data?.url??PreviewPopup?.data?.url?.link
    link.href = objectUrl;
    link.download = PreviewPopup?.data?.filename;
    document.body.appendChild(link);
    link.click();
    // window.URL.revokeObjectURL(objectUrl);
    link.remove();
  }
  const callPrint = () => {
    if (iframeRef.current) {
      const iframeWindow = iframeRef.current.contentWindow;
      iframeRef.current.onload = () => {
        iframeWindow.focus();
        iframeWindow.print();
      };
      if (iframeRef.current.readyState === 'complete' || iframeRef.current.readyState === undefined) {
        iframeWindow.focus();
        iframeWindow.print();
      }
    }
  };

  if(PreviewPopup?.show !== "PREVIEW"){
    return null;
  }
  return (
    <React.Fragment>
      <Modal
        show={true}
        contentClassName='max-w-[calc(100%-90px)] h-full p-12'
        className='p-2 px-4'
        onHide={onClose}
        Title="Preview"
        closeButton
        buttonRender={
          PreviewPopup?.data?.filename ?(
            <div className='flex gap-2  items-center'>
              <Icon attrIcon={App_url.image.Download} image buttonClassName='rounded' onClick={callDownload} />
              <Icon attrIcon={App_url.image.Print} image buttonClassName='rounded' onClick={callPrint} />
            </div>
          ):null
        }
      >
        <Modal.Body className={'max-w-[100%] h-full'}>
            <iframe ref={iframeRef}
            src={`${PreviewPopup?.data?.url??PreviewPopup?.data?.url?.link}${PreviewPopup?.data?.filename?"#toolbar=0":""}`}
            width={"100%"} height={'100%'} />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  )
}
