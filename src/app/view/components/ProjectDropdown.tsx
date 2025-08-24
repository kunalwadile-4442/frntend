/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState, useEffect } from "react";
import Select, { MultiValue, SingleValue, ActionMeta } from "react-select";
import CreatableSelect from "react-select/creatable";
import { useWebSocket } from "../../api/websocket/WebSocketContext";
import { App_url } from "../../utils/constants/static";
import { Controller } from "react-hook-form";

interface Option {
  value: string | number;
  label: string | number;
}

interface DropdownProps {
  label?: string | number;
  options?: Option[] | any[];
  value?: string | number | (string | number)[];
  onChange?: (value: string | number | (string | number)[]) => void;
  name?: string;
  onSelect?: (value: string | number | any | (string | number)[] | any) => void;
  className?: string;
  errors?: any;
  requestPayload?: any;
  required?: boolean;
  defaultValue?: string;
  multiselect?: boolean;
  disabled?: boolean;
  formClassName?: string;
  placeholder?: string;
  payload?: any;
  children?: any;
  control: any;
  rules?: any;
  isCreatable?: boolean;
  menuIsOpen?: boolean;
  fontWeight?: string;
  name_key?: string;
  setValue?:any,
  labelDesign?:boolean,
}

const ProjectDropdown: React.FC<DropdownProps> = ({
  errors,
  requestPayload,
  label,
  options,
  onChange,
  name,
  onSelect,
  className,
  required,
  defaultValue,
  payload,
  multiselect = false,
  disabled = false,
  control,
  rules,
  isCreatable = false,
  menuIsOpen = false,
  formClassName = "",
  placeholder = "",
  fontWeight = "medium",
  name_key = "",
  setValue,
  labelDesign,
}) => {
  const [searchInput, setSearchInput] = useState(payload?.payload?.query || "");
  const [dropdownOptions, setDropdownOptions] = useState<Option[]>(
    options || []
  );
  const { send } = useWebSocket();
  const [readonly, setReadonly] = useState(true);

  useEffect(() => {
    setDropdownOptions(options);
  }, [options]);

  const handleSelectChange = (
    selectedOption: SingleValue<Option> | MultiValue<Option> | any,
    actionMeta: ActionMeta<Option>,
    field
  ) => {
    const value = multiselect
      ? (selectedOption as MultiValue<Option>).map((option) => option.value)
      : (selectedOption as SingleValue<Option>)?.value;

    field.onChange(value);
    if (onChange) {
      onChange(value);
    }
    if(!multiselect){
      if (name_key&& setValue && selectedOption?.label && !multiselect) {
        setValue(name_key,selectedOption?.label);
      }
    }
    if (onSelect) {
      onSelect({ ...selectedOption, value, name });
    }

    setSearchInput("");
  };

  const handleInputChange = (inputValue: string, field, actionMeta) => {
    setSearchInput(inputValue);
    const selectedValue = getValue(field);
    if (requestPayload && inputValue) {
      requestPayload.payload.query = inputValue;
      send(requestPayload);
    } else {
      if (!selectedValue?.value) {
        // requestPayload.payload.query = inputValue;
        // send(requestPayload);
      }
    }
  };

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      padding: "0.08rem",
      borderRadius: "5px",
      borderWidth: "1px",
    }),
    menu: (provided: any) => ({
      ...provided,
      borderRadius: "10px",
    }),
    option: (provided: any) => ({
      ...provided,
      padding: "10px",
    }),
  };

  const getValue = (field) => {
    if (isCreatable) {
      if (multiselect) {
        if (field?.value) {
          return (
            options?.filter((option) =>
              (field.value as (string | number)[]).includes(option.value)
            ) || field.value.map((value) => ({ label: value, value }))
          );
        } else {
          return null;
        }
      } else {
        const checkDetails = options?.find(
          (option) => option.value === field.value
        );
        return checkDetails || { label: field?.value, value: field?.value };
      }
    } else {
      if (multiselect) {
        return options?.filter((option) =>
          (field.value as (string | number)[]).includes(option.value)
        );
      } else {
        const checkDetails = options?.find(
          (option) => option.value === field.value
        );
        return checkDetails || null;
      }
    }
  };

  const callOnFocus = () => {
    setReadonly(false);
  };

  const callOnBlur = () => {
    setReadonly(true);
  };

  const RenderSelect = ({ field }) => {
    const selectedValue = getValue(field);
    return (
      <div className="flex flex-col">
        <div className="w-full h-full">
          {isCreatable ? (
            <CreatableSelect
              classNamePrefix="select-form"
              isDisabled={disabled}
              isMulti={multiselect}
              value={selectedValue}
              onChange={(selectedOption, actionMeta) =>
                handleSelectChange(selectedOption, actionMeta, field)
              }
              styles={customStyles}
              options={dropdownOptions}
              onInputChange={(e, actionMeta) =>
                handleInputChange(e, field, actionMeta)
              }
              placeholder={placeholder || (defaultValue?`Select ${defaultValue}`:'')}
              className={`${className} ${
                !errors ? "border-[#CCD0CF]" : "border-red-600"
              } rounded-md text-sm select-form-containers`}
              onFocus={callOnFocus}
              onBlur={callOnBlur}
              inputValue={searchInput}
              isSearchable
              // menuIsOpen={menuIsOpen}
            />
          ) : (
            <Select
              classNamePrefix="select-form"
              isDisabled={disabled}
              isMulti={multiselect}
              value={selectedValue}
              onChange={(selectedOption, actionMeta) =>
                handleSelectChange(selectedOption, actionMeta, field)
              }
              styles={customStyles}
              options={dropdownOptions}
              onInputChange={(e, actionMeta) =>
                handleInputChange(e, field, actionMeta)
              }
              placeholder={placeholder || (defaultValue?`Select ${defaultValue}`:'')}
              className={`${className} ${
                !errors ? "border-[#CCD0CF]" : "border-red-600"
              } rounded-md text-sm select-form-containers`}
              onFocus={callOnFocus}
              onBlur={callOnBlur}
              inputValue={searchInput}
              isSearchable
              // menuIsOpen={menuIsOpen}
            />
          )}
        </div>
        {errors && (
          <div className="flex items-center">
            <img className="h-[0.5rem]" src={App_url.image.info} alt="" />
            <p className="text-xs mx-1 text-red-600  text-left">{errors.message}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`flex ${labelDesign ? 'items-center space-x-2' : 'flex flex-col'} ${formClassName}`}>
      {label && (
        <label
          className={`font-normal dropdown-label font-${fontWeight} ms-2 text-gray-600  text-sm`}
          htmlFor={name}
        >
          {label}
          <span>.</span>
        </label>
      )}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={RenderSelect}
      />
    </div>
  );
};

export default ProjectDropdown;
