/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ReactMultiEmail } from "react-multi-email";
import "react-multi-email/dist/style.css";
import { App_url } from "../../utils/constants/static";

interface IMultiSelectTypes {
  name: string;
  control: any;
  rules?: any;
  defaultValue?: string[];
  error?: any;
  label?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

const Multiselect: React.FC<IMultiSelectTypes> = ({
  name,
  control,
  rules,
  defaultValue = [],
  error, label, className, required, placeholder = "Insert your email"
}) => {
  const [focused, setFocused] = useState(false);

  const callRenderMail = ({ field: { onChange, value } }) => {
    return (
      <ReactMultiEmail
        placeholder={placeholder}
        emails={typeof value === "string" && value ? value.split(", ") : []}
        onChange={(_emails: string[]) => {
          onChange(_emails.join(", ")); // Convert the array to a comma-separated string
        }}
        className={`h-min-10 py-2 px-2 ${error ? "border-red-600" : "border-gray-300"
          }`}
        inputClassName="h-full mx-1 placeholder:text-sm text-sm "
        autoFocus={true}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.key === " ") {
            e.stopPropagation();
            e.preventDefault();
          }
        }}
        getLabel={(email, index, removeEmail) => {
          return (
            <div data-tag key={index}>
              <div data-tag-item>{email}</div>
              <span data-tag-handle onClick={() => removeEmail(index)}>
                ×
              </span>
            </div>
          );
        }}
      />
    )
  }
  return (
    <div className={className}>
      <p className="text-[#4E4E4E] text-sm ">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </p>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        render={callRenderMail}
      />
      <div className=" py-[0.15rem]">
        {error && (
          <div className="flex items-center">
            <img className="h-[0.5rem]" src={App_url.image.info} alt="" />
            <p className="text-xs mx-1 text-red-600  text-left">{error.message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Multiselect;
