/* eslint-disable eqeqeq */
import React from "react";
interface ITabList{
    label:string;
    value:string;
}
interface ITabToggleList{
    list:(ITabList|any) [];
    onChangeTab:Function;
    disabled?:boolean;
    value?: any;
}
const TabToggleList = (props: ITabToggleList) => {
    const { list, onChangeTab, disabled, value } = props;

    return (
        <div className="group-switch flex space-x-1 rounded-lg bg-table-tab p-[6px] ">
            {list?.map((item, index) => (
                <React.Fragment key={index}>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onChangeTab(item)
                        }}
                        className={`flex items-center rounded-md py-[0.219rem] text-[12px] font-semibold px-4 ${value == item?.value && "bg-white shadow-table-tab hover:bg-white" } `}
                        disabled={disabled}
                    >
                        {item?.label}
                    </button>
                </React.Fragment>
            ))}
        </div>
    )
}
export default TabToggleList;