import React from "react";
import DatePicker from "react-datepicker";
import { Controller } from "react-hook-form";
import { App_url } from "../../utils/constants/static";
import Icon from "./Icon";
import { toZonedTime } from "date-fns-tz"; // Import date-fns-tz
import "react-datepicker/dist/react-datepicker.css";

interface IDataDatePicker {
  control?: any;
  name: string;
  rules?: any;
  error?: any;
  label?: string;
  showIcon?: boolean;
  isClearable?: boolean;
  required?: boolean;
  selectsStart?: boolean;
  selectsEnd?: boolean;
  isConvert?: boolean;
  disabled?: boolean;
  inline?: boolean;
  className?: string;
  inputClassName?: string;
  placeholder?: string;
  labelClassName?: string;
  dateFormat?: string;
  monthsShown?: number;
  maxDate?: Date | any;
  minDate?: Date | any;
  endDate?: Date | any;
  startDate?: Date | any;
  value?: any;
  onChange?: Function;
  timezone?: string; // Add timezone prop
  calenderTheme?: "secondary"
  isShowMonthYearPicker?: boolean;
  open?: boolean;
  callBackonClickOutside?: () => void;
  renderCustomHeader?: any
  renderMonthContent?: any
  popperPlacement?: any
}

const Calender: React.FC<IDataDatePicker> = (props) => {
  const {
    control,
    onChange,
    name,
    rules,
    error,
    label,
    required,
    selectsStart,
    selectsEnd,
    className,
    inputClassName,
    placeholder,
    monthsShown = 1,
    maxDate = null,
    minDate = null,
    endDate = null,
    startDate = null,
    showIcon = true,
    isClearable = false,
    timezone = "UTC", // Default timezone is UTC
    isConvert = false,
    disabled = false,
    inline = false,
    isShowMonthYearPicker = false,
    open,
    callBackonClickOutside, renderCustomHeader, renderMonthContent
  } = props;

  const fieldChange = (field, date) => {
    if (field?.onChange) {
      field?.onChange(date)
    }
    if (onChange) {
      onChange(date)
    }
  }
  const FormLabel = (prop?: any) => {
    return (
      <label htmlFor={name} className={`text-[#4E4E4E] text-sm mb-[1px] mt-[-10px] ml-3 form-label bg-white w-fit ${prop?.className} ${props?.labelClassName}`}>
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
    )
  }
  const theme = {
    secondary: {
      calender: `bg-[#F0F0F0] border ${!error ? `border-[#CCD0CF]  ` : "border-red-600"}`,
      input: "",
    }
  }

  const renderInput = (field) => {
    // Convert the field value to the correct timezone before displaying
    const selectedDate = field?.value
      ? field.value
      : null;

    return (
      <DatePicker
        popperPlacement={props?.popperPlacement}
        placeholderText={`${placeholder ? placeholder : "Select date"}`}
        onChange={(date: Date) => fieldChange(field, date)}
        showMonthDropdown
        showYearDropdown
        showMonthYearPicker={isShowMonthYearPicker}
        dropdownMode="select"
        selected={selectedDate}
        timeFormat="HH:mm"
        autoComplete="off"
        dateFormat={props?.dateFormat || "MM-dd-yyyy"}
        className={` outline-none mt-[-10px] h-10  text-sm w-full bg-transparent ${theme?.[props?.calenderTheme]?.input}} `}
        wrapperClassName="w-full"
        maxDate={maxDate ? isConvert ? maxDate : new Date(toZonedTime(maxDate, timezone)) : null}
        minDate={minDate ? isConvert ? minDate : new Date(toZonedTime(minDate, timezone)) : null}
        popperClassName="custom-dropdown"
        id={`input_time-${name}`}
        icon={
          <label htmlFor={`input_time-${name}`} className={`cursor-pointer calender-icon mr-4 mt-[-10px] rounded-r-md ${theme?.[props?.calenderTheme]?.calender}`}>
            <Icon attrIcon={App_url.image.calendar} className="" />
          </label>
        }
        showIcon={showIcon}
        startDate={startDate ? isConvert ? startDate : new Date(toZonedTime(startDate, timezone)) : null}
        endDate={endDate ? isConvert ? endDate : new Date(toZonedTime(endDate, timezone)) : null}
        selectsStart={selectsStart}
        selectsEnd={selectsEnd}
        isClearable={isClearable}
        name={field?.name}
        monthsShown={monthsShown}
        disabled={field?.disabled}
        open={open}
        onClickOutside={callBackonClickOutside}
        renderCustomHeader={renderCustomHeader}
        renderMonthContent={renderMonthContent}
      />
    );
  };
  const RenderInputGroup = (field) => {
    if (inline) {
      return (
        <div className="form-group flex">
          {label && (
            <FormLabel className={"align-middle flex items-center pr-1"} />
          )}
          {renderInput(field)}
        </div>
      )
    }
    return (
      renderInput(field)
    )
  }

  return (
    <div className={`calender-selection flex flex-col ${className} theme-${props?.calenderTheme} border-[1px] rounded-full h-11  ${props?.error ? "border-red-600" : `focus-within:border-[#C8C9C9] border-[#C8C9C9]`} focus:outline-none focus:ring-blue-500 focus:border-blue-500`}>
      {label && !inline && (
        <FormLabel />
      )}
      {control ? (
        <Controller
          name={name}
          control={control}
          rules={rules}
          disabled={disabled}
          render={({ field }) => (
            <div className="w-full">
              <RenderInputGroup {...field} />
              {error && (
                <div className="h-4 py-[0.15rem]">
                  <div className="flex items-center">
                    <img className="h-[0.5rem]" src={App_url.image.info} alt="" />
                    <p className="text-xs mx-1 text-red-600  text-left">{error.message}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        />
      ) : (
        <div className="w-full">
          <RenderInputGroup {...props} />
          {error && (
            <div className="h-4 py-[0.15rem]">
              <div className="flex items-center">
                <img className="h-[0.5rem]" src={App_url.image.info} alt="" />
                <p className="text-xs mx-1 text-red-600  text-left">{error.message}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Calender;
