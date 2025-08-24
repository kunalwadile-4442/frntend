import React from "react";
import { Controller } from "react-hook-form";

interface IToggleBtn {
  isChecked?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onChange?: (checked: boolean) => void; // Custom onChange callback
  control?: any; // React Hook Form control object (optional)
  name?: string; // Name for the form input (optional)
  label?: string;
  labelClassName?: string;
  className?: string;
}

const ToggleBtn: React.FC<IToggleBtn> = ({
  isChecked,
  onClick,
  onChange, // Custom callback to handle onChange
  control,
  name,
  label,
  labelClassName,
  className,
  disabled,
}) => {
  const renderToggle = (field: any) => (
    <label
      className={`${disabled ? "pointer-events-none cursor-default opacity-50" : ""
        } inline-flex items-center cursor-pointer`}
    >
      <input
        {...field}
        type="checkbox"
        className="sr-only peer"
        checked={field?.value ?? isChecked ?? false} // Fallback to isChecked if no field value
        onClick={onClick} // Optional onClick handler
        onChange={(e) => {
          field?.onChange?.(e.target.checked); // Update form state if using Controller
          onChange?.(e.target.checked); // Call custom onChange callback if provided
        }}
        disabled={disabled}
      />
      <div className={`relative w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-[#E3E5EB] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[1px] after:bg-[#F2FBFE] after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary`}></div>
    </label>
  );

  return (
    <div className={className}>
      {label && <p className={`text-[#4E4E4E] text-sm ${labelClassName} form-label`}>{label}</p>}
      {control && name ? (
        <Controller
          name={name}
          control={control}
          defaultValue={isChecked || false} // Initial value
          render={({ field }) => renderToggle(field)} // Render the toggle with Controller
        />
      ) : (
        // If no control is provided, render the toggle with the `isChecked` prop
        renderToggle({
          value: isChecked, // Use `isChecked` as the value if no `control`
          onChange: onChange, // Call the custom `onChange` function if no control
        })
      )}
    </div>
  );
};

export default ToggleBtn;
