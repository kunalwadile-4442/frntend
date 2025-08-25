/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable eqeqeq */
import { Control, Controller, UseFormRegister, UseFormReset, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { usePosterReducers } from "../../redux/getdata/usePostReducer";
import InputField from "./InputField";
import React, { useState } from "react";
import { App_url } from "../../utils/constants/static";
import Icon from "./Icon";
import UploadButton from "./button/UploadButton";
import { getData } from "../../api/rest/fetchData";
import { useDispatch } from "react-redux";
import SpinnerSm from "./loader/SpinnerSm";
import { IContactPerson } from "../../redux/modules/common/customers/types";

interface IDocumentUpload {
    reset: UseFormReset<any>;
    control: Control<any>;
    errors: any;
    watch: UseFormWatch<any>;
    register: UseFormRegister<any>;
    setValue: UseFormSetValue<any>;
    document_name: string;
    file_name: string;
    name: string;
    className?: string;
    document_placeholder?: string;
    document_label?: string;
    title?: string;
    noBottomBorderClassName?: string;
    noGrid?: string;
    bgCssClassName?: string;
    circlePlusIcon?: boolean;
    showTrashIcon?: boolean;
    downloadBtnIcon?: boolean;
    eyeBtnIcon?: boolean;
}

const DocumentUpload = (props: IDocumentUpload) => {
    const { reset, control, errors, watch, register, setValue } = props;
    const [Loader, setLoader] = useState('')
    const [LoaderView, setLoaderView] = useState('')
    const { user_data } = usePosterReducers();

    const callAddPerson = () => {
        reset((state) => {
            const documents = [];
            if (state?.[props?.name]) {
                state?.[props?.name]?.map((item) => documents.push(item));
            }
            documents.push({
                [props?.document_name]: "",
                [props?.file_name]: "",
            });
            return {
                ...state,
                [props?.name]: documents,
            };
        });
    };

    const callSupplierPerson = (index) => {
        reset((state) => {
            const documents = state?.[props?.name]?.filter(
                (item, index1) => index1 != index
            );
            return {
                ...state,
                [props?.name]: documents,
            };
        });
    };

    const dispatch = useDispatch()
    const renderController = ({ field, fieldState }) => {

        return (
            <React.Fragment>
                {field?.value?.length > 0 && field?.value?.map((item: IContactPerson, index) => {
                    const callDownloadFile = async (file_path: any, isDownload: boolean,) => {
                        if (isDownload)
                            setLoader(index);
                        else setLoaderView(index);
                        await getData(`${App_url.link.ENDPOINT_LINKS.DOC_DOWNLOAD}/${file_path?.[props?.file_name]?.name}`, user_data?.accessToken, dispatch, isDownload, file_path?.[props?.file_name]?.original_name);
                        if (isDownload)
                            setLoader("");
                        else setLoaderView("");

                    }
                    // const file:any=watch(`documents`)
                    const file: any = watch(`${props?.name}.${index}`)
                    return (
                        <React.Fragment key={index}>
                            <div className={`border-b pb-1 pt-4 flex justify-between items-center ${props?.noBottomBorderClassName} whitespace-nowrap !w-80 `}>
                                <p className=" font-semibold flex items-center">
                                    {props?.title}
                                    <React.Fragment>
                                        <span className="ml-2 ">
                                            - {index + 1} Details
                                            {!props?.showTrashIcon && !file?.[props?.document_name] && !file?.[props?.file_name] && (
                                                <Icon
                                                    attrIcon={App_url.image.DeleteDetails}
                                                    className="danger ml-2 cursor-pointer"
                                                    onClick={() => callSupplierPerson(index)}
                                                />
                                            )}
                                        </span>
                                    </React.Fragment>
                                </p>
                                {index + 1 == field?.value?.length && (
                                    <button
                                        className="button button-sm button-text-green"
                                        type="button"
                                        onClick={callAddPerson}
                                    >
                                        {/* {props?.circlePlusIcon ? <img src={App_url.image.circlePlusIcon} /> : `+ Add More`} */}
                                        {!props?.circlePlusIcon && `+ Add More`}
                                    </button>
                                )}
                            </div>
                            <div className={`grid grid-cols-3 pt-2 ${props?.noGrid} ${props?.bgCssClassName}`}>
                                {props?.showTrashIcon && (index != 0) && (
                                    <React.Fragment>
                                        <span className="ml-2">
                                            {!file?.[props?.document_name] && !file?.[props?.file_name] && (
                                                <Icon
                                                    attrIcon={App_url.image.TrashIcon}
                                                    className="danger ml-2 cursor-pointer float-end"
                                                    onClick={() => callSupplierPerson(index)}
                                                />
                                            )}
                                        </span>
                                    </React.Fragment>
                                )}
                                <InputField
                                    name={`${props?.document_label}`}
                                    placeholder={`${props?.document_placeholder}`}
                                    className="px-2 w-auto"
                                    inputClassName="h-10 rounded-md "
                                    register={register(`${props?.name}.${index}.${props?.document_name}`, {
                                        required: `${props?.document_label} is required`,
                                        maxLength: {
                                            value: 255,
                                            message: `${props?.document_label} cannot exceed 255 characters`,
                                        },
                                    })}
                                    error={errors?.[index]?.[props?.document_name]}
                                    required
                                />
                                <div className="flex items-center justify-center mt-3 px-2">
                                    <UploadButton
                                        setValue={setValue}
                                        control={control}
                                        reset={reset}
                                        name={`${props?.name}.${index}.${props?.file_name}`}
                                        className="mt-auto"
                                        uploadBtnClassName="!bg-primary !text-white !w-[23.5rem] px-2 hover:!text-primary hover:!bg-white hover:!border-primary !text-center !w-full"
                                        showFilePreview
                                    />
                                    {file?.[props?.file_name] && (
                                        <div className="absolute flex gap-4 mt-auto py-[9px] px-3">
                                            {Loader !== index ? <div className="bg-white rounded-md px-4 py-3 ">
                                                <Icon
                                                    attrIcon={!props?.downloadBtnIcon ? App_url.image.Download : App_url.image.Download}
                                                    className="cursor-pointer  border border-primary !w-6 !h-6"
                                                    onClick={() => callDownloadFile(file, true)}
                                                />
                                            </div> : <div className="bg-white rounded-md px-4 py-4"><SpinnerSm /></div>}
                                            {LoaderView !== index ? <div className="bg-white rounded-md px-4 py-3 ">
                                                <Icon
                                                    attrIcon={!props?.eyeBtnIcon ? App_url.image.eye : App_url.image.eye}
                                                    className="cursor-pointer  border border-primary !w-6 !h-6"
                                                    onClick={() => callDownloadFile(file, false)}
                                                />
                                            </div> : <div className="bg-white rounded-md px-4 py-4"><SpinnerSm /></div>}
                                        </div>
                                    )}
                                </div>
                            </div>
                            {props?.circlePlusIcon &&
                                <div className="flex justify-center mt-2">
                                    {index + 1 == field?.value?.length && (
                                        <button
                                            className="button button-sm button-text-green"
                                            type="button"
                                            onClick={callAddPerson}
                                        >
                                            <img src={App_url.image.circlePlusIcon} />
                                        </button>
                                    )}
                                </div>
                            }
                        </React.Fragment>
                    )
                })
                }
            </React.Fragment >
        );
    };
    const documents = watch(props?.name);

    return (
        <React.Fragment>
            {(documents?.length == 0 || !documents) && (
                <div className={`border-b pb-1 pt-3 flex justify-between items-center ${props?.noBottomBorderClassName}`}>
                    <p className=" font-semibold">{props?.title}
                        {documents?.length > 0 && (
                            <React.Fragment>
                                <span className="ml-2 ">
                                    - {0 + 1}
                                    <Icon
                                        attrIcon={App_url.image.DeleteDetails}
                                        className="danger ml-2 cursor-pointer"
                                        onClick={() => callSupplierPerson(0)}
                                    />
                                </span>
                            </React.Fragment>
                        )}

                    </p>
                    <button
                        className="button button-sm button-text-green"
                        type="button"
                        onClick={callAddPerson}
                    >
                        {props?.circlePlusIcon ? <img src={App_url.image.circlePlusIcon} /> : `+ Add More`}
                    </button>
                </div>
            )}
            <div className={`${props?.className}`}>
                <Controller
                    name={props?.name}
                    control={control}
                    defaultValue={null}
                    // rules={{ required: "Documents is required" }}
                    render={renderController}
                />
                {(errors?.message) && (
                    <span className="text-xsm text-red-500">
                        {errors?.message}
                    </span>
                )}
            </div>
        </React.Fragment>
    );
};

export default DocumentUpload;
