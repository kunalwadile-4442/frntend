// import React from "react";
// interface ICheckBoxBtn {
//   isChecked?: boolean;
//   onClick?: () => void;
//   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }
// const Checkbox: React.FC<ICheckBoxBtn> = ({ isChecked, onClick, onChange }) => {
//   return (
//     <div className="text-sm ">
//       <p className="my-1 text-[#4E4E4E]">Permission</p>
//       <div className="flex gap-2">
//         <input
//           type="checkbox"
//           checked={isChecked}
//           onChange={onChange}
//           onClick={onClick}
//         />
//         <p className="text-[#0B0B0B]">Admin Access</p>
//       </div>
//     </div>
//   );
// };

// export default Checkbox;


import React, { useMemo } from 'react';
import { Controller, FieldError, FieldValues } from 'react-hook-form';
import { UUID4 } from '../../utils/common';

type CheckboxProps = {
  label?: string;
  value?: string;
  name?: string;
  isChecked?: boolean;
  error?: FieldError;
  control?: any;
  controlName?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  className?: string;
  inline?:boolean;
  register?: any;
};

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  value,
  name,
  isChecked,
  error,
  control,
  controlName,
  onChange,
  onClick,
  className,
  inline,
  register
}) => {
  const uuid = useMemo(()=>UUID4(),[])

  const renderCheckboxButton = (field: FieldValues) => (
    <div className={`${className} ${error ? 'text-red-600' : isChecked ? 'text-primary' : ''}`}>
      {!inline && <label className="text-sm" htmlFor={`${uuid}_uuid`}>{label}</label>}
      <input
        type="checkbox"
        {...field}
        checked={isChecked}
        onChange={onChange}
        onClick={onClick}
        value={value}
        name={name}
        className="cursor-pointer h-[18px] w-[18px]"
        id={`${uuid}_uuid`}
      />
      {inline && <label className="text-sm" htmlFor={`${uuid}_uuid`}>{label}</label>}
    </div>
  );

  const ErrorInfo = ({ error }: { error?: FieldError }) => {
    if (!error) return null;
    return (
      <div className="min-h-4 py-1 text-red-600 text-xs">
        {error.message}
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
              {renderCheckboxButton(field)}
              <ErrorInfo error={fieldState.error} />
            </>
          )}
        />
      ) : (
        <>
          {renderCheckboxButton({
            onChange,
            onClick,
            name,
            value,
            checked: isChecked,
            register
          })}
          <ErrorInfo error={error} />
        </>
      )}
    </div>
  );
};

export default Checkbox;