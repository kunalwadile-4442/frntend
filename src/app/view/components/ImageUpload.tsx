import React, { ChangeEvent, useRef, useState } from "react";
import Icon from "./Icon";
import { App_url } from "../../utils/constants/static";
import { Controller, RegisterOptions } from "react-hook-form";
import { postData } from "../../api/rest/fetchData";
import { usePosterReducers } from "../../redux/getdata/usePostReducer";
import SpinnerSm from "./loader/SpinnerSm";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import image from "../../asset/images/picture.svg";


export interface FileData {
    file: string | any;
    id: string;
    name: string;
    original_name: string;
    file_type: string;
    file_size: string;
    is_thumbnails: string;
    active: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    author: string;
  }
interface FileUploadProps {
    allowedExtensions: string[];
    onFilesUploaded: (file: File | null) => void;
    name?: string;
    control?: any;
    rules?: Omit<RegisterOptions, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled">;
    errors?: string;
    className?: string;
    labelClassName?: string;
    uploadClassName?: string;
    label?: string;
    isUpload?: boolean;
    required?: boolean;
    defaultDoc?: FileData[];
    callBackDelete?: Function;
}

const ImageUpload: React.FC<FileUploadProps> = (props) => {
    const { allowedExtensions, className = "", uploadClassName = "", isUpload } = props;

    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const { user_data } = usePosterReducers();
    const dispatch = useDispatch();
    const fileInputRef = useRef<HTMLInputElement | null>(null); 

    const RenderFileUpload = ({ field }) => {
        const selectedFile = field.value || null;

        const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
            const selectedFile = e.target.files ? e.target.files[0] : null;
            if (!selectedFile) return;

            const fileExtension = selectedFile.name.split(".").pop()?.toLowerCase();
            if (!allowedExtensions.includes(fileExtension!)) {
                toast.error("Invalid file format. Please upload a valid file.");
                return;
            }

            setFile(selectedFile);
            setUploading(true);

            if (isUpload) {
                const formData = new FormData();
                formData.append("file", selectedFile, selectedFile.name);

                const response = await postData(
                    App_url.link.ENDPOINT_LINKS.UPLOAD_FILE,
                    formData,
                    user_data.accessToken,
                    "multipart/form-data"
                );
                console.log("Image uploaded::", response);

                if (response.status === 200) {
                    field.onChange(response?.data);
                    props?.onFilesUploaded(response?.data);
                }
            } else {
                field.onChange(selectedFile);
                props?.onFilesUploaded(selectedFile);
            }

            setUploading(false);
        };

        const handleFileRemove = () => {
            setFile(null);
            field.onChange(null);
            props?.onFilesUploaded(null);
            
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        };

        const ErrorInfo = ({ error }) => {
            if (!error) return null;
            return (
                <div className="min-h-4 py-[0.15rem] flex items-center">
                    <img className="h-[0.5rem]" src={App_url.image.info} alt="error info" />
                    <p className="text-xs mx-1 text-red-600 text-left">{error?.message || error}</p>
                </div>
            );
        };

        return (
            <>
                {(props.name || props?.label) && (
                    <p className={`text-[#4E4E4E] text-sm ${props.labelClassName} whitespace-nowrap`}>
                        {props?.label || props.name}
                        {props.required && <span className="text-red-600"> *</span>}
                    </p>
                )}
                <div className={`file-component ${props?.className}`}>
                    <label htmlFor={`fileUpload-${props?.name}`} className="uploadFile h-fit">
                        {uploading ? <SpinnerSm /> : <Icon attrIcon={App_url.image.FileUpload} className="lg" />}
                        <p className={`${className}`}>Upload Image</p>
                        <input
                            type="file"
                            accept={allowedExtensions?.map((ext) => `.${ext}`).join(", ")}
                            onChange={handleFileChange}
                            ref={fileInputRef} 
                            style={{ display: "none" }}
                            id={`fileUpload-${props?.name}`}
                            disabled={uploading}
                        />
                        <label htmlFor={`fileUpload-${props?.name}`} className={`${uploadClassName}`}>
                            Upload Image file in {allowedExtensions.join(" / ")}
                        </label>
                    </label>
                    {selectedFile && (
                        <div className="relative selected-file h-32 w-32 bg-[#F2F2F2] rounded-md p-2 flex items-center justify-center">
                            <button
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs"
                                onClick={handleFileRemove}
                            >
                                ✕
                            </button>
                            <img src={selectedFile} alt="image" className="rounded-md" />
                        </div>
                    )}
                </div>
                {ErrorInfo({ error: props.errors })}
            </>
        );
    };

    return <Controller name={props?.name} control={props?.control} rules={props?.rules} render={RenderFileUpload} />;
};

export default ImageUpload;