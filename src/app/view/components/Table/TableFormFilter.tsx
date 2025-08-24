/* eslint-disable */
import React, { forwardRef, useImperativeHandle, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import NewButton from "../button/NewButton";
import { App_url } from "../../../utils/constants/static";
import Icon from "../Icon";
import { useDispatch } from "react-redux";
import { setFormPopup } from "../../../redux/actions/action";
import ButtonDropDown from "../button/ButtonDropDown";
import { usePosterReducers } from "../../../redux/getdata/usePostReducer";
import { checkPermission } from "../../../utils/common";
import { getOptionColumnMenu } from "./utilsTable";
import TabToggleList from "./TabToggleList";
import SearchFilter from "./SearchFilter";
interface IFilterList {
    name?: string;
    value?: string | number;
    label?: string;
    type?: string;
    options?: any[];
    defaultValue?: string;
    start_placeholder?: string;
    end_placeholder?: string;
    start_name?: string;
    end_name?: string;
}
interface IToggleTab {
    label?: string;
    value?: string;
}
interface ITableLayoutProps {
    initialCall?: boolean
    customIcon?:string
    callBackToggleRequest?: Function;
    formInput?: boolean;
    formInputClassName?: string,
    tableTitleClassName?: string,
    handleOpen?: Function | string;
    customHandleOpen?: Function | string;
    className?: string;
    title?: string;
    customTitle?: string;
    uploadBtn?: { uploadCallback: Function, title: string }
    isAdd?: boolean;
    disabled?: boolean;
    customBtn?: boolean;
    viewAll?: boolean;
    isFilter?: boolean;
    columnKey?: object[];
    columnOption?: IFilterList[];
    onRequestUpdate?: Function;
    SearchInput?: boolean;
    isSort?: boolean;
    isUserType?: boolean;
    modalName?: string;
    type?: string;
    request?: ITableFormTypes;
    action?: string;
    route?: string
    filterClassName?: string;
    formClassName?: string;
    toggleHeaderClassName?: string;
    table_title?: React.ReactNode;
    tableClassName?: string;
    search_title?: string;
    toggleShow?: any;
    callToggleAdd?: Function;
    callBackSelect?: Function;
    callBackSelectItem?: Function;
    callBackListTab?: Function;
    BodyFilterList?: any;
    onChangeTab?: Function;
    searchMenu?: boolean;
    showNewFilter?: boolean;
    newFilter?: boolean;
    toggleTab?: IToggleTab[];
    toggleTabKey?: string | any;
    search_type?: string[];
    ref?: any;
    showTableColumn?: any;
    RequestPayload?: any;
    showFilter?: any;
    callStateUpdate?: any;
    setRequestPayload?: any;
    setShowTableColumn?: any;
    filterInputForm?: any;
    show_column_key?: any;
    columnTheme?: "cols" | "list";
    setShowFilter?: any;
    getValues?: any;
    register?: Function;
    reset?: Function;
    setValue?: Function;
    callBackSearch?:Function
    isSubmission?:boolean
}
type ITableFormTypes = {
    not_drawing_revision?: string
    is_inactive?: boolean
    drawing_revision?: string
    question_type?: string
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
    inventory_stock_id?: string;
    project_id?: string;
    location_name?: string;
    product_id?: string;
    from_date?: string | Date;
    end_date?: string | Date;
    to_date?: string | Date;
    created_at?: string | Date;
    submission_date?: string | Date;
    list_date?: string | Date;

};

const TableFormFilter: React.FC<ITableLayoutProps> = forwardRef(function (props, ref) {
    const { isUserType = true, SearchInput = true, showTableColumn, RequestPayload, showFilter, getValues, setRequestPayload, setShowTableColumn, setShowFilter, } = props;
    const { register, reset, setValue } = props;
    const dispatch = useDispatch();
    const { user_data, searchList, column_permissions } = usePosterReducers();
    const ToggleLabel = [
        { label: "Front Office", value: "front_office" },
        { label: "Back Office", value: "back_office" },
    ]

    const OptionSortMenu = useMemo(() => getOptionColumnMenu(props?.columnOption, props?.columnKey), [props?.columnKey?.length, props?.columnKey]);
    const columnNameShow = `${props?.type}:${!props?.show_column_key ?props?.action:`${props?.action}:${props?.show_column_key}`}`;
    const getValueColumn = useMemo(()=>{
        if(column_permissions?.[columnNameShow]){
            const findColumn = column_permissions?.[columnNameShow];
            return OptionSortMenu?.filter((item)=>findColumn.column_options?.[item?.key])
        }else{
            return showTableColumn;
        }
    },[column_permissions?.[columnNameShow], OptionSortMenu])

    const navigate = useNavigate();

    useImperativeHandle(ref, function () {
        return {
            requestState(state) {
                setRequestPayload(state)
            },
            showToggle(state) {
            }
        }
    }, [])

    function onsubmit(data: any) {
        // const updatedPayload = { ...props?.payload, request: {} };
    }

    const callShowFilter = () => {
        setShowFilter(!showFilter);
        if (showFilter) {
            setRequestPayload(props?.request);
            reset({});
        }
    };

    const callUserType = (e) => {
        if (props?.request?.user_type != null && isUserType) {
            setValue('user_type', e)
        }
        else {
            setValue(`${props?.toggleTabKey || "status"}`, e)
        }
        if (props?.request?.user_type != null && isUserType) {
            props?.callStateUpdate?.({
                page: `1`,
                user_type: e,
            });
            if (props?.onChangeTab) {
                props?.onChangeTab({
                    page: `1`,
                    user_type: e,
                })
            }
        } else {
            props?.callStateUpdate?.({
                page: `1`,
                [props?.toggleTabKey || "status"]: e,
            });
            if (props?.onChangeTab) {
                props?.onChangeTab({
                    page: `1`,
                    [props?.toggleTabKey || "status"]: e,
                })
            }
        }
    };

    const onSelectColumn = (e) => {
        setShowTableColumn(e);
    };

    const customHandleOpen = () => {
        if (props?.customHandleOpen) {
            if (typeof props?.customHandleOpen === "function") {
                props?.customHandleOpen();
            } else {
                navigate(props?.customHandleOpen)
            }
        } else {
            dispatch(
                setFormPopup({
                    status: "modal",
                    name: `${props?.modalName}`,
                })
            )
        }
    }
    const handleOpen = () => {
        if (props?.handleOpen) {
            if (typeof props?.handleOpen === "function") {
                props?.handleOpen();
            } else {
                navigate(props?.handleOpen)
            }
        } else {
            dispatch(
                setFormPopup({
                    status: "add",
                    name: `Add ${props?.modalName}`,
                })
            )
        }
    }

    const {getNameValues, getName} = useMemo(()=>{
        const getName = props?.toggleTabKey ? props?.toggleTabKey : `user_type`
        if(showFilter){
            const names = Object.keys(getValues());
            const existOrNot = names?.find(item=>getName == item);
            return {getNameValues:existOrNot ? true: false, getName: getName}
        }else{
            return {getNameValues:false, getName:getName}
        }
    }, [getValues(), props?.toggleTabKey, showFilter])

    const renderFilterSearch = () =>{
        if(!(!props?.formInput && SearchInput)){
            return null
        }
        return(
            <SearchFilter
                formInput={props?.formInput}
                SearchInput={SearchInput}
                callStateUpdate={props?.callStateUpdate}
                setValue={setValue}
                register={register}
                searchMenu={props?.searchMenu}
                search_title={props?.search_title}
                search_type={props?.search_type}
                title={props?.title}
                className={"min-w-[350px]"}
                callBackSearch={props?.callBackSearch}
            />
        )
    }
    const onSubmit  = (e) =>{
        e.preventDefault();
    }
    if(
        !props?.table_title &&
        props?.formInput &&
        !props?.isSort &&
        !props?.request?.user_type &&
        isUserType &&
        !props?.toggleTab?.length &&
        !props?.uploadBtn &&
        !props?.customBtn &&
        !props?.isAdd &&
        !props?.viewAll &&
        !props?.isFilter &&
        !props?.searchMenu &&
        !props?.showNewFilter

    ){
        return null;
    }
    return(
        <form onSubmit={onSubmit} className={`text-sm ${props?.showNewFilter?"showNewFilter":""} ${props?.formClassName ?? ""}`} >
            <div className={`lg:flex items-center justify-between mx-0 ${props?.formInputClassName}`}>
                {props?.table_title && <div className={`min-w-fit ${props?.tableTitleClassName}`}>{props?.table_title}</div>}
                {((!props?.formInput && SearchInput) || props?.isSort || props?.isFilter) &&
                    <div className="flex-row" >
                        <div className="flex items-center justify-start gap-2">
                            {renderFilterSearch()}
                            {props?.isSort && (
                                <React.Fragment>
                                    <ButtonDropDown isCheck onChange={onSelectColumn} options={OptionSortMenu} value={getValueColumn} menuTitle={"Column Filter"} theme={props?.columnTheme ?? "cols"} place="start" >
                                        <Icon attrIcon={App_url.image.sort} button buttonClassName={`br-1 btn-action bg-outline`} />
                                    </ButtonDropDown>
                                </React.Fragment>
                            )}
                                {props?.isFilter && (
                                <React.Fragment>
                                    <Icon
                                        attrIcon={App_url.image.filter}
                                        buttonClassName={` btn-action ${!showFilter ? "bg-outline" : "bg-primary"} br-1`}
                                        onClick={callShowFilter}
                                        button
                                    />
                                </React.Fragment>
                            )}
                        </div>
                    </div>
                }

                <div className="w-full">
                    <div className="flex justify-between lg:justify-end gap-2">
                        {props?.request?.user_type != null && isUserType && (
                            <TabToggleList
                                list={ToggleLabel}
                                disabled={getNameValues}
                                onChangeTab={(item)=>{
                                    callUserType(item?.value)
                                    if (props.callBackListTab)
                                        props.callBackListTab(item?.value);
                                }}
                                value={RequestPayload?.[getName]}
                            />
                        )}
                        {(props?.toggleTab?.length > 0) && (
                            <TabToggleList
                                list={props?.toggleTab}
                                disabled={getNameValues}
                                onChangeTab={(item)=>{
                                    callUserType(item?.value)
                                    if (props.callBackListTab)
                                        props.callBackListTab(item?.value);
                                }}
                                value={RequestPayload?.[getName]}
                            />
                        )}
                        {(props?.uploadBtn ) && (
                            <Button
                                onClick={props?.uploadBtn?.uploadCallback}
                                icon={App_url.image.Upload}
                                label={`${props?.uploadBtn?.title}`}
                                className="border-primary border text-primary rounded-md p-1 hover:bg-blue-100"
                            />
                        )}
                        {(props?.customBtn) && (
                            <Button
                                onClick={customHandleOpen}
                                icon={props?.customIcon||App_url.image.add}
                                label={`${props?.customTitle}`}
                                className="bg-primary text-white rounded p-1"
                            />
                        )}
                        {(props?.isAdd && (checkPermission(user_data, `${props?.type}:create`) ||props?.isSubmission )) && (
                            <NewButton onClick={handleOpen} variant="primary" className="rounded-small mr-2" disabled={props.disabled} >
                                <Icon attrIcon={App_url.image.add} size="sm" /> {props?.title}
                            </NewButton>
                        )}
                        {(props?.viewAll && checkPermission(user_data, `${props?.type}:${props?.action}`)) && (
                            <Button
                                onClick={handleOpen}
                                label={`${props?.title}`}
                                className="border border-[#0EADE5] text-[#0EADE5] hover:bg-none rounded p-1 font-[500]"
                            />
                        )}
                    </div>
                </div>
            </div>
            {props?.showNewFilter && props?.BodyFilterList?.()}
            {props?.newFilter && props?.BodyFilterList?.()}
        </form>
    )
});

export default TableFormFilter;