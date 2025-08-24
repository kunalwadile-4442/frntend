import React from "react";
import { Controller } from "react-hook-form";
import { App_url } from "../../../utils/constants/static";

interface IButtonList {
  control: any;
  paymentTerms: { id: number; label: string, }[] | any[];
  name: string;
  key_name?: string;
  error?: any;
  disabled?: boolean;
  rules?: object;
  onChange?: Function;
}
const ButtonList: React.FC<IButtonList> = (prop) => {
  const {key_name = "label"} = prop
  const onChange = (field, term) =>{
    field.onChange(term?.[key_name]);
    if(prop?.onChange){
      prop.onChange(term)
    }
  }
  return (
    <div>

      <div className="flex space-x-2 text-sm">
        <Controller
          name={prop.name}
          control={prop.control}
          defaultValue=""
          rules={prop?.rules}
          disabled={prop?.disabled}
          render={({ field }) => (
            <>
              {prop.paymentTerms.map((term, index) => (
                <>
                  <button
                    key={index}
                    type="button"
                    className={`px-3 py-2 rounded-md border ${
                      field.value === term?.[key_name]
                        ? "border-blue-500 bg-blue-100"
                        : "border-gray-300"
                    }`}
                    onClick={(e)=>onChange(field, term)}
                    disabled={term?.disabled || prop?.disabled}
                  >
                    {term.label}
                  </button>
                </>
              ))}
            </>
          )}
        />
      </div>
      {prop?.error && (
        <div className="flex items-center">
          <img className="h-[0.5rem] " src={App_url.image.info} alt=""/>
          <div className="text-xs   mx-1 text-red-600">{prop?.error}</div>
        </div>
      )}
    </div>
  );
};

export default ButtonList;
