import React from "react";
import { Controller } from "react-hook-form";

interface LabelProps {
  name: string;
  control: any;
  rules?: any;
  disabled?: boolean;
  label?: string;
  name_key?: string;
  setValue?:any;
  option?:any[];
  className?:string;
  labelClassName?: string;
}

const Label: React.FC<LabelProps> = (prop) => {
    const findNamebyId=(field) =>{
        return prop?.option?.find((item, index)=>item?.id === field)?.name
    }
    
  return (
    <div className={`${prop?.className}`}>
    {prop?.label&&<p className="text-sm pb-2 text-[#4E4E4E] ">{prop.label}</p>}
      <Controller
        name={prop.name}
        control={prop.control}
        defaultValue=""
        rules={prop?.rules}
        disabled={prop?.disabled}
        render={({ field }) => {
            if(prop.setValue){
                prop.setValue(prop?.name_key,findNamebyId(field.value))
            }
            return(
                <label className={`text-sm text-[#727272] ${prop?.labelClassName}`} htmlFor={field.name}>{prop?.name_key?findNamebyId(field.value):field.value}</label>
            )
        }}
      />
    </div>
  );
};

export default Label;
