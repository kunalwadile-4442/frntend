/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import Modal from './Modal';
import { useUiReducer } from '../../redux/getdata/useUiReducer';
import { setShowModalPopup } from '../../redux/actions/action';
import { App_url } from '../../utils/constants/static';
import { postData } from '../../api/rest/fetchData';
import FileUpload from './FileUpload';
import { useForm } from 'react-hook-form';
import { usePosterReducers } from '../../redux/getdata/usePostReducer';

export default function UploadFileComponent() {
  const { showUploadFile, clearForm } = useUiReducer();
  const dispatch = useDispatch()
  const {user_data} = usePosterReducers();
  const { control, handleSubmit, formState: { errors }, reset, } = useForm<any>();
  const iframeRef = useRef(null); // To reference the iframe

  const [loader, setLoader] = useState(false)
  useEffect(()=>{
    // onClose();
  },[])
  const onClose = () =>{
    dispatch(setShowModalPopup());
  }

  const onSubmit = async (data) => {
    setLoader(true);
    const fileData = data?.upload;
    const formData = new FormData();
    formData.append("file", fileData, fileData.name);

    try {
      const response = await postData(
        App_url.link.ENDPOINT_LINKS.UPLOAD_FILE,
        formData,
        user_data.access_token,
        "multipart/form-data"
      );
      setLoader(false);
      const drawingIdToUpdate = clearForm.url.drawing_id;
      const updatedDrawingDetails = clearForm.url.drawing_details.map((drawing) => {
        if (drawing.drawing_id === drawingIdToUpdate) {
          return { ...drawing, file_data: response.data };
        }
        return drawing;
      });

      const updatedClearForm = {
        ...clearForm,
        url: {
          ...clearForm.url,
          drawing_details: updatedDrawingDetails,
        },
      };

      // dispatch(
      //   setFormPopup({
      //     status: modal ? "modal" : "add",
      //     name: modal ? `${modalName}` : `Add ${modalName}`,
      //     url: updatedClearForm.url,
      //   })
      // );
      reset({"upload":""})
    } catch (error) {
      setLoader(false);
      console.error("Error uploading file:", error);
    }
  };
  if(showUploadFile?.show !== "UPLOAD_FILES"){
    return null;
  }
  return (
    <React.Fragment>
      <Modal
        show={true}
        contentClassName='max-w-[500px] p-12'
        className='p-2 px-4'
        onHide={onClose}
        Title="Preview"
        closeButton
      >
        <React.Fragment>
        <FileUpload
          allowedExtensions={["jpg", "png", "webp", "pdf", "jpeg"]}
          onFilesUploaded={console.log}
          multiple={false}
          control={control}
          name="upload"
          rules={{ required: "File is required" }}
        />
      </React.Fragment>
      </Modal>
    </React.Fragment>
  )
}
