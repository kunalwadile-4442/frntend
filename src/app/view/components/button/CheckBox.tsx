import React from 'react'
interface ICheckBox{
    register: any;
    checkboxOptions: string[];
    name: string;
    className?: string;
}
const CheckBox:React.FC<ICheckBox> = ({checkboxOptions,register,name,className}) => {
  return (
    <div className={`grid grid-cols-4 gap-4 mt-4 ${className}`}>{checkboxOptions.map((option, idx) => (
        <label key={idx} className="flex items-center gap-2 whitespace-nowrap">
          <input
            type="checkbox"
            value={option}
            {...register(`${name}.${idx}`)}
          />
          <span>{option}</span>
        </label>
      ))}</div>
  )
}

export default CheckBox