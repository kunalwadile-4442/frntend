/* eslint-disable */
import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import Button from "../button/Button";
import { App_url, SortingFiled } from "../../../utils/constants/static";
import Icon from "../Icon";
import { useDispatch } from "react-redux";
import { setFormPopup, setPageLoader, WarnFormSetFunctions, } from "../../../redux/actions/action";
import { useWebSocket } from "../../../api/websocket/WebSocketContext";
import PaginationPage from "../Pagination";
import Scrollbar from "../Scrollbar";
import DropdownSelect from "../DropSelect";
import { usePosterReducers } from "../../../redux/getdata/usePostReducer";
import ToggleBtn from "../ToggleBtn";
import { checkPermission, formatDate, formatDate2, sortTableLayout, UUID4, warnContent } from "../../../utils/common";
import WarnPopup from "../layout/popup/WarnPopup";
import { useUiReducer } from "../../../redux/getdata/useUiReducer";
import Calender from "../Calender";
import { PiPaperPlaneTiltLight } from "react-icons/pi";
import TableFormFilter from "./TableFormFilter";
import Button from "../button/NewButton";
import { getDisabledList, getOptionColumnMenu, getShowColumnKey, getTableColumn } from "./utilsTable";
import TabToggleList from "./TabToggleList";
import SearchFilter from "./SearchFilter";
import { callSocketColumnPermission } from "../../../utils/api_send";
import { TbTableExport } from "react-icons/tb";
import ButtonDropDown from "../button/ButtonDropDown";
import SpinnerSm from "../loader/SpinnerSm";
import DropDowns from "../DropDowns";

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
    callBackSelect?: Function
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
    action: string;
    title: string;
    description?: string;
    key_id?: string;
    status?: string;
    label?: string;
    url?: string;
}
interface IActionDownload {
    url?: string;
    status?: string;
    type?: string;
    payload?: any;
    actionLoader?: any;
    action?: string;
    label?: string;
    key_id?: string;
    value_id?: string;
    id_loader?: any;
    view?: any;
}

interface IActionViewRequest {
    status?: string;
    type: string;
    payload: any;
    action: string;
    title: string;
    description?: string;
    label?: string;
    key_id?: string;
    value_id?: string;
}
interface IActionPayloadRequest {
    info?: any;
    delete?: IActionDeleteRequest;
    status?: IActionStatusRequest;
    view?: IActionViewRequest;
    archive?: IActionDeleteRequest;
    unarchive?: IActionDeleteRequest;
    edit?: IActionDeleteRequest;
    download?: IActionDownload;
}
interface IToggleTab {
    label: string;
    value: string;
}

interface ITabToggle {
    name?: string;
    value?: string;
}
interface IToggleMultiple {
    title: string;
    column: object[];
    dataItem: object[];
}
interface ITableLayoutProps {
    initialCall?: boolean
    errors?: any;
    callBackToggleRequest?: Function;
    renderTab?: Function | any;
    formInput?: boolean;
    newFilter?: boolean;
    formInputClassName?: string,
    tableTitleClassName?: string,
    toggleClassName?: string,
    status?: boolean;
    view?: boolean;
    select?: boolean;
    showToggle?: boolean;
    buttonIcon?: React.ReactNode
    children?: React.ReactNode;
    handleOpen?: Function | string;
    customHandleOpen?: Function | string;
    openHistoryPage?: Function;
    openStatementPage?: Function;
    className?: string;
    title?: string;
    customTitle?: string;
    action_name?: string;
    customIcon?: string
    uploadBtn?: { uploadCallback: Function, title: string }
    isAdd?: boolean;
    isSubmission?:boolean
    disabled?: boolean;
    customBtn?: boolean;
    callBackReset?: Function;
    viewAll?: boolean;
    isFilter?: boolean;
    columnName?: string[];
    columnKey?: object[];
    columnToggleKey?: object[];
    ToggleMultiple?: IToggleMultiple[];
    dataItem?: object[] | any;
    toggleItem?: object[] | any;
    filterList?: IFilterList[];
    columnOption?: IFilterList[];
    columnFilter?: { [name: string]: IFilterList[] };
    initialRequest?: IRequestInitial[];
    dataList?: any;
    serial_no?: boolean;
    serial_toggle?: boolean;
    edit?: boolean;
    hidePagination?: boolean;
    sendIcon?: boolean;
    info?: boolean;
    delete?: boolean;
    timer?: boolean;
    arrow_up_right?: boolean;
    arrow_right?: boolean;
    file_alt?: boolean;
    file_download?: boolean;
    add?: boolean;
    schedule?: boolean;
    renderBody?: (item: any, index?: any, children?: React.ReactNode) => React.ReactNode | any;
    renderBodyToggle?: (item: any, index?: any, children?: React.ReactNode) => React.ReactNode;
    renderChild?: (item: any) => React.ReactNode;
    callBackState?: (item) => any;
    callBackShowToggle?: (item, action?: any) => any;
    onToggle?: Function;
    callBackSchedule?: (item) => any;
    bottomChildRender?: () => any;
    onRequestUpdate?: Function;
    payload?: object;
    setPayload?: Function;
    callBackDownload?: Function;
    isFilterCall?: boolean;
    nav?: boolean;
    SearchInput?: boolean;
    isSort?: boolean;
    isUserType?: boolean;
    isNav?: boolean;
    showAction?: boolean;
    modalName?: string;
    type?: string;
    request?: ITableFormTypes | any;
    defaultRequest?: ITableFormTypes | any;
    demo?: any;
    stateRequest?: ITableFormTypes;
    toggle_request?: ITableFormTypes;
    action?: string;
    actionPayload?: IActionPayloadRequest;
    style?: React.CSSProperties;
    toggleStyle?: React.CSSProperties;
    route?: string
    filterClassName?: string;
    formClassName?: string;
    toggleHeaderClassName?: string;
    table_title?: React.ReactNode;
    tableClassName?: string;
    search_title?: string;
    toggleShow?: any;
    callToggleAdd?: Function;
    callBackListTab?: Function;
    callBackSelect?: Function;
    callBackSelectItem?: Function;
    onChangeTab?: Function;
    onRequest?: Function;
    toggleSelect?: boolean;
    searchMenu?: boolean;
    actionRequest?: string[];
    tabToggle?: ITabToggle[];
    tab_toggle_key?: string;
    toggleTab?: IToggleTab[];
    toggleTabKey?: string | any;
    selectItem?: any[];
    search_type?: string[];
    ref?: any;
    package_id?: string
    show_column_key?: string
    hideTable?: boolean | any;
    showNewFilter?: boolean;
    showNewSearch?: boolean;
    showNewToggleTab?: IToggleTab[];
    export?: boolean;
    exportFunction?: Function;
    columnTheme?: "cols" | "list";
    customButton?: { label: string, loader?: boolean, option: { label: string, value: string, callBack: Function }[] };
    callBackCustomButton?: Function;
    callBackSearch?:Function
    requestDeps?:any[]
    allowed_item_arr?: any[];
}
type ITableFormTypes = {
    not_drawing_revision?: string
    package_id?: string
    is_inactive?: boolean
    drawing_revision?: string
    question_type?: string
    status?: string
    search?: string;
    query?: string;
    supplier_id?: string | any;
    invoice_for?: string | any;
    customer_id?: string | any;
    limit?: string | number;
    page?: string | number;
    action_type?: string | any;
    supplier_name?: string | any;
    customer_name?: string | any;
    role_id?: string;
    parent_id?: string;
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
export type IRefTable = {
    current: {
        requestState: Function;
        resetRequest: Function;
        stateSelectToggleItem: Function;
        showToggle: Function;
        callReset: Function;
    }
}

const TableComponent: React.FC<ITableLayoutProps> = forwardRef(function (props, ref) {
    const { action_name = "Action", isUserType = true, callBackState, serial_toggle = true, initialCall = true } = props;
    const { register, control, reset, setValue, getValues, watch } = useForm<ITableFormTypes | any>({});

    useEffect(() => {
        if (props?.request) {
            reset(props?.request);
        }
    }, [])
    const dispatch = useDispatch();
    const { send, isConnect } = useWebSocket();
    const { user_data, socketResponse, searchList, column_permissions } = usePosterReducers();
    const { pageLoader } = useUiReducer();
    const param = useParams()
    const OptionSortMenu = useMemo(() => getOptionColumnMenu(props?.columnOption, props?.columnKey), [props?.columnKey?.length, props?.columnKey, props?.columnOption?.length, props?.columnOption]);
    const OptionSortShow = useMemo(() => getTableColumn(props?.columnOption, props?.columnKey), [props?.columnKey, props?.columnKey?.length, props?.columnOption?.length, props?.columnOption]);
    const loc = useLocation();
    const navigate = useNavigate();
    const [RequestPayload, setRequestPayload] = useState(props?.request);
    const [SortColumn, setSortColumn] = useState(null);
    const [filterToggleItem, setFilterToggleItem] = useState(null);
    const { selectItem = [] } = props
    const [selectToggleItem, setSelectToggleItem] = useState([]);
    const [showTableColumn, setShowTableColumn] = useState(OptionSortShow);
    const [showFilter, setShowFilter] = useState<any>("");
    const [toggleRequest, setToggleRequest] = useState(props?.toggle_request);
    const [ShowToggle, setShowToggle] = useState(null);
    const [statusRequest, setStatusRequest] = useState(true)
    const ids = useMemo(() => UUID4(), [])

    useImperativeHandle(ref, function () {
        return {
            requestState(state) {
                setRequestPayload(state)
            },
            resetRequest(state) {
                reset(state)
            },
            stateSelectToggleItem(state) {
                setSelectToggleItem(state)
            },
            showToggle(state) {
                setShowToggle(state)
            },
            callReset(state) {
                callResetFilter(state)
            }
        }
    }, [])
    useEffect(() => {
        if (props?.stateRequest?.status) {
            setRequestPayload(props?.stateRequest)
        }
    }, [props?.stateRequest?.status]);
    // useMemo(() => {
    //     setShowTableColumn(OptionSortShow)
    // }, [props?.columnKey]);

    useEffect(() => {
        if (props?.toggleShow) {
            setShowToggle(props?.toggleShow)
        } else {
            setShowToggle(null);
        }
    }, [props?.toggleShow])
    useEffect(() => {
        if (`${socketResponse?.type}:${socketResponse?.action}:${ids}` === pageLoader || socketResponse?.request?.demo?.uuids) {
            dispatch(setPageLoader());
        }
    }, [socketResponse])
    useEffect(() => {
        if (props?.initialRequest) {
            props?.initialRequest?.map?.((item, index) => {
                if (isConnect) {
                    send(item);
                }
            });
        }
    }, [isConnect]);

    const columnNameShow = `${props?.type}:${!props?.show_column_key ? props?.action : `${props?.action}:${props?.show_column_key}`}`;
    useEffect(() => {
        if (isConnect && props?.action && props?.type && props?.columnKey?.length) {
            callGenerateColumnPermission()
        }
    }, [isConnect, column_permissions, props?.columnKey?.length, props?.action, props?.type])
    const getValueColumn = useMemo(() => {
        if (column_permissions?.[columnNameShow]) {
            const findColumn = column_permissions?.[columnNameShow];
            return OptionSortMenu?.filter?.((item) => findColumn.column_options?.[item?.key])
        } else {
            return showTableColumn;
        }
    }, [column_permissions?.[columnNameShow], OptionSortMenu])
    const callGenerateColumnPermission = () => {
        if (!column_permissions?.[columnNameShow]) {
            const columnTable = {};
            let columnTableOptions = {};
            props?.columnKey?.map((item: any) => {
                columnTable[item?.key] = true;
            })
            if (props?.columnOption?.length > 0) {
                props?.columnOption?.map((item: any) => {
                    if (!columnTable[item?.key]) {
                        columnTableOptions[item?.key] = false;
                    } else {
                        columnTableOptions[item?.key] = true;
                    }
                })
            } else {
                Object.keys(columnTable).map((item) => {
                    columnTableOptions[item] = true;
                });
            }
            const payload = {
                ...column_permissions,
                [columnNameShow]: {
                    column: columnTable,
                    column_options: columnTableOptions,
                }
            }
            callSocketColumnPermission(send, payload);
        }
    }
    const onChangeColumnMenu = (e) => {
        const filterList = {};
        const columns = column_permissions?.[columnNameShow];
        if (columns) {
            Object.keys(columns?.column_options)?.map((item) => {
                filterList[item] = false;
            })
        }

        e?.map((item) => {
            filterList[item?.key] = true
        })
        const payload = {
            ...column_permissions,
            [columnNameShow]: {
                column: columns?.column,
                column_options: filterList,
            }
        }
        callSocketColumnPermission(send, payload);
        setShowTableColumn(e);
    }
    // useEffect(() => {
    //     const element = document.getElementById("filter-body-list");
    //     if (element) {
    //         const height = element.clientHeight;
    //         setFilterHeight(height + 11)

    //     } else {
    //         setFilterHeight(0)
    //     }
    // }, [showFilter])

    const callStateUpdate = (payload: ITableFormTypes, state?: boolean, itemSelected?: any) => {
        if (!state) {
            const requestPayloadData = {
                ...payload
            };
            const checkFind = SortingFiled?.find?.((item, index) => item == payload.sort_by);
            if (checkFind && requestPayloadData?.sort_by) {
                requestPayloadData.sort_by = `${checkFind}_lc`;
            }
            setRequestPayload((data) => ({
                ...data,
                ...requestPayloadData,
            }));
            if (props?.onRequestUpdate) {
                if (checkFind && requestPayloadData?.sort_by) {
                    requestPayloadData.sort_by = `${checkFind}`;
                }
                props?.onRequestUpdate({
                    ...RequestPayload,
                    ...requestPayloadData
                })
            }
        } else {
            const requestPayloadData = {
                ...payload
            };
            const checkFind = SortingFiled?.find?.((item, index) => item == payload.sort_by);
            if (checkFind && requestPayloadData?.sort_by) {
                requestPayloadData.sort_by = `${checkFind}_lc`;
            }
            if (props?.callBackToggleRequest) {
                props?.callBackToggleRequest(requestPayloadData, itemSelected);
            }
            if (checkFind && requestPayloadData?.sort_by) {
                requestPayloadData.sort_by = `${checkFind}`;
            }
            setToggleRequest(requestPayloadData);
        }
    };

    const callInitialList = (firstRequest?: any, RequestPayload?: ITableFormTypes, requestFilter1?: any) => {
        const requestFilter = getValues();
        if (user_data?.user?.role === "admin" || checkPermission(user_data, `${props?.type}:${props?.action}`)) {
            if (isConnect && props?.request) {
                const requestPayload = {
                    ...props?.request,
                    ...RequestPayload,
                    ...((showFilter || props?.showNewFilter) ? requestFilter1 || requestFilter : null)
                }
                if (requestPayload?.from_date) {
                    requestPayload.from_date = formatDate2(requestPayload?.from_date)
                }
                if (requestPayload?.submission_date) {
                    requestPayload.submission_date = formatDate2(requestPayload?.submission_date)
                }
                if (requestPayload?.list_date) {
                    requestPayload.list_date = formatDate2(requestPayload?.list_date)
                }
                if (requestPayload?.to_date) {
                    requestPayload.to_date = formatDate2(requestPayload?.to_date)
                }

                if (requestPayload?.created_at) {
                    requestPayload.created_at = formatDate2(requestPayload?.created_at)
                }

                if (props?.package_id) {
                    requestPayload.package_id = props?.package_id
                }

                const payload: any = {
                    type: props?.type,
                    action: props?.action,
                    payload: requestPayload,
                };
                if (props?.demo) {
                    payload.demo = {
                        ...props?.demo,
                        uuids: ids
                    }
                } else {
                    payload.demo = {
                        uuids: ids
                    }
                }
                if (props?.onRequest) {
                    props?.onRequest?.(requestPayload);
                }
                if (!props?.isFilterCall)
                    send(payload);
                if (firstRequest) {
                    dispatch(setPageLoader(`${props?.type}:${props?.action}:${ids}`))
                }
            }
        }
    };

    useEffect(() => {
        // initial request call
        if (isConnect && initialCall) {
            callInitialList(true, RequestPayload);
            setTimeout(() => setStatusRequest(false), 1000)
        }
    }, [isConnect]);
    const requestDeps = useMemo(() => props?.requestDeps || [], [props?.requestDeps]);
    useEffect(() => {
        // request update call
        if (!statusRequest && isConnect) {
            callInitialList(false, RequestPayload);
        }
    }, [isConnect, RequestPayload]);

    useEffect(() => {
        // request update call
        if (!statusRequest && isConnect) {
            setRequestPayload(props.request)
        }
    }, [isConnect,...requestDeps]);

    useEffect(() => {
        if (props?.actionRequest?.length) {
            const isFind = props?.actionRequest?.find?.((item) => item === `${socketResponse?.type}:${socketResponse?.action}`);
            if (isFind) {
                callInitialList(false, RequestPayload);
            }
        }
    }, [props?.actionRequest, socketResponse])

    //props for add icon added :=> single add functionality needed in project management
    const renderHeaderAction = () => {
        if (
            !(props?.edit && checkPermission(user_data, `${props?.type}:update`)) &&
            !(props?.delete && checkPermission(user_data, `${props?.type}:delete`)) &&
            !(props?.status && checkPermission(user_data, `${props?.type}:updateStatus`)) &&
            !props?.view &&
            !props?.info &&
            !props?.showAction &&
            !props?.add &&
            !props?.schedule &&
            !(props?.sendIcon) &&
            !(props?.actionPayload?.unarchive && checkPermission(user_data, `${props?.actionPayload?.unarchive?.type}:${props?.actionPayload?.unarchive?.action}`))
        ) {
            return <React.Fragment></React.Fragment>;
        }
        return <th className="action_column head-1 text-center" table-head={action_name} ><div className="th-data">{action_name}</div></th>;
    };
    const callSelectSort = (item: { key: string }) => {
        const payload = { ...RequestPayload, sort_by: item?.key, sort_order: "asc", page: `1` };
        if (SortColumn?.sort_by == item?.key && SortColumn?.sort_order == "desc") {
            setSortColumn(null);
            callStateUpdate({
                ...RequestPayload,
                sort_by: "",
                sort_order: "",
                page: `1`,
            });
        } else {
            if (SortColumn?.sort_by == item?.key && SortColumn?.sort_order == "asc") {
                payload.sort_order = "desc";
            }
            setSortColumn(payload);
            callStateUpdate(payload);
        }
    };
    const callToggleSelectSort = (item: { key: string }, itemSelected) => {
        const payload = { sort_by: item?.key, sort_order: "asc", page: `1` };
        if (filterToggleItem?.sort_by == item?.key && filterToggleItem?.sort_order == "desc") {
            setFilterToggleItem(null);
            callStateUpdate({
                sort_by: "",
                sort_order: "",
                page: `1`,
            }, true, itemSelected);
        } else {
            if (filterToggleItem?.sort_by == item?.key && filterToggleItem?.sort_order == "asc") {
                payload.sort_order = "desc";
            }
            setFilterToggleItem(payload);
            callStateUpdate(payload, true, itemSelected);
        }
    };

    const callShowFilter = (item) => {
        if (showFilter == item?.key) {
            setShowFilter("");
            setTimeout(() => callInitialList(false, RequestPayload, {}), 200)
        } else {
            setShowFilter(item?.key);
        }
        if (showFilter !== item?.key) {
            if (props?.columnFilter?.[item?.key]) {
                const values = props?.columnFilter?.[item?.key]
                const payloads = {};
                values.map((item) => {
                    if (!props?.defaultRequest?.[item?.name])
                        payloads[item?.name] = null
                    else
                        payloads[item?.name] = props?.defaultRequest?.[item?.name];
                });
                reset(payloads);
            } else {
                reset({});
            }
            setRequestPayload(props?.request);
        } else {
            reset({});
        }
    };
    const OptionLimitPage = [
        { label: "1", value: "1" },
        { label: "10", value: "10" },
        { label: "20", value: "20" },
        { label: "30", value: "30" },
        { label: "40", value: "40" },
        { label: "50", value: "50" },
        { label: "60", value: "60" },
        { label: "70", value: "70" },
        { label: "80", value: "80" },
        { label: "90", value: "90" },
        { label: "100", value: "100" },
    ];
    const callPagination = (page) => {
        callStateUpdate({
            page: `${page}`,
        });
    };
    const onChangeLimit = (e) => {
        callStateUpdate({
            page: `1`,
            limit: e.target.value,
        });
    };
    const callUserType = (e) => {
        if (props?.request?.user_type != null && isUserType) {
            setValue('user_type', e)
        }
        else {
            setValue(`${props?.toggleTabKey || "status"}`, e)
        }
        if (props?.request?.user_type != null && isUserType) {
            callStateUpdate({
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
            callStateUpdate({
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


    function onMonthChange(e, startName, endName) {
        const startDate = e;
        const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
        setValue(endName, endDate)
        const data = getValues();
        callInitialList(false, RequestPayload, {
            ...data,
            [startName]: startDate ?? null,
            [endName]: endDate ?? null,
        })
        setShowCalender(false)
    }

    const onChange = (e, name) => {
        // setRequestPayload((data) => ({
        //     ...data,
        //     [name]: e ? e : null,
        // }));
        // setValue(name, e ? e : null)
        const data = getValues();
        callInitialList(false, RequestPayload, {
            ...data,
            [name]: e ?? null,
        })
        if (callBackState) {
            callBackState({
                [name]: e ?? null,
            })
        }
    };
    const onSelect = (e) => {
        // setRequestPayload((data) => ({
        //     ...data,
        //     [e.name]: e.value || null,
        // }));
        // setValue(e.name, e.value || null,)

        const data = getValues();
        callInitialList(false, RequestPayload, {
            ...data,
            [e.name]: e.value ?? null,
        })
        if (callBackState) {
            callBackState({
                ...e,
                [e.name]: e.value ?? null,
            })
        }
    };

    const callResetFilter = (isReset) => {
        if(props?.callBackReset){
            props?.callBackReset()
            reset()
        }
        else{
            const request: any = {
                ...props?.defaultRequest,
                page: props?.request?.page,
                limit: props?.request?.limit,
            }
            Object.keys(props?.request).map((item) => {
                if (item != "page" && item != "limit" && !props?.defaultRequest?.[item])
                    request[item] = "";
            })
            if (!props?.request?.page) {
                delete request.page
            }
            if (!props?.request?.limit) {
                delete request.limit
            }
            if (!props.showNewSearch || !(props?.formInput || !props?.SearchInput)) {
                request.search = '';
            }
            reset(request);
            setRequestPayload(request)
        }
        // if (props?.package_id) {
        //     if (props?.callBackReset && isReset)
        //         props?.callBackReset({ ...request, package_id: props?.package_id, project_id: param?.id })
        //     else
        //         setRequestPayload({ ...request, package_id: props?.package_id, project_id: param?.id });
        // }
        // else {
        //     if (props?.callBackReset && isReset)
        //         props?.callBackReset(request)
        //     else
        //         setRequestPayload(request);
        // }

    };
    const onSelectColumn = (e) => {
        setShowTableColumn(e);
    };
    function handleDelete(warnForm) {
        const payload = {
            type: props?.actionPayload?.delete?.type,
            action: props?.actionPayload?.delete?.action,
            payload: { id: warnForm.url },
        };
        if (props?.actionPayload?.delete.key_id) {
            const dataKey = warnForm[props?.actionPayload?.delete.key_id]
            payload.payload[props?.actionPayload?.delete.key_id] = dataKey;
        }
        send(payload);
    }
    function handleArchive(warnForm) {
        const payload = {
            type: props?.actionPayload?.archive?.type,
            action: props?.actionPayload?.archive?.action,
            payload: { id: warnForm.url },
        };
        if (props?.actionPayload?.archive.key_id) {
            const dataKey = warnForm[props?.actionPayload?.archive.key_id]
            payload.payload[props?.actionPayload?.archive.key_id] = dataKey;
        }
        send(payload);
    }
    function handleUnArchive(warnForm) {
        const payload = {
            type: props?.actionPayload?.unarchive?.type,
            action: props?.actionPayload?.unarchive?.action,
            payload: { id: warnForm.url },
        };
        if (props?.actionPayload?.unarchive.key_id) {
            const dataKey = warnForm[props?.actionPayload?.unarchive.key_id]
            payload.payload[props?.actionPayload?.unarchive.key_id] = dataKey;
        }
        send(payload);
    }
    function handleInfo(warnForm) {
        if (props?.actionPayload?.info) {
            const payload = {
                type: props?.actionPayload?.info?.type,
                action: props?.actionPayload?.info?.action,
                payload: { id: warnForm.id },
                demo: {
                    request_for: "info"
                }
            };
            if (props?.actionPayload?.info.key_id) {
                const dataKey = warnForm[props?.actionPayload?.info.key_id]
                payload.payload[props?.actionPayload?.info.key_id] = dataKey;
            }
            send(payload);
            dispatch(
                setFormPopup({
                    status: "modal",
                    name: `${props?.actionPayload?.info?.title}`,
                })
            )
        }
    }


    const [ShowCalender, setShowCalender] = useState(false)

    function onClickMonthCalendar() {
        setShowCalender(prev => !prev)
    }

    function handleStatusChange(warnForm) {
        const payload = {
            type: props?.actionPayload?.status?.type,
            action: props?.actionPayload?.status?.action,
            payload: { id: warnForm?.id, active: warnForm?.active },
        };
        if (props?.actionPayload?.status?.key_id) {
            const dataKey = warnForm[props?.actionPayload?.status?.key_id]
            payload.payload[props?.actionPayload?.status?.key_id] = dataKey;
        }
        send(payload);
    }
    const callClickArchive = (item) => {
        if (props?.actionPayload?.archive) {
            dispatch(
                WarnFormSetFunctions({
                    status: "archive",
                    url: item?.id,
                    name: `${props?.actionPayload?.archive?.title}`,
                    callBackButtonSuccess: () => handleArchive(item)
                })
            )
        } else {
            dispatch(
                WarnFormSetFunctions({
                    status: "archive",
                    url: item?.id,
                    name: props?.modalName,
                })
            )
        }
    }
    const callClickUnArchive = (item) => {
        if (props?.actionPayload?.unarchive) {
            dispatch(
                WarnFormSetFunctions({
                    status: "unarchive",
                    url: item?.id,
                    name: `${props?.actionPayload?.unarchive?.title}`,
                    callBackButtonSuccess: () => handleUnArchive(item)
                })
            )
        } else {
            dispatch(
                WarnFormSetFunctions({
                    status: "unarchive",
                    url: item?.id,
                    name: props?.modalName,
                })
            )
        }
    }
    const callClickDelete = (item) => {
        if (props?.actionPayload?.delete) {
            dispatch(
                WarnFormSetFunctions({
                    status: "delete",
                    url: item?.id,
                    name: `Delete ${props?.actionPayload?.delete?.title}`,
                    callBackButtonSuccess: () => handleDelete(item)
                })
            )
        } else {
            dispatch(
                WarnFormSetFunctions({
                    status: "delete",
                    url: item?.id,
                    name: props?.modalName,
                })
            )
        }
    }
    const callClickSchedule = (item) => {
        if (props?.callBackSchedule) {
            props?.callBackSchedule(item);
        }
    }

    const callClickView = (item) => {
        if (props?.actionPayload?.view) {
            dispatch(
                setFormPopup({
                    status: "view",
                    url: item?.id,
                    name: props?.modalName,
                })
            )
        } else {
            dispatch(
                setFormPopup({
                    status: "view",
                    url: item?.id,
                    name: props?.modalName,
                })
            )
        }
    }

    const openHistoryPage = (item) => {
        if (props?.openHistoryPage) {
            props?.openHistoryPage(item);
        } else {
            dispatch(
                setFormPopup({
                    status: "add",
                    name: `Add ${props?.modalName}`,
                })
            )
        }
    }

    const openStatementPage = (item) => {
        if (props?.openStatementPage) {
            props?.openStatementPage(item);
        }
    }

    const callClickStatusChange = (e, item) => {
        if (props?.actionPayload?.status) {
            const checkForm = e.target.checked;
            dispatch(
                WarnFormSetFunctions({
                    status: 'status',
                    url: { ...item, active: e?.target?.checked },
                    name: `Edit status of ${props?.actionPayload?.status?.title}`,
                    callBackButtonSuccess: () => handleStatusChange({ ...item, active: checkForm })
                })
            );
        } else {
            dispatch(
                WarnFormSetFunctions({
                    status: 'status',
                    url: { ...item, active: e?.target?.checked },
                    name: props?.modalName,
                })
            );
        }
    }
    // table thead visible component
    const ShowHeaderColumn = (columnName: any, index: number, showTableColumn, classNameVisible) => {
        const item = (props?.isSort ? showTableColumn : OptionSortShow)?.find?.((name) => name?.key == columnName?.key || name?.name == columnName?.name);
        const SortActionIcon = () => {
            if (!columnName?.showSort) {
                return <></>
            }
            return (
                <React.Fragment>
                    {SortColumn?.sort_by == item?.key ? (
                        <Icon attrIcon={App_url?.image?.SortList} image className={`${SortColumn?.sort_order != "asc" ? "" : "-rotate-180"}`} />
                    ) : (
                        <Icon attrIcon={App_url?.image?.FilterSort} image />
                    )}
                </React.Fragment>
            );
        };
        if (!item) {
            return <React.Fragment></React.Fragment>;
        }
        return (
            <React.Fragment key={index}>
                <th
                    key={index}
                    className={`th-column ${classNameVisible}`}
                    onClick={() => columnName?.showSort && callSelectSort(item)}
                    table-head={item?.name}
                    align={columnName?.align || ""}
                >
                    <div className={`th-data column_filter align-${columnName?.align}`}>
                        {item?.name}
                        {props?.columnFilter?.[item?.key] && (
                            <span className="ps-2 inline-flex gap-2">
                                <Icon button size="small" buttonClassName={showFilter == item?.key ? "primary" : "h-primary"} onClick={() => callShowFilter(item)} attrIcon={App_url.image.filterFill} className="sm" />
                                {showFilter == item?.key && (
                                    <Icon button onClick={() => callShowFilter(item)} size="small" buttonClassName="h-primary" attrIcon={App_url.image.close} className="sm" />
                                )}
                            </span>
                        )}
                        {SortActionIcon()}
                    </div>
                </th>
            </React.Fragment>
        );
    };
    // table thead visible component
    const callToggleHeaderVisible = (columnName: any, index: number, itemSelected) => {
        const SortActionIcon = () => {
            if (!columnName?.key) {
                return <></>
            }
            return (
                <React.Fragment>
                    {filterToggleItem?.sort_by == columnName?.key ? (
                        <Icon attrIcon={App_url?.image?.SortList} image className={`${filterToggleItem?.sort_order != "asc" ? "" : "-rotate-180"}`} />
                    ) : (
                        <Icon attrIcon={App_url?.image?.FilterSort} image />
                    )}
                </React.Fragment>
            );
        };
        return (
            <React.Fragment key={index}>
                <th
                    key={index}
                    className={`th-column ${columnName?.key ? "" : "disable"}`}
                    onClick={() => columnName?.key && callToggleSelectSort(columnName, itemSelected)}
                    align={columnName?.align || ""}
                >
                    <div className={`th-data column_filter align-${columnName?.align}`}>
                        {columnName?.name}
                        {SortActionIcon()}
                    </div>
                </th>
            </React.Fragment>
        );
    };

    const callBackSelectItem = (item) => {
        if (props?.callBackSelectItem) {
            props?.callBackSelectItem(item);
        }
    }
    const callBackSelect = (item) => {
        if (props?.callBackSelect) {
            props?.callBackSelect?.(item);
        }
    }
    const getCurrentSelectedList = useMemo(() => {
        return selectItem?.filter?.((item) =>
            props?.dataItem?.some((data) => data?.id === item?.id)
        );
    }, [selectItem?.length, props?.dataItem]);
    const isChecked = useMemo(() => {
        if (props?.allowed_item_arr?.length > 0) {
            return (
                props?.allowed_item_arr?.every((item) =>
                    props?.selectItem?.some((selected) => selected?.id === item?.id)
                ) && props?.allowed_item_arr?.length > 0
            );
        } else {
            return (
                getCurrentSelectedList?.length === props?.dataItem?.length &&
                getCurrentSelectedList?.length > 0
            );
        }
    }, [getCurrentSelectedList, props?.allowed_item_arr, props?.selectItem]);

    const callAllSelectItem = () => {
      if(props?.allowed_item_arr?.length>0){
        const isAllSelected = props.allowed_item_arr?.every(item => props?.selectItem?.includes?.(item));
        if (isAllSelected) {
            props.callBackSelect(props.selectItem?.filter?.(item => !props.allowed_item_arr.includes?.(item)));
            return
        } else {
            props.callBackSelect([
                ...new Set([
                  ...(Array.isArray(props.selectItem) ? props.selectItem : []),
                  ...(Array.isArray(props.allowed_item_arr) ? props.allowed_item_arr : [])
                ])
              ]);

        }
      }
      else{
        const selectedList = getCurrentSelectedList;
        if (selectedList?.length !== props?.dataItem?.length && selectItem !== undefined) {
            const newSelection = [...selectItem];
            props?.dataItem?.forEach?.((item) => {
                if (!newSelection?.some?.((selected) => selected?.id === item?.id)) {
                    newSelection?.push?.(item);
                }
            });
            callBackSelect(newSelection);
        } else {
            const newSelection = selectItem?.filter?.(
                (item) => !props?.dataItem?.some?.((data) => data?.id === item?.id)
            );
            callBackSelect(newSelection);
        }
    }
    };
    const themeDate = {
        secondary: "bg-[#F0F0F0] border-l border-l-table"
    }



    const filterInputForm = (item: any, index: any, isNewFilter?: any) => {
        if (item?.type == "date_range") {
            const filterRequest = watch();
            return (
                <div className="date_range-wrapper">
                    <label className="date-label">{item?.label}</label>
                    <div className="date_range">
                        <Calender
                            name={item?.start_name}
                            showIcon={false}
                            inputClassName="input_range_date"
                            placeholder={item?.start_placeholder}
                            value={filterRequest?.[item?.start_name] || null}
                            onChange={(e) => onChange(e, item?.start_name)}
                            maxDate={filterRequest?.[item?.end_name] ? filterRequest?.[item?.end_name] : null}
                            endDate={filterRequest?.[item?.end_name] ? filterRequest?.[item?.end_name] : null}
                            startDate={filterRequest?.[item?.start_name] ? filterRequest?.[item?.start_name] : null}
                            isClearable={filterRequest?.[item?.start_name]}
                            selectsStart={true}
                            control={control}
                            labelClassName={item?.labelClassName}
                            isConvert
                        />
                        <Calender
                            name={item?.end_name}
                            showIcon={false}
                            inputClassName="input_range_date"
                            placeholder={item?.end_placeholder}
                            value={filterRequest?.[item?.end_name] || null}
                            onChange={(e) => onChange(e, item?.end_name)}
                            endDate={filterRequest?.[item?.end_name] ? filterRequest?.[item?.end_name] : null}
                            startDate={filterRequest?.[item?.start_name] ? filterRequest?.[item?.start_name] : null}
                            minDate={filterRequest?.[item?.start_name] ? filterRequest?.[item?.start_name] : null}
                            isClearable={filterRequest?.[item?.end_name]}
                            selectsEnd={true}
                            labelClassName={item?.labelClassName}
                            control={control}
                            isConvert
                        />

                        <Calender
                            name={item?.start_name}
                            showIcon={false}
                            isShowMonthYearPicker
                            dateFormat="MM/yyyy"
                            selectsEnd={true}
                            onChange={(e) => onMonthChange(e, item?.start_name, item?.end_name)}
                            inputClassName="!hidden"
                            labelClassName={item?.labelClassName}
                            control={control}
                            className="mr-11"
                            isConvert
                            open={ShowCalender}  // Controls visibility
                            callBackonClickOutside={() => setShowCalender(false)}

                        />
                        <label
                            className={`icon_calender ${themeDate?.[item?.theme]}`}
                            onClick={onClickMonthCalendar}
                        >
                            <Icon attrIcon={App_url.image.calendar} className="sm" />
                        </label>
                    </div>
                </div>
            );
        }
        if (item?.type === "date") {
            const filterRequest = watch();
            return (
                <Calender
                    name={item?.name}
                    showIcon={true}
                    placeholder={item?.placeholder}
                    value={filterRequest?.[item?.name] || null}
                    onChange={(e) => onChange(e, item?.name)}
                    label={item?.label}
                    isClearable={filterRequest?.[item?.name]}
                    control={control}
                    isConvert
                    inline={item?.inline}
                    labelClassName={item?.labelClassName}
                    calenderTheme={item?.calenderTheme}
                />
            )
        }
        if (item?.type === "toggle") {
            const filterRequest = watch();
            return (
                <ToggleBtn
                    name={item?.name}
                    isChecked={filterRequest?.[item?.name] || null}
                    onChange={(e) => onChange(e, item?.name)}
                    label={item?.label}
                    labelClassName={`pb-2 ${item?.labelClassName}`}
                    control={control}
                />
            )
        }
        if (item?.type == "select") {
            const filterRequest = watch();
            return (
                <DropdownSelect
                    onSelect={(e)=>item?.callBackSelect ? item?.callBackSelect(e,props) : onSelect(e)}
                    onChange={() => { }}
                    label={item?.label}
                    defaultValue={item?.defaultValue}
                    placeholder={item?.placeholder}
                    labelClassName={`${item?.labelClassName}`}
                    options={item?.options}
                    value={filterRequest?.[item?.name] || null}
                    control={control}
                    name={item?.name}
                    theme={item?.theme}
                    name_key={item?.name}
                    isClearable
                    disabled={item?.disabled}
                />
            );
        }

        return (
            <React.Fragment>
                <InputField
                    name={item?.label}
                    placeholder={item?.label}
                    inputClassName="h-10 rounded-md"
                    register={register(item?.name)}
                />
            </React.Fragment>
        );
    };
    const { getName } = useMemo(() => {
        const getName = props?.toggleTabKey ? props?.toggleTabKey : `user_type`
        return { getNameValues: false, getName: getName }
    }, [props?.toggleTabKey]);

    const renderSearchFilter = () => {
        if (props.showNewSearch) {
            return null;
        }
        return (
            <SearchFilter
                formInput={false}
                SearchInput={true}
                callStateUpdate={callStateUpdate}
                setValue={setValue}
                register={register}
                searchMenu={props?.searchMenu}
                search_title={props?.search_title}
                search_type={props?.search_type}
                title={props?.title}
            />
        )
    }

    const BodyFilterList = (filterListData?: any) => {
        if (props?.showNewFilter) {
            return <React.Fragment>
                <div className={`table-filter ${props?.filterClassName} !mb-0 !border-none`} id={'filter-body-list'} >
                    <div className={`flex gap-2 `}>
                        {renderSearchFilter()}
                        <div className={`flex row-filter  ${props?.filterList?.length >= 3 ? `grid-cols-3` : `grid-cols-${props?.filterList?.length}`} `}>
                            {props?.filterList?.map((item, index) => (
                                <React.Fragment key={index}>
                                    <div className={`form-controller form-type-${item?.type} ${item?.name} !py-[2px]  ${item?.type == "date" ? "new-date" : ""} ${index > 3 && "mt-2"}  ${props?.filterList?.length == 4 ? "!max-w-[calc(25%-13px)] " : `!max-w-[calc(33%-30px)]`}`}>
                                        {filterInputForm(item, index)}
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                        {props?.showNewToggleTab &&
                            <div className="flex items-center justify-center">
                                <TabToggleList
                                    list={props?.showNewToggleTab}
                                    disabled={false}
                                    onChangeTab={(item) => {
                                        callUserType(item?.value)
                                        if (props.callBackListTab)
                                            props.callBackListTab(item?.value);
                                    }}
                                    value={RequestPayload?.[getName]}
                                />
                            </div>
                        }
                        {props?.customButton &&
                            // <div className="flex items-center justify-center">
                            //     <ButtonDropDown
                            //         className="bg-primary text-white p-[0.35rem] px-3 rounded-md"
                            //         options={props?.customButton?.option}
                            //     >
                            //         <div className="flex items-center justify-center gap-1 cursor-pointer">
                            //             <p>{props?.customButton?.label}</p>
                            //             {!props?.customButton?.loader ? <Icon
                            //                 attrIcon={App_url.image.AngleDown}
                            //                 className="white sm"
                            //             /> : <SpinnerSm className="border-white w-3 h-3" />}
                            //         </div>
                            //     </ButtonDropDown>

                            // </div>
                            <DropDowns label={props?.customButton?.label} option={props?.customButton?.option}/>
                        }
                        <div className="flex items-center justify-center">
                            <Button type="reset" onClick={() => callResetFilter(true)} variant="primary" className="rounded-small w-24" >
                                <Icon attrIcon={App_url.image.Reset} />
                                Reset
                            </Button>
                        </div>
                    </div>
                </div>
            </React.Fragment>;
        }
        if (!showFilter) {
            return <React.Fragment></React.Fragment>
        }
        return (
            <React.Fragment>
                <div className={`table-filter w-full ${props?.filterClassName}`} id={'filter-body-list'} >
                    <div className={`flex row-filter grid-cols-3 `}>
                        {(filterListData || props?.filterList)?.map?.((item, index) => (
                            <React.Fragment key={index}>
                                <div className={`form-controller !w-full form-type-${item?.type} ${index >= 4 && "mt-2"} ${(filterListData || props?.filterList)?.length >= 3 ? "!max-w-[calc(25%-30px)] " : `max-w-[calc(33%-30px)]`}`}>
                                    {filterInputForm(item, index)}
                                </div>
                            </React.Fragment>
                        ))}
                        <div className="reset-form flex items-end justify-end">
                            <Button type="reset" onClick={() => callResetFilter(true)} variant="primary" className="rounded-small" >
                                <Icon attrIcon={App_url.image.Reset} />
                                Reset
                            </Button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    };
    // Table Header content
    const TableHeader = () => {
        return (
            <thead className="thead_parent">
                <tr>
                    {/* {props?.select && (
                        <th className="toggle-th head-1" table-head={"select"}>
                            <label htmlFor={`data-table-${ids}`} className="th-data " >
                                <input type="checkbox" className="checkBox" id={`data-table-${ids}`} checked={isChecked} onChange={callAllSelectItem} />
                            </label>
                        </th>
                    )} */}
                {props?.select && (
                        <th className="toggle-th head-1" table-head={"select"}>
                            {props?.allowed_item_arr?.length > 0 ? (
                                <label htmlFor={`data-table-${ids}`} className="th-data">
                                    <input
                                        type="checkbox"
                                        className="checkBox"
                                        id={`data-table-${ids}`}
                                        checked={isChecked}
                                        onChange={callAllSelectItem}
                                    />
                                </label>
                            ) : null}
                        </th>
                    )}
                    {props?.select === false && (
                        <th className="toggle-th head-1" table-head={"select"}>

                        </th>
                    )}

                    {props?.showToggle && (
                        <th className="toggle-th head-1" table-head={"show-toggle"}>
                            <div className="th-data "></div>
                        </th>
                    )}
                    {props?.serial_no && (
                        <th align="center" table-head={"Sr. No."} className="head-1 text-center serial_no">
                            <div className="th-data">Sr. No.</div>
                        </th>
                    )}

                    {OptionSortMenu?.map?.((columnName, index) => (
                        <React.Fragment key={index}>
                            {ShowHeaderColumn(columnName, index, getValueColumn, "head-1")}
                        </React.Fragment>
                    ))}
                    {renderHeaderAction()}
                </tr>
                {typeof showFilter == "string" && showFilter && (
                    <tr>
                        <th colSpan={1000} className="table-header-filter">
                            <div className={`flex !gap-2 ${props?.filterList?.length >= 3 ? "grid-cols-3" : "grid-cols-3"} `}>
                                {BodyFilterList(props?.columnFilter?.[showFilter])}
                            </div>
                        </th>
                    </tr>
                )}
            </thead>
        );
    }

    const callAllSelect = (e, items) => {
        const selectedItems = getDisabledList(selectToggleItem)
        if (!e?.target?.checked) {
            const selectedOne = [];
            if (selectedItems?.length > 0) {
                selectedItems?.map?.((item) => {
                    const find = items?.find?.((items) => items?.id == item.id);
                    if (!find) {
                        selectedOne.push(item);
                    }
                })
            }
            setSelectToggleItem(selectedOne)
            callBackSelectItem(selectedOne)
        } else {
            const selectedOne = [...selectedItems];
            items?.map?.((item) => {
                const find = selectedItems?.find?.((items) => items?.id == item.id);
                if (!find) {
                    selectedOne.push(item);
                }
            })
            setSelectToggleItem(selectedOne)
            callBackSelectItem(selectedOne)
        }
    }

    const getCheckedToggleAll = (toggleItemList) => {
        const toggleItemsDisabled = getDisabledList(toggleItemList)
        const matchedIds = (toggleItems, selectedItems) => {
            return toggleItems?.filter?.((item) => {
                const find = selectedItems?.find?.((items) => items?.id == item.id);
                return find
            })
        }
        const selectedItems = matchedIds(getDisabledList(selectToggleItem), toggleItemsDisabled);
        const toggleItems = matchedIds(toggleItemsDisabled, selectedItems);
        return toggleItems?.length == toggleItemList?.length && toggleItemList?.length;
    }
    // Child table header view
    const ChildTableHeader = (item, TableHeaderColumn, TableBodyData) => {
        const isCheck = getCheckedToggleAll(props?.toggleItem?.[item?.id]?.dataItem)//?.length && selectToggleItem?.length > 0;
        if (!TableHeaderColumn) {
            return null
        }
        return (
            <thead>
                <tr className={props?.toggleHeaderClassName}>
                    {(props?.toggleSelect && props?.toggleItem?.[item?.id]?.column?.length > 0) && (
                        <th className="th-column text-center" table-head={""} align="center">
                            {(toggleAll || selectToggleItem?.length > 0) && (
                                <div className="th-data flex align-center">
                                    <input type="checkbox" className="checkBox" checked={isCheck} onChange={(e) => callAllSelect(e, props?.toggleItem?.[item?.id]?.dataItem)} />
                                </div>
                            )}
                        </th>
                    )}
                    {(props?.serial_no && serial_toggle) && (
                        <th align="center" table-head={"Sr. No."} className="th-column text-center serial_no">
                            <div className="th-data">Sr. No.</div>
                        </th>
                    )}
                    {TableHeaderColumn?.map?.((columnName, index) => (
                        <React.Fragment>
                            {callToggleHeaderVisible(columnName, index, item)}
                        </React.Fragment>
                    ))}
                </tr>
            </thead>
        )
    }
    // Toggle select
    const callBackShowToggle = (item, action?: any) => {

        // callResetFilter(false)
        if (props?.callBackShowToggle) {
            if (ShowToggle?.[item?.id]?.id != item?.id && item?.id) {
                props?.callBackShowToggle(item, action);
            } else {
                setSelectToggleItem([]);
                callBackSelectItem([]);
            }
        }
        if (props?.onToggle) {

            if (ShowToggle?.[item?.id]?.id != item?.id && item?.id) {
                props?.onToggle(item, action);
            } else {
                props?.onToggle();
                setSelectToggleItem([]);
                callBackSelectItem([]);
            }
        }
        if (props?.onToggle || props?.callBackShowToggle) {
            const oldData = { ...ShowToggle };
            if (oldData?.[item?.id]?.id && item?.id) {
                delete oldData?.[item?.id];
            } else {
                oldData[item?.id] = item;
            }
            setShowToggle(oldData)
        }
    }
    const callToggleClickAdd = (item) => {
        if (props?.callToggleAdd) {
            props?.callToggleAdd(item);
        }
    }
    // Table Body content
    const toggleAll = selectToggleItem?.every(item => item?.disabled === true)

    const TableBody = () => {
        const offset = (Number(RequestPayload?.page || 1) - 1) * Number(RequestPayload?.limit || 10);
        const Serial = (index: number) => <td align="center" className="serial_value">{offset + index + 1}</td>;
        const SelectInputCheck = (props12: any) => {
            const { index, item } = props12
            const isCheck = selectItem?.find?.((item1) => item?.id == item1?.id);
            const onChange = () => {
                if (isCheck) {
                    const listItem = selectItem?.filter?.((item1) => item?.id !== item1?.id);
                    callBackSelect(listItem);
                } else {
                    const listItem = [...selectItem];
                    listItem?.push(item);
                    callBackSelect(listItem);
                }
            }
            return (
                <td align="center">
                    <div className="flex align-center">
                        <input type="checkbox" className="checkBox" id={item?.id} checked={isCheck ? true : false} onChange={onChange} />
                    </div>
                </td>
            )
        };
        const showToggle = (item, index: number) => {
            return (
                <td className="toggle-icon">
                    <Icon attrIcon={App_url.image.AngleDown} onClick={() => callBackShowToggle(item)} className={`cursor-pointer black sm ${ShowToggle?.[item?.id] && item?.id ? "rotate-90" : ""}`} />
                </td>
            )
        };
        function callInquiryDownload(item) {
            props?.callBackDownload(item)
        }
        const renderAction = (propsAction) => {
            const { item, index } = propsAction;
            const checkPermissionData = (actionStatus: IActionDeleteRequest, item) => {
                if (actionStatus?.status) {
                    const findCheck = actionStatus?.status?.split(",")?.find?.((item1 => item?.status === item1))
                    if (findCheck) {
                        return true
                    }
                } else {
                    return true
                }
            }
            if (
                !(props?.actionPayload?.unarchive && checkPermission(user_data, `${props?.actionPayload?.unarchive?.type}:${props?.actionPayload?.unarchive?.action}`)) &&
                !(props?.edit && checkPermission(user_data, `${props?.type}:update`)) &&
                !(props?.delete && checkPermission(user_data, `${props?.type}:delete`)) &&
                !(props?.status && checkPermission(user_data, `${props?.type}:updateStatus`)) &&
                !propsAction?.children &&
                !props?.view &&
                !props?.info &&
                !props?.showAction &&
                !props?.add &&
                !props?.callBackDownload &&
                !props?.schedule &&
                !props?.sendIcon
            ) {
                return <React.Fragment></React.Fragment>
            }
            return (
                <td className={`${propsAction?.children ? 'action_table_auto' : 'action_table'}`}>
                    <div className="action-content flex justify-center items-center w-full">
                        {(props?.status && checkPermission(user_data, `${props?.type}:updateStatus`)) && (
                            <ToggleBtn
                                isChecked={item?.active}
                                onClick={(e) => callClickStatusChange(e, item)}
                                name=""
                            />
                        )}
                        {props?.info && (
                            <Icon
                                attrIcon={App_url.image.Info}
                                button
                                onClick={() => handleInfo(item)}
                                size="md"
                                buttonClassName="h-primary"
                            />
                        )}

                        {props?.view && (
                            <Icon
                                attrIcon={App_url.image.eye}
                                button
                                onClick={() => callClickView(item)}
                                buttonClassName="h-primary"
                                size="md"
                            />
                        )}
                        {props?.timer && (
                            <Icon
                                attrIcon={App_url.image.Timer}
                                button
                                buttonClassName="h-primary"
                                size="md"
                                onClick={() => openHistoryPage(item)}
                            />
                        )}
                        {props?.file_alt && (
                            <Icon
                                attrIcon={App_url.image.FileAlt}
                                buttonClassName="h-primary"
                                button
                                size="md"
                            />
                        )}
                        {props?.file_download && (
                            <Icon
                                attrIcon={App_url.image.FileDownload}
                                button
                                buttonClassName="h-primary"
                                size="md"
                            />
                        )}
                        {props?.arrow_up_right && (
                            <Icon
                                attrIcon={App_url.image.ArrowUpRight}
                                buttonClassName="h-primary"
                                button
                                size="md"
                            />
                        )}
                        {props?.arrow_right && (
                            <Icon
                                attrIcon={App_url.image.ArrowRight}
                                buttonClassName="h-primary"
                                button
                                size="md"
                            />
                        )}
                        {(props?.edit && checkPermission(user_data, `${props?.type}:update`)) && checkPermissionData(props?.actionPayload?.edit, item) && (
                            <Icon
                                attrIcon={App_url.image.Edit}
                                buttonClassName="h-primary"
                                button
                                onClick={() =>
                                    props?.isNav
                                        ? (props?.route ? navigate(`${props?.route}/${item?.id}`) : navigate(`${loc.pathname}/${item?.id}`))
                                        : dispatch(setFormPopup({ status: "edit", url: item, name: `Edit ${props?.modalName}`, }))
                                }
                                size="md"
                            />
                        )}
                        {(props?.sendIcon) && (
                            <>
                                <PiPaperPlaneTiltLight className="text-[#0B0B0B] hover:text-[#0EADE5] font-[600] cursor-pointer" size={18} onClick={() => openStatementPage(item)} />
                                <p>last send 5 days ago</p>
                            </>
                        )}
                        {propsAction?.children && (
                            propsAction?.children
                        )}
                        {props?.callBackDownload && (
                            <Button
                                onClick={() => callInquiryDownload(item)}
                                disabled={props?.actionPayload?.download?.id_loader == item?.id}
                                isLoading={props?.actionPayload?.download?.id_loader == item?.id}
                                variant="primary"
                                label={
                                    <React.Fragment>
                                        <Icon attrIcon={App_url.image.Download} />
                                    </React.Fragment>
                                }
                            />
                        )}
                        {props?.actionPayload?.download?.view && (
                            <Button
                                className="button btn-outline-primary px-2"
                                onClick={() => callInquiryDownload(item)}
                                disabled={props?.actionPayload?.download?.id_loader == item?.id}
                                isLoading={props?.actionPayload?.download?.id_loader == item?.id}
                                label={
                                    <React.Fragment>
                                        <Icon attrIcon={App_url.image.eye} />
                                    </React.Fragment>
                                }
                            />
                        )}
                        {props?.schedule && (
                            <Icon
                                attrIcon={App_url.image.schedule}
                                button
                                onClick={() => callClickSchedule(item)}
                                size="md"
                                buttonClassName="h-primary"
                            />
                        )}
                        {(props?.delete && checkPermission(user_data, `${props?.type}:delete`)) && checkPermissionData(props?.actionPayload?.delete, item) && (
                            <Icon
                                attrIcon={App_url.image.Delete}
                                button
                                onClick={() => callClickDelete(item)}
                                size="md"
                                buttonClassName="h-danger"
                            />
                        )}
                        {(props?.actionPayload?.archive && item?.status == props?.actionPayload?.archive?.status && checkPermission(user_data, `${props?.actionPayload?.archive?.type}:${props?.actionPayload?.archive?.action}`)) && (

                            <Icon attrIcon={App_url.image.archive} buttonClassName="h-danger" className="archive" button size="sm" onClick={() => callClickArchive(item)} />
                        )}
                        {(props?.actionPayload?.unarchive && item?.status == props?.actionPayload?.unarchive?.status && checkPermission(user_data, `${props?.actionPayload?.unarchive?.type}:${props?.actionPayload?.unarchive?.action}`)) && (
                            <Icon attrIcon={App_url.image.unarchive} buttonClassName="h-primary" className="archive" button size="sm" onClick={() => callClickUnArchive(item)} />
                        )}
                        {props?.add && (
                            <Icon
                                attrIcon={App_url.image.addIcon}
                                button
                                size="md"
                                onClick={() => callToggleClickAdd(item)}
                                buttonClassName="h-danger"
                            />
                        )}
                    </div>
                </td>
            );
        }

        const getClassId = (item, index) => {
            if (ShowToggle?.[item?.id]?.id == item?.id && item?.id) {
                return "column-toggle";
            } else if (props?.dataItem[index - 1]) {
                if (ShowToggle?.[item?.id]?.id == props?.dataItem[index - 1]?.id && ShowToggle?.[item?.id]?.id) {
                    return "first-toggled"
                }
                return "toggle-row"
            }
            return ""
        }
        const selectToggleTd = (item, index) => {
            const isCheck = selectToggleItem?.some((item1) => item?.id === item1?.id && item1?.id);
            const onChange = () => {
                if (isCheck) {
                    const listItem = selectToggleItem?.filter?.((item1) => item?.id !== item1?.id);
                    setSelectToggleItem([...listItem]);
                    callBackSelectItem(listItem);
                } else {
                    const listItem = [...selectToggleItem, item];
                    setSelectToggleItem(listItem);
                    callBackSelectItem(listItem);
                }
            }
            return (
                <td align="center">
                    <div className="flex align-center">
                        <input type="checkbox" className="checkBox" checked={isCheck} onChange={onChange} />
                    </div>
                </td>
            )
        }
        const InnerToggleItemShow = (itemParent, TableHeaderColumn, TableBodyData, title?: string) => {
            const tableInnerToggleBody = () => {
                if (props?.renderChild) {
                    return (
                        props?.renderChild(itemParent)
                    )
                }
                return (
                    <table>
                        {ChildTableHeader(itemParent, TableHeaderColumn, TableBodyData)}
                        <tbody>
                            {sortTableLayout(TableBodyData, toggleRequest)?.map?.((item, index) => (
                                <React.Fragment key={index}>
                                    {props?.renderBodyToggle?.({
                                        ...item,
                                        index,
                                        select: () => selectToggleTd(item, index),
                                        Serial: () => Serial(index),
                                        showToggle: () => showToggle(item, index),
                                        renderAction: (children) => renderAction({ item: item, index: index, children: children }),
                                        columnView: getShowColumnKey(TableHeaderColumn),
                                        selectData: ShowToggle?.[itemParent?.id],
                                        tableTitle: title
                                    })}
                                </React.Fragment>
                            ))}
                            {sortTableLayout(TableBodyData, toggleRequest)?.length == 0 && (
                                <React.Fragment>
                                    <tr>
                                        <td colSpan={1000} align="center">No data found</td>
                                    </tr>
                                </React.Fragment>
                            )}
                        </tbody>
                    </table>
                )
            }
            return (
                <tr className={`data-toggle`}>
                    <td colSpan={1000} className="relative z-0 p-0">
                        <div className={`table-toggle  ${props?.toggleClassName}`}>
                            <div className="table-responsive toggle-table">
                                {title && <h5 className="font-bold">{title}</h5>}
                                {props?.toggleStyle ? (
                                    <React.Fragment>
                                        <Scrollbar style={props?.toggleStyle}>
                                            {tableInnerToggleBody()}
                                        </Scrollbar>
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        {tableInnerToggleBody()}
                                    </React.Fragment>
                                )}
                            </div>
                        </div>
                    </td>
                </tr>
            )
        }
        const callMultipleTableToggle = (item) => {
            if (ShowToggle?.[item?.id] && ShowToggle?.[item?.id]?.id == item?.id && item?.id) {
                if (props?.ToggleMultiple) {
                    return (
                        <React.Fragment>
                            {props?.ToggleMultiple?.map?.(item1 => (
                                InnerToggleItemShow(item, item1?.column, item1?.dataItem, item1?.title)
                            ))}
                        </React.Fragment>
                    )
                }
                return (
                    InnerToggleItemShow(item, props?.toggleItem?.[item?.id]?.column, props?.toggleItem?.[item?.id]?.dataItem)
                )
            }
        }
        return (
            <tbody>
                {(props?.dataItem?.length > 0 && (checkPermission(user_data, `${props?.type}:${props?.action}`) || !props?.type || !props?.initialCall)) ? (
                    <React.Fragment>
                        {sortTableLayout(props?.dataItem, RequestPayload)?.map?.((item: any, index: any) => (
                            <React.Fragment key={index}>
                                {props?.renderBody?.({
                                    ...item,
                                    index,
                                    Select: () => <SelectInputCheck index={index} item={item} />,
                                    Serial: () => Serial(index),
                                    showToggle: () => showToggle(item, index),
                                    renderAction: (children) => renderAction({ item: item, index: index, children: children }),
                                    columnView: getShowColumnKey(props?.isSort ? getValueColumn : showTableColumn, OptionSortMenu),
                                    toggleColumnClass: getClassId(item, index),
                                    columnItem: item,
                                })}
                                {callMultipleTableToggle(item)}
                            </React.Fragment>
                        ))}
                        {props?.bottomChildRender && props?.bottomChildRender()}
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        {props?.hideTable ? <>{props?.hideTable}</> :
                            <tr>
                                <td colSpan={100} align="center">No Data Found</td>
                            </tr>
                        }

                    </React.Fragment>
                )}
            </tbody>
        );
    };
    // table head and body view layout
    const viewTableLayout = () => {
        const renderTableComponent = () => {
            return (
                <table className={`${props?.tableClassName}`} id='targetRef'>
                    {TableHeader()}
                    {TableBody()}
                </table>
            )
        }
        const renderTabComponent = () => {
            if (!props?.renderTab) {
                return null
            }
            else if (Array.isArray(props?.renderTab)) {
                props?.renderTab?.map(i => (
                    <main className={`table-tab-component `}>
                        {i}
                    </main>
                ))
            }
            return (
                <main className={`table-tab-component `}>
                    {props?.renderTab}
                </main>
            )
        }
        if (!props?.style) {
            return (
                <div className={`table-component whitespace-nowrap  `}>
                    {renderTabComponent()}
                    {renderTableComponent()}
                </div>
            )
        }

        return (
            <div className={`table-component`}>
                {renderTabComponent()}
                <Scrollbar style={{ ...props?.style, height: `calc(100vh - ${Number(props?.style?.height)}px)` }}>
                    {renderTableComponent()}
                </Scrollbar>
            </div>
        )
    }

    const renderViewFilter = () => {
        return (
            <TableFormFilter
                {...props}
                showTableColumn={showTableColumn}
                RequestPayload={RequestPayload}
                showFilter={showFilter}
                setRequestPayload={setRequestPayload}
                setShowTableColumn={onChangeColumnMenu}
                setShowFilter={setShowFilter}
                filterInputForm={filterInputForm}
                getValues={watch}
                BodyFilterList={BodyFilterList}
                callStateUpdate={callStateUpdate}
                show_column_key={props?.show_column_key}
                reset={reset}
                register={register}
                setValue={setValue}
            />
        )
    }
    const RenderTableView = () => {
        return (
            <React.Fragment>
                {pageLoader == `${props?.type}:${props?.action}:${ids}` && (
                    <div className="loader-wrapper">
                        <div className="page-loader"></div>
                        <div className="backdrop"></div>
                    </div>
                )}
                {renderViewFilter()}
                {viewTableLayout()}
                {(props?.dataList && !props?.hidePagination) && (
                    <div className="table-pagination">
                        <div className="page_limit">
                            <label className="block mb-0 text-sm font-medium text-gray-900 ">
                                Rows Per Page
                            </label>
                            <select
                                onChange={onChangeLimit}
                                value={RequestPayload?.limit}
                                className=""
                            >
                                {OptionLimitPage?.map?.((item, index) => (
                                    <option value={item?.value}>{item?.label}</option>
                                ))}
                            </select>
                        </div>
                        <PaginationPage
                            onChange={callPagination}
                            pagination={{
                                total_records: parseFloat(props?.dataList?.totalCount),
                                record_limit: Number(RequestPayload?.limit),
                                current_page: Number(RequestPayload?.page),
                            }}
                        />
                    </div>
                )}
                {props?.actionPayload?.delete && (
                    <WarnPopup
                        content={warnContent(
                            `Delete ${props?.actionPayload?.delete?.title}`,
                            props?.actionPayload?.delete?.description
                        )}
                    ></WarnPopup>
                )}
                {props?.actionPayload?.archive && (
                    <WarnPopup
                        content={warnContent(
                            `${props?.actionPayload?.archive?.title}`,
                            props?.actionPayload?.archive?.description
                        )}
                    ></WarnPopup>
                )}
                {props?.actionPayload?.unarchive && (
                    <WarnPopup
                        content={warnContent(
                            `${props?.actionPayload?.unarchive?.title}`,
                            props?.actionPayload?.unarchive?.description
                        )}
                    ></WarnPopup>
                )}
                {props?.actionPayload?.status && (
                    <WarnPopup
                        content={warnContent(
                            `Edit status of ${props?.actionPayload?.status?.title}`,
                            props?.actionPayload?.status?.description
                        )}
                    ></WarnPopup>
                )}
                {props?.errors && (
                    <div className="text-red-500 text-sm flex items-center ">
                        <img className="h-[0.5rem]" src={App_url.image.info} alt="App_url.image.info" />
                        <span className="text-xs mx-1 text-red-600">
                            {props?.errors}
                        </span>
                    </div>
                )}
            </React.Fragment>
        )
    }
    return (
        <div className={`table-content ${props?.renderTab ? "table_tabs" : ""} text-sm w-full ${props?.className ?? ""}`}>
            {RenderTableView()}
        </div>
    );
});

export default TableComponent;