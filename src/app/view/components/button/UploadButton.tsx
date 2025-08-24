import React, { useEffect, useState } from "react";
import { Controller, useWatch } from "react-hook-form";
import { getData, postData } from "../../../api/rest/fetchData";
import { App_url } from "../../../utils/constants/static";
import { usePosterReducers } from "../../../redux/getdata/usePostReducer";
import WarnPopup from "../layout/popup/WarnPopup";
import { toast } from "react-toastify";
import { FaFilePdf } from "react-icons/fa6";
import SpinnerSm from "../loader/SpinnerSm";
import { shortenText } from "../../../utils/common";
import { useDispatch } from "react-redux";
import { setFormLoader } from "../../../redux/actions/action";
import Icon from "../Icon";
interface IUploadButtonTypes {
  className?: string;
  reset: any;
  control: any;
  name: string;
  setValue: any;
  rules?: any;
  error?: any;
  disabled?: boolean;
  uploadBtnClassName?: string;
  showFilePreview?: boolean;
  label?: string;
  isLoader?: boolean;
  fileShow?:boolean
}
const UploadButton: React.FC<IUploadButtonTypes> = (prop) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { user_data } = usePosterReducers();
  const [loader, setLoader] = useState(false);
  const fileField = useWatch({
    control: prop.control,
    name: prop.name,
  });

  useEffect(() => {
    if (fileField && fileField.name) {
      setSelectedFile(fileField);
    }
  }, [fileField]);
  const allowedExtensions = ["jpg", "png", "webp", "pdf", "jpeg"];

  const handleFileChange = async (e, field) => {
    const newFiles = Array.from(e.target.files || []);
    const filteredFiles = newFiles.filter((file: any) =>
      allowedExtensions.includes(file.name.split(".").pop()!.toLowerCase())
    );
    await onFilesUploaded(filteredFiles, e, field);
  };
  const dispatch = useDispatch();
  const onFilesUploaded = async (fileData, e, field) => {
    if (fileData?.length > 0) {
      if (prop?.isLoader) {
        dispatch(setFormLoader({ flag: true, name: 'FORM_POPUP' }));
      }
      const file = fileData[0];
      setSelectedFile(file);
      setLoader(true);
      const formData = new FormData();
      formData.append("file", file, file.name);
      const response = await postData(
        App_url.link.ENDPOINT_LINKS.UPLOAD_FILE,
        formData,
        user_data.access_token,
        "multipart/form-data"
      );
      if (response.status === 200) {
        prop.setValue(prop.name, response.data);
        field.onChange(response.data);
        if (prop?.isLoader) {
          dispatch(setFormLoader({ flag: false, name: 'FORM_POPUP' }));
        }
      } else {
        prop.setValue(prop.name, "");
        setSelectedFile(null);
        if (prop?.isLoader) {
          dispatch(setFormLoader({ flag: false, name: 'FORM_POPUP' }));
        }
      }
      setLoader(false);
    } else {
      if (e.target.value) {
        toast.error("Please upload image or document file");
      }
      prop.setValue(prop.name, "");
      setSelectedFile(null);
      e.target.value = "";
    }
  };

  const loadImageModal = () => {
    if (selectedFile?.original_name) {
      return `${import.meta.env.VITE_APP_ENDPOINT_URL}${App_url?.link?.ENDPOINT_LINKS?.DOC_DOWNLOAD}/${selectedFile?.name}`;
    } else if (selectedFile instanceof File) {
      const objectURL = URL.createObjectURL(selectedFile);
      return objectURL;
    }
  };

  const renderFilePreview = () => {
    if (!selectedFile) return null;
    const objectURL = loadImageModal();
    const fileExtension = (selectedFile?.original_name || selectedFile?.name)
      ?.split?.(".")
      ?.pop()
      ?.toLowerCase?.();
    if (fileExtension && fileExtension === "pdf") {
      return (
        <div className="flex items-center space-x-2">
          <div className="relavtive flex items-center justify-center backdrop-brightness-75 rounded-md shadow-md px-2 py-4">
            <FaFilePdf className="text-red-500 w-[180px] h-[150px] rounded-md opacity-10" />
          </div>
        </div>
      );
    }
    if (fileExtension && allowedExtensions) {
      return (
        <div className="flex items-center space-x-2">
          <div className="relavtive backdrop-brightness-50 rounded-md shadow-md px-2 py-4">
            <img
              src={objectURL}
              alt="preview"
              className="w-[360px] h-[350px] rounded-md opacity-10 object-cover"
            />
          </div>
        </div>
      );
    }
    return null;
  };

  const renderUploadFiles = (field) => {
    const ErrorInfo = ({ error }) => {
      if (!error) {
        return <React.Fragment></React.Fragment>;
      }
      return (
        <div className="min-h-4 py-[0.15rem]">
          <div className="flex items-center">
            <img className="h-[0.5rem]" src={App_url.image.info} alt="" />
            <p className="text-xs mx-1 text-red-600  text-left">
              {error?.message || error}
            </p>
          </div>
        </div>
      );
    };

    function handleRemoveFile() {
      prop.setValue(prop.name, "");
      setSelectedFile(null);
    }

    const callDownload = async (file_path: any, isDownload: boolean) => {
      if (file_path?.original_name) {


        setLoader(true);

        await getData(
          `${App_url.link.ENDPOINT_LINKS.DOC_DOWNLOAD}/${file_path?.name}`,
          user_data?.access_token,
          dispatch,
          isDownload,
          file_path?.original_name
        );

        setLoader(false);

      }
    };

    return (
      <>
        <div className="text-sm">
          {selectedFile ? (
            <div className="flex items-center space-x-2 py-2 relative">
              {loader && prop?.showFilePreview && (
                <div className="absolute w-full flex justify-center items-center h-full">
                  {" "}
                  <SpinnerSm />
                </div>
              )}
              {prop?.showFilePreview ? (
                renderFilePreview()
              ) : (
                <>
                  <span className="text-gray-700 ellipse">
                    {shortenText(
                      selectedFile?.original_name || selectedFile?.name,
                      37
                    )}
                  </span>
                  {loader ? (
                    <SpinnerSm />
                  ) : (
                    <div className="flex items-center gap-2">
                      {prop?.fileShow&&(loader ? <SpinnerSm /> : <Icon attrIcon={App_url.image.eye} className="cursor-pointer" onClick={() => callDownload(selectedFile, false)} />)}
                      <button
                        type="button"
                        onClick={handleRemoveFile}
                        className="text-red-500 hover:text-red-700"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            <div>
              <label
                className={`${prop?.disabled && "opacity-60 pointer-events-none"
                  } inline-block px-4 py-2 border border-primary text-primary rounded cursor-pointer hover:bg-primary hover:text-white !whitespace-nowrap ${prop?.uploadBtnClassName
                  }`}
              >
                {prop?.label || 'Upload Document'}
                <input
                  type="file"
                  onChange={(e) => {
                    handleFileChange(e, field);
                  }}
                  className="hidden"
                  disabled={prop?.disabled}
                />
              </label>
            </div>
          )}
        </div>
        <ErrorInfo error={prop.error} />
      </>
    );
  };
  return (
    <div className={`${prop.className}`}>
      <Controller
        name={prop.name}
        control={prop.control}
        rules={prop.rules ? prop.rules() : undefined}
        render={({ field }) => renderUploadFiles(field)}
      />

      <WarnPopup
        content={{
          title: "Remove File",
          description: "Are you sure you want to remove this file ?",
          submit: "Submit",
          close: "Close",
        }}
      />
    </div>
  );
};

export default UploadButton;
