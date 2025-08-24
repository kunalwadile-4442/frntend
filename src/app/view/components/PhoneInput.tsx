import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { App_url } from '../../utils/constants/static';
import { Controller } from 'react-hook-form';

interface IPhoneInput {
  label: string;
  name: string;
  required?: boolean;
  control: any;
  defaultValue?: { phone: string; phone_code: string };
  rules?: any;
  className?: string;
  error?: any; // Error object for validation
}

const PhoneInputComp: React.FC<IPhoneInput> = ({
  label,
  name,
  required,
  control,
  defaultValue = { phone: '', phone_code: '' },
  rules,
  className,
  error,
}) => {


  const renderPhoneInput = ({ field, fieldState }) => {
    const onChangePhoneInput = (value, data:any, e, input_value) => {
      field.onChange({
        phone: value,
        phone_code: data?.dialCode,
        format: data?.format,
        input_value: input_value,
        countryCode: data?.countryCode,
        dialCode: data?.dialCode,
        countryName: data?.countryName,

      });
    }
    // Safeguard against undefined or null values
    const phoneValue = field?.value?.phone || null;
    // const phoneCode = field?.value?.phone_code || '';
    const format = field?.value?.format || '';
    const enableLongNumbers = (format.replace(/[\s()]/g, '').replace(/[+-]/g, '')?.length - parseFloat(field?.value?.phone_code?.length)) || false;

    return(
      <>
        <PhoneInput
          country={'us'}
          placeholder="Enter contact number"
          enableSearch
          value={phoneValue}
          // disableCountryCode
          // country={field?.value?.phone || null}
          onChange={onChangePhoneInput}
          containerClass={"phone-input-container-class "}
          inputClass={`phone-input-field-class rounded-md ${ fieldState.error ? 'border-red-600' : '' }`}
          buttonClass="phone-input-button-class"
          enableLongNumbers={enableLongNumbers}
          dropdownClass={"phone-input-dropdown-class"}
        />
          {fieldState.error && (
            <div className="min-h-4 py-[0.15rem]">
              <div className="flex items-center">
                <img className="h-[0.5rem]" src={App_url.image.info} alt="" />
                <p className="text-xs mx-1 text-red-600  text-left">{fieldState.error.message}</p>
              </div>
            </div>
          )}
      </>
    )
  }
  return (
    <div className={`phone-input-container ${className}`}>
      <p className="phone-input-label">
        {label}
        {required && <span className="required-star"> *</span>}
      </p>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={renderPhoneInput}
      />
    </div>
  );
};

export default PhoneInputComp;
