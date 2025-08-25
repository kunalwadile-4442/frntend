/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-mixed-operators */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import FormPopup from "./layout/popup/FormPopup";
import InputField from "./InputField";
import { useForm } from "react-hook-form";
import { useWebSocket } from "../../api/websocket/WebSocketContext";
import { useUiReducer } from "../../redux/getdata/useUiReducer";
import Multiselect from "./Multiselect";
import { usePosterReducers } from "../../redux/getdata/usePostReducer";
import { useDispatch } from "react-redux";
import { setFormPopup } from "../../redux/actions/action";
import { IEmailTypes } from "../../redux/modules/frontOffice/distribution/types";
import { postData } from "../../api/rest/fetchData";
import { extractTextFromHTML, formatDate2 } from "../../utils/common";
import { setEmailDetail } from "../../redux/modules/frontOffice/distribution/action";
import { ValidateForm } from "../../utils/constants/static";
import FileUpload from "./FileUpload";
import CheckboxList from "./button/CheckBoxList";
import { FileData, ProjectListTypes } from "../../redux/modules/backOffice/projectManagement/types";

interface IRestTypes {
  url: string;
  body?: object;
}
interface ISendFormProps {
  content: { title: string; submit: string };
  request?: any;
  isDefault?: string;
  renderItem?: React.ReactNode;
  restURL?: IRestTypes;
  is_mail?: boolean;
  mail?: boolean;
  renderDetails?: React.ReactNode;
  upload?: {
    name: any;
    title: string;
    required?: boolean;
    multiple?: boolean;
    allowedExtensions?: string[];
    defaultValue?: FileData[];
  };
  onSubmitCallback?: (data: IEmailTypes, is_mail?: boolean) => void;
  onOptionCallback?: (data: string[]) => void;
  checkboxList?: { value: string; label: string }[];
  isSubmission?: ProjectListTypes;
  callBackDelete?: Function;
  isSubject?: boolean;
  isMailTemplate?: boolean;
  staticBody?: any;
}
const SendMailCopy: React.FC<ISendFormProps> = ({ ...prop }) => {
  const {
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
    register,
    formState: { errors },
  } = useForm<IEmailTypes>({
    defaultValues: {
      option: [], // Ensure the field is initialized as an array
    },
  });
  const { isSubject = true, isMailTemplate = true,staticBody } = prop;
  const { socketResponse, email_details } = usePosterReducers();
  const { clearForm } = useUiReducer();
  const [loader, setLoader] = useState(false);
  const { send } = useWebSocket();
  const { user_data } = usePosterReducers(); //
  const dispatch = useDispatch();

  useEffect(() => {
    if (prop?.upload?.defaultValue) {
      setValue(prop?.upload?.name, prop?.upload?.defaultValue);
    } else {
      if (prop?.upload?.multiple) setValue(prop?.upload?.name, []);
      else setValue(prop?.upload?.name, null);
    }
  }, [prop?.upload?.defaultValue]);

  useEffect(() => {
    if (
      socketResponse?.action == prop?.request?.action &&
      socketResponse?.type == prop?.request?.type
    ) {
      setLoader(false);
      if (
        socketResponse?.request?.payload?.inquiry_id ===
        prop?.request?.payload?.inquiry_id &&
        socketResponse?.status
      ) {
        dispatch(setFormPopup({ status: "hide" }));
        dispatch(setEmailDetail(null));
        reset();
      }
    }
  }, [socketResponse]);

  // useEffect(() => {
  // if(clearForm?.status!=="hide" && prop?.onOptionCallback){
  //   prop?.onOptionCallback(option)
  // }
  // }, [option])

  function onSubmit(data: IEmailTypes, is_mail: boolean) {
    // const finalData={...data, is_mail: is_mail}
    if (prop?.onSubmitCallback) {
      prop?.onSubmitCallback(data, is_mail);
      return;
    }
    if (data.email_subject != undefined) {
      data.email_subject = extractTextFromHTML(data?.email_subject);
    }
    if (Array.isArray(data?.email_to)) {
      data.email_to = "";
    }
    if (Array.isArray(data?.email_bcc)) {
      data.email_bcc = "";
    }
    if (Array.isArray(data?.email_cc)) {
      data.email_cc = "";
    }

    if (prop.restURL) {
      setLoader(true);
      postData(
        prop.restURL.url,
        { ...data, id: prop?.restURL?.body, is_mail: is_mail },
        user_data.accessToken
      ).then(() => {
        setLoader(false);
        dispatch(setFormPopup({ status: "hide" }));
        // toast.success("Email Sent Successfully !");
      });
    } else {
      const updatedPayloadSocket = {
        ...prop.request.payload,
        ...data,
        is_mail: is_mail,
      };
      if (clearForm?.po_rdd) {
        updatedPayloadSocket.po_delivery_date = formatDate2(clearForm?.po_rdd);
      }
      const updatedRequest = {
        ...prop.request,
        payload: updatedPayloadSocket,
        demo: { loader: true },
      };
      setLoader(true);
      send(updatedRequest);
    }
  }

  const multiSubmitOptions = [
    {
      label: "Mark as sent",
      callBack: (e) => onSubmit(e, true),
      className: "bg-white border border-gray text-black hover:bg-gray-300",
    },
    { label: "Send", callBack: (e) => onSubmit(e, false) },
  ];
  const multiSubmitOptions2 = [
    { label: "Send", callBack: (e) => onSubmit(e, false) },
  ];
  useEffect(() => {
    if (
      clearForm?.name == prop?.content?.title &&
      prop.isDefault &&
      isMailTemplate
    ) {
      send({
        type: "emailTemplateService",
        action: "get",
        payload: { name: prop.isDefault },
      });
    }
  }, [prop.isDefault, clearForm?.name]);

  useEffect(() => {
    if (
      email_details?.name != "" &&
      clearForm?.name == prop?.content?.title &&
      prop?.isDefault
    ) {
      let payload: any = {
        email_to: email_details?.email_to,
        email_body: email_details?.email_body,
        email_subject: email_details?.email_subject,
      };
      if (prop?.isSubmission) {
        payload = {
          ...payload,
          email_to: prop?.isSubmission?.coordinator_email,
          email_cc: prop?.isSubmission?.submission_email_chain,
          email_bcc: email_details?.email_to,
        };
      }

      reset(payload);
    }
    if(staticBody){
      reset(staticBody)
    }
    else {
      reset();
    }
  }, [email_details?.name, clearForm?.name, clearForm?.status]);

  useEffect(() => {
    if (prop?.checkboxList) {
      setValue("option", []);
    }
  }, [clearForm?.status]);

  return (
    <FormPopup
      isCenter
      content={prop.content}
      handleSubmit={handleSubmit}
      multiSubmit={prop.mail ? multiSubmitOptions : multiSubmitOptions2}
      loader={loader}
      loader_action={[
        `inquiryService:supplier`,
        `inquiryService:supplier_sale`,
        `inquiryService:supplier_price`,
        `inquirySaleService:po`,
        `submissionService:create`,
        `listLogService:submission`,
        `frontReportService:sendAgingReport`,
        `${prop?.request?.type}:${prop?.request?.action}`,
      ]}
    >
      {prop.checkboxList && (
        <CheckboxList
          optionsList={prop?.checkboxList}
          name={"option"}
          control={control}
          onCallBackChange={prop?.onOptionCallback}
        />
      )}
      {prop.renderDetails && prop.renderDetails}
      {prop?.upload && (
        <div className="mb-2">
          <p className="font-semibold">
            {prop?.upload?.title}
            {prop?.upload?.required && <span className="text-red-600"> *</span>}
          </p>
          <FileUpload
            callBackDelete={prop?.callBackDelete}
            allowedExtensions={
              prop?.upload?.allowedExtensions || [
                "jpg",
                "png",
                "webp",
                "pdf",
                "jpeg",
              ]
            }
            onFilesUploaded={console.log}
            multiple={prop?.upload?.multiple}
            control={control}
            isUpload
            errors={errors?.[prop?.upload?.name]?.message}
            name={prop?.upload?.name}
            required={prop?.upload?.required}
            rules={prop?.upload?.required && { required: "File is required" }}
          />
        </div>
      )}

      {prop?.isSubmission ? (
        <>
          <Multiselect label="To" name="email_to" control={control} />
          <Multiselect label="CC" name="email_cc" control={control} />
          <Multiselect label="Bcc" name="email_bcc" control={control} />
        </>
      ) : (
        <Multiselect label="CC" name="email_to" control={control} />
      )}

      {isSubject && (
        <InputField
          name={"Email Subject"}
          register={register("email_subject", {
            required: "Email Subject is required",
          })}
          useFor="editor"
          control_name="email_subject"
          control={control}
          required
          placeholder={"Enter Email Subject"}
          inputClassName="rounded-md"
          error={errors.email_subject}
          textEditorOption={{ isToolbar: false }}
          tagPage={prop.isDefault}
          rules={{ ...ValidateForm.textEditor("Email Subject") }}
        />
      )}

      <div className="my-4">
        <InputField
          name={"Email Preview"}
          register={register("email_body", {
            required: "Email Preview is required",
          })}
          useFor="editor"
          control_name="email_body"
          control={control}
          required
          placeholder={"Enter Email Preview"}
          inputClassName="h-64 rounded-md"
          error={errors.email_body}
          innerRender={prop.renderItem}
          textEditorOption={{ isToolbar: true }}
          tagPage={prop.isDefault}
          rules={{ ...ValidateForm.textEditor("Email Preview") }}
        />
      </div>
    </FormPopup>
  );
};

export default SendMailCopy;
