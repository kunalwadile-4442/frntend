/* eslint-disable @typescript-eslint/no-unused-vars */
import { useLocation, useNavigate } from "react-router-dom";
import Icon from "../Icon";
import { App_url } from "../../../utils/constants/static";
import React, { useState } from "react";

interface IFilterList {
    name?: string;
    value?: string | number;
    label?: string;
    type?: string;
    options?: any[];
    defaultValue?: string;
}
interface IRequestPayloadInitial {
    query?: string;
    limit?: string | number;
    page?: string;
    active?: boolean;
    sort_by?: string;
    sort_order?: string;
    country_id?: string;
}
interface IRequestInitial {
    type?: string;
    request?: ITableFormTypes;
    action?: string;
    payload?: IRequestPayloadInitial;
}
interface IDeletePayload {
    id: string;
}
interface IActionStatusRequest {
    type: string;
    // payload: IDeletePayload;
    action: string;
    title: string;
    description?: string;
    key_id?: string;
}
interface IActionDeleteRequest {
    type: string;
    // payload: IDeletePayload;
    action: string;
    title: string;
    description?: string;
    key_id?: string;
}
interface IActionViewRequest {
    type: string;
    payload: any;
    action: string;
    title: string;
    description?: string;
    key_id?: string;
    value_id?: string;
}
interface IActionPayloadRequest {
    info?: any;
    delete?: IActionDeleteRequest;
    status?: IActionStatusRequest;
    view?: IActionViewRequest;
}
interface ITableLayoutProps {
    errors?: any;
    callBackToggleRequest?: Function;
    formInput?: boolean;
    status?: boolean;
    view?: boolean;
    isBack?: boolean;
    showToggle?: boolean;
    children?: React.ReactNode;
    handleOpen?: Function;
    title?: string;
    action_name?: string;
    isAdd?: boolean;
    isFilter?: boolean;
    columnName?: string[];
    columnKey?: object[];
    columnToggleKey?: object[];
    dataItem?: object[] | any;
    toggleItem?: object[] | any;
    filterList?: IFilterList[];
    columnOption?: IFilterList[];
    initialRequest?: IRequestInitial[];
    dataList?: any;
    serial_no?: boolean;
    edit?: boolean;
    info?: boolean;
    delete?: boolean;
    timer?: boolean;
    renderBody?: (item: any, index?: any, children?: React.ReactNode) => React.ReactNode;
    renderBodyToggle?: (item: any, index?: any, children?: React.ReactNode) => React.ReactNode;
    callBackState?: (item) => any;
    callBackShowToggle?: (item) => any;
    payload?: object;
    setPayload?: Function;
    nav?: boolean;
    isSort?: boolean;
    isUserType?: boolean;
    isNav?: boolean;
    showAction?: boolean;
    modalName?: string;
    type?: string;
    request?: ITableFormTypes;
    action?: string;
    actionPayload?: IActionPayloadRequest;
    style?: React.CSSProperties;
    route?: string
    content: {
        title: string;
    };
}
type ITableFormTypes = {
    status?: string
    search?: string;
    query?: string;
    limit?: string | number;
    page?: string | number;
    role_id?: string;
    user_type?: string;
    sort_by?: string;
    sort_order?: string;
    active?: string | boolean;
    location_id?: string;
    state_id?: string;

};

interface IFormTypes {
    children: React.ReactNode;
    handleSubmit: Function;
    onSubmit?: Function;
    isBack?: boolean;
    loader?: boolean;
    className?: string;
    path?: string;
    content: {
        title: string;
        submit: string;
    };
}

const HistoryTableLayout: React.FC<ITableLayoutProps> = (prop) => {

    const navigate = useNavigate();
    const { pathname } = useLocation();
    const route = pathname.split('/').slice(0, -1).join('/')
    const [showFilter, setShowFilter] = useState(false);

    const callShowFilter = () => {
        setShowFilter(!showFilter);
    };

    return (
        <div className="overflow-y-auto h-screen bg-tertiary">
            {/* <div> */}
            <div className="p-3 py-4">
                <div className="flex items-center gap-2 " onClick={() => navigate(route)}>
                    {prop.isBack && (
                        <Icon
                            style={{ height: "10px" }}
                            className="cursor-pointer"
                            attrIcon={App_url.image.arrowleft}
                        />
                    )}
                    <p className="font-semibold">{prop.content.title}</p>
                    {/* {prop.isFilter && (
                        <React.Fragment>
                            <Icon
                                attrIcon={App_url.image.filter}
                                buttonClassName={` btn-action ${!showFilter ? "bg-outline" : "bg-primary"} br-1`}
                                onClick={callShowFilter}
                                button
                            />
                        </React.Fragment>
                    )} */}
                </div>
                <div className="bg-white rounded-lg my-4 undefined pt-3 px-4">
                    <div className="pt-10 pb-10 history-table-layout flex">
                        <span className="font-title">Product Name : </span>
                        <p className=" font-semibold"> &nbsp; Rebar A</p>
                    </div>
                    <table className="table-auto">
                        <thead>
                            <tr>
                                <th>Song</th>
                                <th>Artist</th>
                                <th>Year</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                                <td>Malcolm Lockyer</td>
                                <td>1961</td>
                            </tr>
                            <tr>
                                <td>Witchy Woman</td>
                                <td>The Eagles</td>
                                <td>1972</td>
                            </tr>
                            <tr>
                                <td>Shining Star</td>
                                <td>Earth, Wind, and Fire</td>
                                <td>1975</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default HistoryTableLayout;