import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { LuEye, LuSearch, LuEyeOff } from "react-icons/lu";
import { App_url } from "../../utils/constants/static";
import TextQuill from "./TextQuill";

type InputFieldTypes = {
  label?: any;
  value?: any;
  type?: string;
  name?: string | React.ReactNode;
  innerRender?: React.ReactNode;
  placeholder?: string;
  inputClassName?: string;
  controlClassName?: string;
  className?: string;
  labelClassName?: string
  useFor?: "textarea" | "search" | "editor";
  tagPage?: "Purchase Order Email" | "Sale Order Email" | "Invoice Email" | "Inquiry Email" | any;
  textEditorOption?: { isToolbar: boolean }
  control?: any;
  control_name?: string;
  register?: any;
  error?: any;
  id?: any;
  key?: any;
  rows?: number;
  required?: boolean;
  onEnterClick?: Function;
  onKeyDown?: Function;
  onBlur?: Function;
  onFocus?: Function;
  onClickRightLabel?: Function;
  onChange?: Function;
  disabled?: boolean;
  readOnly?: boolean;
  leftLabel?: any;
  rightLabel?: any;
  rules?: any;
  autocomplete?: string;
  chatInputClassName?: string;
};

const InputField = (prop: InputFieldTypes) => {
  const { type = 'text' } = prop
  const [Password, setPassword] = useState(false);
  const [readOnly, setReadonly] = useState(true);

  const callOnFocus = (e) => {
    e.preventDefault();
    if (!prop?.readOnly) {
      setReadonly(false);
    };
    if (prop?.onFocus) {
      prop?.onFocus(e);
    }
  };
  const callOnBlur = (e) => {
    if (!prop?.readOnly) {
      setReadonly(true);
    }
    if (prop?.onBlur) {
      prop?.onBlur(e);
    }
  };
  const onClickRightLabel = () => {
    if (prop?.onClickRightLabel) {
      prop?.onClickRightLabel()
    }
  }
  const renderInput = (field) => {
    const onChange = (e) => {
      if (prop?.control) {
        field.onChange(e.target.value);
      } else if (field?.onChange) {
        field.onChange(e);
      }
      if (prop?.onChange) {
        prop?.onChange({
          name: e.target.name || prop?.name || field?.name,
          value: e.target.value,
        });
      }
    }
    return (
      <div
        className={`flex items-center justify-center overflow-hidden  ${prop?.useFor === 'search' ? '' : 'mt-[-6px]'} bg-transparent
        `}
        onClick={callOnFocus}
        onTouchStart={callOnFocus}
      >
        {prop.useFor === "search" && (
          <span className="w-[40px] h-[30px] flex items-center justify-center pl-[7px] pr-[7px]">
            <LuSearch className="h-full text-[#77808D] transform text-[20px]" />
          </span>
        )}
        <input
          onKeyDown={prop.onEnterClick && prop.onEnterClick}
          placeholder={
            prop.placeholder
              ? prop.placeholder
              : typeof prop.name == "string"
                ? `Enter ${prop.name.charAt(0).toLowerCase() + prop.name.slice(1)}`
                : ""
          }
          autocomplete={prop?.autocomplete}
          type={prop.type === "password" ? !Password ? "password" : "text" : type}
          id={prop.id}

          className={`bg-transparent focus:outline-none w-full ${prop?.useFor === 'search' ? '' : 'px-3'} py-2 placeholder:text-sm text-sm h-full  ${prop.useFor === "search" ? prop.controlClassName : ''}`}
          {...field}
          onChange={onChange}
          onFocus={callOnFocus}
          onBlur={callOnBlur}
          readOnly={prop?.readOnly || readOnly}
          disabled={prop.disabled}
          value={field?.value || prop?.value}
        />
        {prop?.rightLabel && (
          <span className="right-label cursor-pointer" onClick={onClickRightLabel}>
            {prop?.rightLabel}
          </span>
        )}
        {prop.type === "password" &&
          (Password ? (
            <LuEyeOff
              className="cursor-pointer h-full mr-2"
              onClick={() => setPassword(!Password)}
            />
          ) : (
            <LuEye
              className="cursor-pointer h-full mr-2"
              onClick={() => setPassword(!Password)}
            />
          ))}
        {prop.useFor === "search" && (
          <span className="w-[40px] h-[42px] bg-[#F5F6F8] flex items-center justify-center pl-[7px] pr-[7px]">
            {/* <LuSearch className="h-full text-[#77808D] transform text-[20px]" /> */}
            <img src={App_url.image.search_i} alt="" />
          </span>
        )}
        {/* search_i */}
      </div>
    )
  }

  const renderTextarea = (field) => {
    const onChange = (e) => {
      if (prop?.control) {
        field.onChange(e.target.value);
      } else if (field?.onChange) {
        field.onChange(e);
      }
      if (prop?.onChange) {
        prop?.onChange({
          name: e.target.name || prop?.name,
          value: e.target.value,
        });
      }
    }
    return (
      <div
        className={`bg-transparent w-full overflow-hidden d-flex flex-col ${prop.disabled && "input-disabled"} `}
      >
        <div className={`flex ${prop?.innerRender ? "h-[calc(100%-45px)] overflow-auto" : "h-full"} ${prop.useFor === "search" ? "max-w-[190px] pl-0" : ""}  ${prop?.rightLabel && "right_icon "}`}>
          <textarea
            {...field}
            placeholder={prop.placeholder}
            className={`rounded focus:outline-none w-full text-sm resize-none placeholder:text-sm px-2 py-2 bg-transparent ${prop.chatInputClassName}`}
            onFocus={callOnFocus}
            onChange={onChange}
            onKeyDown={prop?.onKeyDown && prop?.onKeyDown}
            rows={prop?.rows}
            value={field?.value || prop?.value}
            disabled={prop.disabled}
          />
          {prop?.rightLabel && (
            <span className="right-label ms-auto cursor-pointer" onClick={onClickRightLabel}>
              {prop?.rightLabel}
            </span>
          )}
        </div>
        {prop?.innerRender}
      </div>
    );
  }
  const renderTextEditor = (field) => {
    const onChange = (e) => {
      if (prop?.control) {
        field?.onChange(e);
      } else if (field?.onChange) {
        field?.onChange(e);
      }
      if (prop?.onChange) {
        prop?.onChange({
          name: prop?.name,
          value: e,
        });
      }
    }
    return (
      <div
        className={`bg-white border-[1px] w-full ${prop.inputClassName}
          ${prop.error ? "border-red-600" : `focus-within:border-primary border-[#C8C9C9]`}
          overflow-auto d-flex flex-col `}
      >
        <div className={`flex ${prop?.innerRender ? "h-[calc(100%-45px)]" : "h-full"} ${prop?.rightLabel && "right_icon "}`}>
          <TextQuill
            field={field}
            isToolbar={prop?.textEditorOption?.isToolbar}
            onChange={onChange}
            value={field?.value || prop?.value}
            innerRender={prop?.innerRender}
            tagPage={prop?.tagPage}
            name={prop?.name}
            readOnly={prop?.disabled}

          />
          {prop?.rightLabel && (
            <span className="right-label ms-auto cursor-pointer" onClick={onClickRightLabel}>
              {prop?.rightLabel}
            </span>
          )}
        </div>
        {prop?.innerRender}
      </div>
    );
  }
  const ErrorInfo = ({ error }) => {
    const imageLoad = () => {
      return (
        <img className="h-[0.5rem]" src={App_url.image.info} alt="" />
      )
    }
    if (!error) {
      return (
        <React.Fragment></React.Fragment>
      )
    }
    return (
      <div className={`min-h-4 py-[0.15rem]  ${prop?.useFor==='textarea'?'mt-3':'mt-1'}`}>
        <div className="flex items-center">
          {imageLoad()}
          <p className="text-xs mx-1 text-red-600 text-left">
            {error?.message || error}
          </p>
        </div>
      </div>
    )
  }
  const renderInputGroup = (field) => {
    if (prop.useFor === "editor") {
      return renderTextEditor(field);
    }
    if (prop.useFor === "textarea") {
      return renderTextarea(field);
    }
    return renderInput(field);
  }

  return (
    <div className={`input-form-group ${prop.className} ${prop.inputClassName} ${prop.useFor === "search" ? 'bg-white' : ''} border-[1px] ${prop?.useFor==='textarea'?'rounded-lg':'rounded-full'} h-11  ${prop.error ? "border-red-600" : `focus-within:border-[#C8C9C9] border-[#C8C9C9]`}           ${prop.disabled ? 'bg-[#fdfcfb]' : ''}`}>
      {(prop.name || prop?.label) && (
        <p className={` text-[#4E4E4E] w-fit text-sm ml-3 mt-[-10px] ${prop.labelClassName} whitespace-nowrap bg-[#F8F9FC]`}>
          {prop?.label || prop.name}
          {prop.required && <span className="text-red-600"> *</span>}
        </p>
      )}
      {prop.control && prop.control_name ? (
        <Controller
          name={prop.control_name}
          control={prop.control}
          rules={prop?.rules}
          render={({ field, fieldState }) => (
            <>
              {renderInputGroup(field)}
              {ErrorInfo({ error: prop.error })}
            </>
          )}
        />
      ) : (
        <>
          {renderInputGroup(prop.register)}
          {ErrorInfo({ error: prop.error })}
        </>
      )}
    </div>
  );
};

export default InputField;