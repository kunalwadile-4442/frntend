/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useMemo, useState } from 'react';
import { Controller } from 'react-hook-form';
import { UUID4 } from '../../utils/common';

type RadioButtonProps = {
  label?: string;
  value?: string;
  name?: string;
  isChecked?: boolean;
  disable?: boolean;
  error?: any;
  control?: any;
  controlName?: string;
  register?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  className?: string;
};

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  value,
  name,
  isChecked,
  disable,
  error,
  control,
  controlName,
  register,
  onChange,
  onClick,
  className,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const uuid = useMemo(()=>UUID4(),[])
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const renderRadioButton = (field) => (
    <div
      className={`flex items-center gap-2 ${className} ${error ? 'text-red-600' : isChecked ? 'text-primary' : ''}${disable ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={!disable? handleFocus : undefined}
      onBlur={!disable? handleBlur : undefined}
    >
      <input
        type="radio"
        {...field}
        checked={isChecked}
        onChange={onChange}
        onClick={onClick}
        value={value}
        name={name}
        className="cursor-pointer h-[18px] w-[18px]"
        disabled={disable}
        id={`${uuid}_uuid`}
      />
      <label className={`text-sm ${className}`} htmlFor={`${uuid}_uuid`}>{label}</label>
    </div>
  );

  const ErrorInfo = ({ error }) => {
    if (!error) return null;
    return (
      <div className="min-h-4 py-1 text-red-600 text-xs">
        {error?.message || error}
      </div>
    );
  };

  return (
    <div>
      {control && controlName ? (
        <Controller
          name={controlName}
          control={control}
          render={({ field, fieldState }) => (
            <>
              {renderRadioButton(field)}
              <ErrorInfo error={fieldState?.error} />
            </>
          )}
        />
      ) : (
        <>
          {renderRadioButton(register)}
          <ErrorInfo error={error} />
        </>
      )}
    </div>
  );
};

export default RadioButton;
