import React, { useState } from "react";
import { Controller } from "react-hook-form";

interface ITabToggle {
  list: { label: string; value: string }[];
  name: string;
  control: any;
  className?: string;
  callBackChange?:Function
}


const TabToggleList: React.FC<ITabToggle> = ({ list, name, control,className,callBackChange }) => {
    const [Value, setValue] = useState(0)
    const renderTab = (list, field) => {
        return (
          <div className={`flex space-x-1 w-fit rounded-lg bg-secondary_1 p-0.5 ${className}`}>
            {list?.map((item, index) => (
              <React.Fragment key={index}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    field?.onChange(item?.value);
                    callBackChange(item?.value)
                    setValue(index);
                  }}
                  className={`flex items-center rounded-md py-[0.4375rem] pl-2 pr-2 text-sm font-semibold lg:pr-3 ${Value===index&&'bg-white'}`}
                >
                  {item?.label}
                </button>
              </React.Fragment>
            ))}
          </div>
        );
      };
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => <>{renderTab(list, field)}</>}
      />
    </>
  );
};
export default TabToggleList;
