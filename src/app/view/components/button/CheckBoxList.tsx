import React from "react";
import { Controller } from "react-hook-form";
import Button from "./Button";

interface ICheckBoxList {
  optionsList: { value: string; label: string }[];
  name: string;
  control: any;
  className?: string;
  onCallBackChange?: (value: string[]) => void;
  handleSubmit?: Function;
  onSubmit?: Function;
  submit?: boolean|string;
  title?: string;
}

const CheckboxComponent: React.FC<ICheckBoxList> = ({
  optionsList,
  name,
  control,
  className,onCallBackChange,onSubmit,handleSubmit,title,submit
}) => {
  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    if (onSubmit) {
      handleSubmit(onSubmit)();
    } 
  };
  return (
    <div className={className}>
      <Controller
        name={name}
        control={control}
        render={({ field: { value = [], onChange } }) => {
          // Ensure value is always an array
          const selectedValues = Array.isArray(value) ? value : [];

          return (
            <div className={`flex ${className?? `gap-6`} w-full text-sm justify-between items-center`}>
              <div className="flex gap-2">
              {optionsList.map((option) => (
                <div className="flex items-center gap-2">
                  <label
                    key={option.value}
                    className="whitespace-nowrap"
                    style={{ display: "block", margin: "5px 0px" }}
                  >
                    <input
                      type="checkbox"
                      value={option.value}
                      className="cursor-pointer h-[18px] w-[18px]"
                      checked={selectedValues.includes(option.value)}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        const newValue = isChecked
                          ? [...selectedValues, option.value]
                          : selectedValues.filter((v) => v !== option.value);
                        onChange(newValue);
                        if(onCallBackChange){
                          onCallBackChange(newValue);
                        }
                      }}
                    />
                  </label>
                  <p className="pb-1 whitespace-nowrap">{option.label}</p>
                </div>
              ))}
              </div>
              {submit &&  <Button
                    type="submit"
                    onClick={(e) => handleFormSubmit(e,)}
                    className={`font-medium rounded-md text-sm px-5 py-2.5 ${
                      "text-center focus:outline-none focus:ring-blue-300 bg-primary text-white hover:bg-primary-100"
                      } `}
                    label={title}
                  />}
            </div>
          );
        }}
      />
    </div>
  );
};

export default CheckboxComponent;
