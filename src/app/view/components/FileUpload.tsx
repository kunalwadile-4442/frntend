/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable eqeqeq */
import React, { DragEvent, ChangeEvent, useState, useEffect } from "react";
import Icon from "./Icon";
import { App_url } from "../../utils/constants/static";
import { Controller, RegisterOptions } from "react-hook-form";
import { getData, getFileType, postData } from "../../api/rest/fetchData";
import { usePosterReducers } from "../../redux/getdata/usePostReducer";
import SpinnerSm from "./loader/SpinnerSm";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { shortenText } from "../../utils/common";
import { setShowModalPopup } from "../../redux/actions/action";
import Scrollbar from "./Scrollbar";
interface FileUploadProps {
  allowedExtensions: string[];
  onFilesUploaded: (files: File | any[]) => void;
  watch?: any;
  multiple?: boolean;
  name?: string;
  control?: any;
  rules?: Omit<
    RegisterOptions,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  errors?: string;
  className?: string;
  labelClassName?: string;
  uploadClassName?: string;
  label?: string;
  isUpload?: boolean;
  required?: boolean;
  callBackDelete?: Function;
  excelIcon?: boolean;
  renderFilesClassName?: string
}
const FileUpload: React.FC<FileUploadProps> = (props) => {
  const {
    allowedExtensions,
    multiple = false,
    className = "",
    uploadClassName = "",
    isUpload,
    callBackDelete,
    excelIcon,
  } = props;

  const [loader, setLoader] = useState<any>("");
  const [Upload, setIsUpload] = useState(false);
  const [File, setFile] = useState<any>();
  const { user_data } = usePosterReducers();
  const dispatch = useDispatch();
  const [loaderView, setLoaderView] = useState<any>("");

  const RenderFileUpload = ({ field }) => {
    const selected_value = field.value || (multiple ? [] : null);

    const handleDrop = async (e: any) => {
      e.preventDefault();
      const newFiles: any = Array.from(e.dataTransfer.files);
      const filteredFiles = newFiles.filter((file) =>
        allowedExtensions.includes(file.name.split(".").pop()!.toLowerCase())
      );
      await onFilesUploaded(filteredFiles, e);
      e.target.value = null;
    };

    const handleDragOver = (e: any) => {
      e.preventDefault();
    };

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
      setFile(e?.target?.files[0])
      const newFiles = Array.from(e.target.files || []);
      const filteredFiles = newFiles.filter((file) =>
        allowedExtensions.includes(file.name.split(".").pop()!.toLowerCase())
      );
      await onFilesUploaded(filteredFiles, e);
      e.target.value = ""; // Reset the input field to allow re-upload
    };

    const onFilesUploaded = async (fileData: File[], e: any) => {
      if (fileData?.length > 0) {
        setIsUpload(true)
        if (isUpload) {
          const uploadedFiles: any[] = [];
          for (const file of fileData) {
            const formData = new FormData();
            formData.append("file", file, file.name);

            const response = await postData(
              App_url.link.ENDPOINT_LINKS.UPLOAD_FILE,
              formData,
              user_data.accessToken,
              "multipart/form-data"
            );

            if (response.status === 200) {
              uploadedFiles.push(response?.data);
              setIsUpload(false)
            }
          }

          const updatedValue = multiple
            ? [...(Array.isArray(selected_value) ? selected_value : []), ...uploadedFiles]
            : uploadedFiles[0];

          field.onChange(updatedValue);
          props?.onFilesUploaded(updatedValue);
          setIsUpload(false)
        } else {
          const updatedValue = multiple
            ? [...(selected_value || []), ...fileData]
            : fileData[0];
          field.onChange(updatedValue);
          props?.onFilesUploaded(updatedValue);
          setIsUpload(false)
        }
      } else {
        if (e.target.value) {
          toast.error("Please upload the file in PDF format only")
        }
      }
    };

    const formatFileSize = (bytes: number) => {
      if (bytes === 0) return "0 Bytes";
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(1024));
      return Math.round(bytes / Math.pow(1024, i)) + " " + sizes[i];
    };

    const calldownload = async (file_path: any, isDownload: boolean) => {
      if (isUpload) {

        if (isDownload) {
          setLoader(file_path?.id);
        } else {
          setLoaderView(file_path?.id)
        }
        await getData(
          `${App_url.link.ENDPOINT_LINKS.DOC_DOWNLOAD}/${file_path?.name}`,
          user_data?.accessToken,
          dispatch,
          isDownload,
          // selected_value?.original_name
          file_path?.original_name
        );
        if (isDownload) {
          setLoader('');
        } else {
          setLoaderView('')
        }
      }
      else {
        const fileUrl = URL.createObjectURL(File);
        if (File && File.type === "application/pdf") {
          dispatch(setShowModalPopup({
            show: "PREVIEW",
            data: { url: fileUrl, filename: 'fileUrl' },
          }));
        } else {
          const a = document.createElement("a");
          a.href = fileUrl;
          a.download = File.name || "download"; // Set filename
          document.body.appendChild(a);
          a.click();
        }
      }
    };


    const callFileIcon = (item) => {
      const fileType = getFileType((selected_value?.original_name || item?.original_name) || selected_value?.name)
      switch (fileType) {
        case 'pdf':
          return App_url.image.pdf
        case 'png':
          return App_url.image.picture
        case 'jpg':
          return App_url.image.picture
        case 'xlsx':
          return App_url.image.attahment
        default:
          return App_url.image.doc
      }
    }

    function callRemoveFile(index: number) {
      if (Array.isArray(selected_value)) {
        const updatedFiles = selected_value.filter((_, i) => i !== index);
        field.onChange(updatedFiles);
      } else {
        field.onChange(null);
      }
    }


    const getFileNameAndExtension = (fileName,toCharNum) => {
      const parts = fileName.split('.');
      const extension = parts.pop(); // Get last part as extension
      let name = parts.join('.') // Join the rest as filename
      if(name?.length>10){
        name=name?.slice(0,toCharNum);
      }
      return ` ${name}.${extension}` ;
    };

    const renderFiles = (item?: any,index?:number) => {
      console.log('getFileNameAndExtension',getFileNameAndExtension((selected_value?.original_name || item?.original_name) || selected_value?.name,2));

      return (
        <div className={`selected-files   mt-3 h-fit bg-[#F2F2F2] rounded-md p-2 ${props?.renderFilesClassName}`}>
          {/* <h5 className="font-medium">Selected Files</h5> */}
          <ul className="file-list">
            <span className="selected-files">
              <li className={`item flex items-center relative justify-start gap-2`}>

                <img src={callFileIcon(item)} className="h-10" />
                <div>
                  <div className="name text-sm flex gap-3">
                    <div className="text-[#4D5562]">{getFileNameAndExtension((selected_value?.original_name || item?.original_name) || selected_value?.name,5)}</div>
                    <div><span className="text-[#4D5562]">File Size:</span>{" "}
                      <b className="text-[#0B0B0B]">{formatFileSize((selected_value?.size || item?.size) || (selected_value?.file_size || item?.file_size))}</b></div>
                  </div>
                </div>
                <div className="remove absolute right-1 cursor-pointer">
                  {isUpload &&
                    <div className="flex gap-2 ">
                      {loaderView!==(selected_value?.id || item?.id) ? (
                        <Icon
                          attrIcon={App_url.image.eye}
                          className="ml-2 cursor-pointer  border border-primary"
                          onClick={() =>
                            calldownload(selected_value?.name?selected_value:item, false)
                          }
                        />
                      ) : (
                        <div className="ml-2 ">
                          <SpinnerSm />
                        </div>
                      )}
                      {loader!==(selected_value?.id || item?.id) ? (
                        <Icon
                          attrIcon={App_url.image.Download}
                          className="ml-2 cursor-pointer  border border-primary"
                          onClick={() =>
                            calldownload(selected_value?.name?selected_value:item, true)
                          }
                        />
                      ) : (
                        <div className="ml-2 ">
                          <SpinnerSm />
                        </div>
                      )}

                      <Icon
                        onClick={()=>callRemoveFile(index)}
                        attrIcon={App_url.image.Delete}
                        className="danger ml-2"
                      />
                    </div>}
                  {!isUpload &&
                    <div className="flex gap-1 mt-6">
                      {loaderView!==(selected_value?.id || item?.id) ? <Icon
                        attrIcon={App_url.image.eye}
                        className="ml-2 cursor-pointer"
                        onClick={() =>
                          calldownload(selected_value?.name?selected_value:item, false)
                        }
                      /> :
                        <SpinnerSm />}
                      <Icon
                        onClick={() => field.onChange(null)}
                        attrIcon={App_url.image.Delete}
                        className="danger ml-1"
                      />
                    </div>
                  }
                </div>
              </li>
            </span>
          </ul>

        </div>
      )
    }

    return (
      <>
        {props?.label && (
          <label className={`block mb-1 ${props?.labelClassName}`}>
            {props?.label}
            {props?.required && <span className="text-red-500">*</span>}
          </label>
        )}
        <div className={`file-component ${props?.className}`}>
          <label
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            htmlFor={`fileUpload-${props?.name}`}
            className="uploadFile h-fit"
          >
           {Upload?<SpinnerSm/>: <Icon attrIcon={App_url.image.FileUpload} className="lg" />}
            <p className={`${className}`}>Upload Document</p>
            <input
              type="file"
              accept={allowedExtensions?.map((ext) => `.${ext}`).join(", ")}
              multiple={multiple}
              onChange={handleFileChange}
              style={{ display: "none" }}
              id={`fileUpload-${props?.name}`}
              disabled={Upload}
            />
            <label
              htmlFor={`fileUpload-${props?.name}`}
              className={`${uploadClassName}`}
            >
              Upload document file in{" "}
              {allowedExtensions?.map((item, index) => (
                <React.Fragment key={index}>
                  {item} {allowedExtensions?.length === index + 1 ? "" : `/`}
                </React.Fragment>
              ))}
            </label>
            {props?.errors && (
            <span className="text-red-500 text-xsm">{props?.errors}</span>
          )}
          </label>
          {Array.isArray(selected_value) ? (
            <Scrollbar style={{height:'40vh',width:'100vh'}}>{selected_value?.map((item,index) => (
              renderFiles(item,index)
            ))
            }</Scrollbar>
          ) : selected_value?renderFiles():<></>}

        </div>
      </>
    );
  };

  return (
    <Controller
      name={props?.name}
      control={props?.control}
      rules={props?.rules}
      render={RenderFileUpload}
    />
  );
};

export default FileUpload;

interface FileItemProps {
  file: any;
  index: number;
  onRemove: () => void;
  calldownload: (file_path: any, isDownload: boolean) => Promise<void>;
  loader: string;
  loaderView: string;
  isUpload?: boolean;
}

const FileItem: React.FC<FileItemProps> = ({
  file,
  index,
  onRemove,
  calldownload,
  loader,
  loaderView, isUpload
}) => {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i)) + " " + sizes[i];
  };

  return (
    <li
      key={index}
      className="item flex items-center relative justify-start h-10"
    >
      <span className="name text-sm">
        <p>{(file?.original_name && shortenText(file?.original_name, 50)) || file?.name}{" "}</p>
        {file?.file_size || file?.size ? (
          <>
            <span>File Size:</span>{" "}
            <b>{formatFileSize(file?.file_size || file?.size)}</b>
          </>
        ) : null}
      </span>
      {isUpload && <div className="remove absolute right-1 cursor-pointer flex">
        {loaderView !== file?.id ? (
          <Icon
            attrIcon={App_url.image.eye}
            className="ml-2 cursor-pointer  border border-primary"
            onClick={() => calldownload(file, false)}
          />
        ) : (
          <SpinnerSm />
        )}

        {loader !== file?.id ? (
          <Icon
            attrIcon={App_url.image.Download}
            className="ml-2 cursor-pointer  border border-primary"
            onClick={() => calldownload(file, true)}
          />
        ) : (
          <SpinnerSm />
        )}

        <Icon
          onClick={onRemove}
          attrIcon={App_url.image.Delete}
          className="danger ml-2"
        />
      </div>}
    </li>
  );
};
