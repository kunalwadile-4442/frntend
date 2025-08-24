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
import { setEmailDetail, setTaxDetails } from "../../redux/modules/frontOffice/distribution/action";
import { ValidateForm } from "../../utils/constants/static";

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
  mai?: boolean;
  renderDetails?:React.ReactNode;
}
const SendMail: React.FC<ISendFormProps> = (prop) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<IEmailTypes>();
  const { socketResponse, email_details } = usePosterReducers();

  const { clearForm } = useUiReducer();
  const [loader, setLoader] = useState(false);
  const { send } = useWebSocket();
  const { user_data } = usePosterReducers(); //
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (
      (socketResponse?.action == prop?.request?.action && socketResponse?.type == prop?.request?.type)
    ) {
      setLoader(false);
      if ( socketResponse?.request?.payload?.inquiry_id === prop?.request?.payload?.inquiry_id && socketResponse?.status ) {
        dispatch(setFormPopup({ status: "hide" }));
        dispatch(setEmailDetail(null))
        reset({email_to:'',email_body:''});
      reset()
      }
    }
  }, [socketResponse]);

  function onSubmit(data: IEmailTypes,is_mail:boolean) {
    // const finalData={...data, is_mail: is_mail}
    if(data.email_subject != undefined){
      data.email_subject = extractTextFromHTML(data?.email_subject)
    }
    if (prop.restURL) {
      setLoader(true);
      postData(
        prop.restURL.url,
        { ...data, id: prop?.restURL?.body,is_mail: is_mail },
        user_data.access_token
      ).then((resp) => {
        setLoader(false);
        dispatch(setFormPopup({status:'hide'}))
        // toast.success("Email Sent Successfully !");
      });
    } else {
      const updatedPayloadSocket = {
        ...prop.request.payload,
        ...data,is_mail:is_mail
      };
      if(clearForm?.po_rdd){
        updatedPayloadSocket.po_delivery_date = formatDate2(clearForm?.po_rdd)
      }
      const updatedRequest = {
        ...prop.request,
        payload: updatedPayloadSocket,
        demo: { loader: true },
      };
      setLoader(true);
      send(updatedRequest);
      // dispatch(setTaxDetails(null))
    }
  }

  const multiSubmitOptions = [
    { label: 'Mark as sent', callBack:(e)=> onSubmit(e,true),className: "bg-white border border-gray text-black hover:bg-gray-300" },
    { label: "Send", callBack:(e)=> onSubmit(e,false) },
  ];
  const multiSubmitOptions2 = [
    { label: "Send", callBack:(e)=> onSubmit(e,false) },
  ];
  useEffect(() => {
    if (clearForm?.name == prop?.content?.title) {
      prop.isDefault &&
        send({
          type: "emailTemplateService",
          action: "get",
          payload: { name: prop.isDefault },
        });
    }
  }, [prop.isDefault, clearForm?.name]);

  useEffect(() => {
    if(email_details?.name!="" &&  clearForm?.name == prop?.content?.title){
      reset({
        email_to: email_details?.email_to,
        email_body: email_details?.email_body,
        email_subject: email_details?.email_subject,
      });
    }
  }, [email_details?.name, clearForm?.name]);

  return (
    <FormPopup
      isCenter
      content={prop.content}
      handleSubmit={handleSubmit}
      multiSubmit={prop.mai?multiSubmitOptions:multiSubmitOptions2}
      loader={loader}
      loader_action={[
        `inquiryService:supplier`,
        `inquiryService:supplier_sale`,
        `inquiryService:supplier_price`,
        `inquirySaleService:po`,
        `${prop?.request?.type}:${prop?.request?.action}`,
      ]}
    >
      {prop.renderDetails&&prop.renderDetails}
      <Multiselect label="CC" name="email_to" control={control} />
      
      <InputField
          name={"Email Subject"}
          useFor="editor"
          control_name="email_subject"
          control={control}
          required
          placeholder={"Enter Email Subject"}
          inputClassName="rounded-md"
          error={errors.email_subject}
          textEditorOption={{isToolbar: false}}
          tagPage={prop.isDefault}
          rules={{...ValidateForm.textEditor("Email Subject")}}
        />

      <div className="my-4">
        <InputField
          name={"Email Preview"}
          useFor="editor"
          control_name="email_body"
          control={control}
          required
          placeholder={"Enter Email Preview"}
          inputClassName="h-64 rounded-md"
          error={errors.email_body}
          innerRender={prop.renderItem}
          textEditorOption={{isToolbar: true}}
          tagPage={prop.isDefault}
          rules={{...ValidateForm.textEditor("Email Preview")}}

        />
      </div>
    </FormPopup>
  );
};

export default SendMail;
