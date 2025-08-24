/* eslint-disable */
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "../button/Button";
import { App_url, SortingFiled } from "../../../utils/constants/static";
import Icon from "../Icon";
import { useDispatch } from "react-redux";
import {
  setFormPopup,
  setPageLoader,
  WarnFormSetFunctions,
} from "../../../redux/actions/action";
import { useWebSocket } from "../../../api/websocket/WebSocketContext";
import ButtonDropDown from "../button/ButtonDropDown";
import PaginationPage from "../Pagination";
import Scrollbar from "../Scrollbar";
import DropdownSelect from "../DropSelect";
import { usePosterReducers } from "../../../redux/getdata/usePostReducer";
import ToggleBtn from "../ToggleBtn";
import { checkPermission, formatDate2, getUTCDate, normalDate, sortTableLayout, warnContent } from "../../../utils/common";
import WarnPopup from "./popup/WarnPopup";
import { useUiReducer } from "../../../redux/getdata/useUiReducer";
import Calender from "../Calender";
import NewButton from "../button/NewButton";
import DropdownSelectNormal from "../DropSelectNormal";

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
  placeholder?: string;
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
  label?: string;
  value?: string;
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
  formInput?: boolean;
  formInputClassName?: string,
  tableTitleClassName?: string,
  status?: boolean;
  view?: boolean;
  select?: boolean;
  showToggle?: boolean;
  children?: React.ReactNode;
  handleOpen?: Function | string;
  customHandleOpen?: Function | string;
  openHistoryPage?: Function;
  className?: string;
  title?: string;
  customTitle?: string;
  action_name?: string;
  uploadBtn?: { uploadCallback: Function, title: string }
  callBackListTab?: (value: string) => void
  isAdd?: boolean;
  isExport?: boolean;
  isImport?: boolean;
  callBackImport?: Function;
  callBackExport?: Function;
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
  customFilter?: [IFilterList] |[IFilterList, IFilterList];
  columnOption?: IFilterList[];
  initialRequest?: IRequestInitial[];
  dataList?: any;
  serial_no?: boolean;
  serial_toggle?: boolean;
  edit?: boolean;
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
  callBackEdit?: Function;
  showAction?: boolean;
  modalName?: string;
  type?: string;
  request?: ITableFormTypes;
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
  tableClassName?: "border-table";
  search_title?: string;
  toggleShow?: any;
  callToggleAdd?: Function;
  callBackSelect?: Function;
  callBackSelectItem?: Function;
  onChangeTab?: Function;
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
  hideTable?: boolean | any;
  showNewFilter?: boolean;
  showNewSearch?: boolean;
  showNewToggleTab?: boolean | IToggleTab[];
}
type ITableFormTypes = {
  is_stock?: boolean
  not_drawing_revision?: string
  package_id?: string
  is_inactive?: boolean
  drawing_revision?: string
  action_type?: string;
  customer_name?: string
  supplier_name?: string
  invoice_for?: string
  supplier_id?: string
  question_type?: string
  customer_id?: string
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

const TableLayout: React.FC<ITableLayoutProps> = forwardRef(function (props, ref) {
  const { action_name = "Action", isUserType = true, actionPayload = null, callBackState, SearchInput = true, serial_toggle = true, initialCall = true } = props;
  const { register, handleSubmit, control, reset, setValue, watch } = useForm<ITableFormTypes | any>();
  const dispatch = useDispatch();
  const { send, isConnect } = useWebSocket();
  const { user_data, socketResponse, } = usePosterReducers();
  const { pageLoader } = useUiReducer();
  const param = useParams()

  const OptionSortMenu = useMemo(() => {
    const columns = props?.columnOption?.length > 0 ? props?.columnOption : props?.columnKey;

    const formatColumn = (item: any): any => {
      if (item.children && item.children.length > 0) {
        return {
          ...item,
          label: item.name,
          children: item.children.map(formatColumn),
        };
      }

      return {
        ...item,
        label: item.name,
        value: item.key,
      };
    };
    return columns?.map(formatColumn);
  }, [props?.columnKey?.length, props?.columnKey]);


  const OptionSortShow = useMemo(() => {
    const columns = props?.columnOption?.length > 0 ? props?.columnOption : props?.columnKey;

    const formatColumn = (item: any): any => {
      if (item.children && item.children.length > 0) {
        return {
          ...item,
          label: item.name,
          children: item.children.map(formatColumn),
        };
      }

      return {
        ...item,
        label: item.name,
        value: item.key,
      };
    };
    return columns?.map(formatColumn);
  }, [props?.columnKey, props?.columnKey?.length]);

  const loc = useLocation();
  const navigate = useNavigate();
  const [RequestPayload, setRequestPayload] = useState(props?.request);
  const [SortColumn, setSortColumn] = useState(null);
  const { selectItem = [] } = props
  const [selectToggleItem, setSelectToggleItem] = useState([]);
  const [showTableColumn, setShowTableColumn] = useState(OptionSortShow);
  const [showFilter, setShowFilter] = useState(false);
  const [toggleRequest, setToggleRequest] = useState(props?.toggle_request);
  const [ColumnKey, setColumnKey] = useState(props?.columnKey);
  const [ShowToggle, setShowToggle] = useState(null);
  const [FilterHeight, setFilterHeight] = useState(0);
  const [statusRequest, setStatusRequest] = useState(true)
  const [Loading, setLoading] = useState<any>(false);
  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef(null);
  console.log("OptionSortMenu::",OptionSortMenu,showTableColumn)

  useImperativeHandle(ref, function () {
    return {
      requestState(state) {
        setRequestPayload(state)
      },
      stateSelectToggleItem(state) {
        setSelectToggleItem(state)
      },
    }
  }, []) // dependencies

  useEffect(() => {
    if (props?.stateRequest?.status) {
      setRequestPayload(props?.stateRequest)
    }
  }, [props?.stateRequest?.status]);

  useMemo(() => {
    setShowTableColumn(OptionSortShow)
  }, [props?.columnKey]);

  useEffect(() => {
    if (`${socketResponse?.type}:${socketResponse?.action}` === pageLoader) {
      dispatch(setPageLoader());
    }
  }, [socketResponse])

  useEffect(() => {
    if (props?.initialRequest) {
      props?.initialRequest?.map((item, index) => {
        if (isConnect) {
          send(item);
        }
      });
    }
  }, [isConnect]);

  useEffect(() => {
    const element = document.getElementById("filter-body-list");
    if (element) {
      const height = element.clientHeight;
      setFilterHeight(height + 11)

    } else {
      setFilterHeight(0)
    }
  }, [showFilter])


  const callStateUpdate = (payload: ITableFormTypes, state?: boolean, itemSelected?: any) => {
    if (!state) {
      const requestPayloadData = {
        ...payload
      };
      const checkFind = SortingFiled?.find((item, index) => item == payload.sort_by);
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
      const checkFind = SortingFiled?.find((item, index) => item == payload.sort_by);
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

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const inputElement = document.getElementById("global-search") as HTMLInputElement;
      if (inputElement) {
        const value = inputElement.value;
        callStateUpdate({
          ...RequestPayload,
          query: value,
          page: "1",
        });
      }
      event.target.form.requestSubmit();
    }
  };

  const callInitialList = (firstRequest?: any) => {
    if (user_data?.user?.role === "admin") {
      if (isConnect && props?.request) {
        const requestPayload = {
          ...props?.request,
          ...RequestPayload
        }
        if (RequestPayload?.from_date) {
          requestPayload.from_date = formatDate2(RequestPayload?.from_date)
        }
        if (RequestPayload?.submission_date) {
          requestPayload.submission_date = formatDate2(RequestPayload?.submission_date)
        }
        if (RequestPayload?.list_date) {
          requestPayload.list_date = formatDate2(RequestPayload?.list_date)
        }
        if (RequestPayload?.to_date) {
          requestPayload.to_date = formatDate2(RequestPayload?.to_date)
        }

        if (RequestPayload?.created_at) {
          requestPayload.created_at = formatDate2(RequestPayload?.created_at)
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
          payload.demo = props?.demo
        }
        if (!props?.isFilterCall)
          send(payload);
        if (firstRequest) {
          dispatch(setPageLoader(`${props?.type}:${props?.action}`))
        }
      }
    }
  };

  useEffect(() => {
    if (isConnect && initialCall) {
      callInitialList(true);
      setTimeout(() => setStatusRequest(false), 1000)
    }
  }, [isConnect]);

  useEffect(() => {
    if (!statusRequest && isConnect) {
      callInitialList();
    }
  }, [isConnect, RequestPayload]);

  useEffect(() => {
    if (props?.actionRequest?.length) {
      const isFind = props?.actionRequest?.find((item) => item === `${socketResponse?.type}:${socketResponse?.action}`);
      if (isFind) {
        callInitialList();
      }
    }
  }, [props?.actionRequest, socketResponse])

  function onsubmit(data: any) {
    const updatedPayload = { ...props?.payload, request: {} };
  }

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

  const callShowFilter = () => {
    setShowFilter(!showFilter);
    if (showFilter) {
      setRequestPayload(props?.request);
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

  const onChange = (e, name) => {
    setRequestPayload((data) => ({
      ...data,
      [name]: e ? e : null,
    }));
    if (callBackState) {
      callBackState({
        [name]: e ? e : null,
      })
    }
  };

  const onSelect = (e, item) => {
    setRequestPayload((data) => ({
      ...data,
      [e.name]: item?.is_name ? e?.label : e.value,
    }));
    if (callBackState) {
      callBackState({
        ...e,
        [e.name]: e.value,
      })
    }
  };

  const callResetFilter = (isReset) => {
    reset({});
    if (props?.package_id) {
      if (props?.callBackReset && isReset)
        props?.callBackReset({ ...props?.request, package_id: props?.package_id, project_id: param?.id })
      else
        setRequestPayload({ ...props?.request, package_id: props?.package_id, project_id: param?.id });
    }
    else {
      if (props?.callBackReset && isReset)
        props?.callBackReset(props?.request)
      else
        setRequestPayload(props?.request);
    }

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
    if (props?.actionPayload.delete.key_id) {
      const dataKey = warnForm[props?.actionPayload.delete.key_id]
      payload.payload[props?.actionPayload.delete.key_id] = dataKey;
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
      if (props?.actionPayload.info.key_id) {
        const dataKey = warnForm[props?.actionPayload.info.key_id]
        payload.payload[props?.actionPayload.info.key_id] = dataKey;
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

  const callHeaderVisibleColumn = (columnName: any, index: number, showTableColumn, classNameVisible) => {
    const item = showTableColumn?.find((name) => name?.key == columnName?.key || name?.name == columnName?.name);
    if (!item) {
      return <React.Fragment></React.Fragment>;
    }
    return (
      <React.Fragment key={index}>
        <th
          key={index}
          className={`th-column ${classNameVisible}`}
          onClick={() => !columnName?.showSort && callSelectSort(item)}
          table-head={item?.name}
          align={columnName?.align || ""}
        >
          <div className={`th-data column_filter align-${columnName?.align}`}>
            {item?.name}
          </div>
        </th>
      </React.Fragment>
    );
  };

  const callBackSelect = (item) => {
    if (props?.callBackSelect) {
      props?.callBackSelect(item);
    }
  }

  const callToggleClickAdd = (item) => {
    if (props?.callToggleAdd) {
      props?.callToggleAdd(item);
    }
  }
  //for table all header name and action th names

  const callLoadDropdown = (item: any, index: any,placeholder?:any) => {
      return (
        <DropdownSelectNormal
          onSelect={(e) => onSelect(e, item)}
          onChange={() => { }}
          label={item?.label}
          defaultValue={item?.defaultValue}
          placeholder={item?.placeholder}
          options={item?.options}
          value={RequestPayload?.[item?.name] || null}
          control={control}
          name={item?.name}
          disabled={item?.disabled}
          className="w-[150px]"
        />
      );
  };
  const callLoadInputForm = (item: any, index: any) => {
    if (item?.type == "date_range") {
      return (
        <div className="date_range-wrapper">
          <label className="date-label">{item?.label}</label>
          <div className="date_range">
            <Calender
              name={item?.start_name}
              showIcon={false}
              inputClassName="input_range_date"
              placeholder={item?.start_placeholder}
              value={RequestPayload?.[item?.start_name] || null}
              onChange={(e) => onChange(e, item?.start_name)}
              maxDate={RequestPayload?.[item?.end_name] ? RequestPayload?.[item?.end_name] : null}
              endDate={RequestPayload?.[item?.end_name] ? RequestPayload?.[item?.end_name] : null}
              startDate={RequestPayload?.[item?.start_name] ? RequestPayload?.[item?.start_name] : null}
              isClearable={RequestPayload?.[item?.start_name]}
              selectsStart={true}
              isConvert
            />
            <Calender
              name={item?.end_name}
              showIcon={false}
              inputClassName="input_range_date"
              placeholder={item?.end_placeholder}
              value={RequestPayload?.[item?.end_name] || null}
              onChange={(e) => onChange(e, item?.end_name)}
              endDate={RequestPayload?.[item?.end_name] ? RequestPayload?.[item?.end_name] : null}
              startDate={RequestPayload?.[item?.start_name] ? RequestPayload?.[item?.start_name] : null}
              minDate={RequestPayload?.[item?.start_name] ? RequestPayload?.[item?.start_name] : null}
              isClearable={RequestPayload?.[item?.end_name]}
              selectsEnd={true}
              isConvert
            />
            <label className="icon_calender" htmlFor={`input_time-${!RequestPayload?.[item?.start_name] ? item?.start_name : item?.end_name}`}>
              <Icon attrIcon={App_url.image.calendar} className="" />
            </label>
          </div>
        </div>
      );
    }
    if (item?.type === "date") {
      return (
        <Calender
          name={item?.start_name}
          showIcon={true}
          placeholder={item?.start_placeholder}
          value={RequestPayload?.[item?.name] || null}
          onChange={(e) => onChange(e, item?.name)}
          label={item?.label}
          isClearable={RequestPayload?.[item?.name]}
          selectsStart={true}
          isConvert
        />
      )
    }
    if (item?.type == "select") {
      return (
        <DropdownSelect
          onSelect={(e) => onSelect(e, item)}
          onChange={() => { }}
          label={item?.label}
          defaultValue={item?.defaultValue}
          placeholder={item?.placeholder}
          options={item?.options}
          value={RequestPayload?.[item?.name] || null}
          control={control}
          name={item?.name}
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

  const BodyFilterList = () => {
    if (props?.showNewFilter) {
      return <React.Fragment>
        <div className={`table-filter ${props?.filterClassName} !mb-0 !mt-4 !border-none !rounded-t-lg !rounded-b-none`} id={'filter-body-list'} >
          <div className={`flex gap-2 ${props?.filterList?.length >= 3 ? "grid-cols-3" : `grid-cols-3`}`}>
            {!props.showNewSearch && <div>
              <InputField
                name={""}
                register={register("search")}
                placeholder={props?.search_title || `Search ${props?.title?.toLocaleLowerCase().replace('add', '') ?? ''} & press enter`}
                useFor="search"
                inputClassName="h-10 rounded-md lg:w-96 overflow-hidden w-full "
                className="global-search"
                controlClassName={"!bg-none"}
                id="global-search"
                onEnterClick={handleKeyDown}
                onChange={handleChange}
                autocomplete="off"
              />
            </div>}
            <div
              className={`flex !gap-2 ${props?.filterList?.length >= 3 ? "grid-cols-3" : "grid-cols-3"
                } `}>
              {props?.filterList?.map((item, index) => (
                <React.Fragment key={index}>
                  <div className={`form-controller ${index > 2 && "mt-2"}`}>
                    {callLoadInputForm(item, index)}
                  </div>
                </React.Fragment>
              ))}
            </div>
            {props?.showNewToggleTab &&
              <div className="">
                <TabToggleList list={props?.showNewToggleTab} />
              </div>
            }
          </div>
        </div>
      </React.Fragment>;
    }
    if (!showFilter) {
      return <React.Fragment></React.Fragment>
    }
    return (
      <React.Fragment>
        <div className={`table-filter ${props?.filterClassName}`} id={'filter-body-list'} >
          <div
            className={`flex row-filter grid-cols-4`}>
            {props?.filterList?.map((item, index) => (
              <React.Fragment key={index}>
                <div className={`form-controller mb-2 ${index > 3 && "mt-2"}`}>
                  {callLoadInputForm(item, index)}
                </div>
              </React.Fragment>
            ))}
            <div className="reset-form">
              <button
                type="reset"
                onClick={callResetFilter}
                className="reset-content"
              >
                <Icon attrIcon={App_url.image.Reset} />
                Reset
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  const TabToggleList = ({ list }) => {
    return (
      <div className="group-switch flex space-x-1 rounded-lg bg-secondary_1 p-0.5">
        {list?.map((item, index) => (
          <React.Fragment key={index}>
            <button
              onClick={(e) => {
                e.preventDefault();
                callUserType(item?.value)
                if (props.callBackListTab)
                  props.callBackListTab(item?.value);
              }}
              className={`flex items-center whitespace-nowrap rounded-md py-[0.4375rem] pl-2 pr-2 text-sm font-semibold lg:pr-3 ${RequestPayload?.[props?.toggleTabKey ? props?.toggleTabKey : `user_type`] == item?.value &&
                "bg-white shadow hover:bg-white"
                } `}
            >
              {item?.label}
            </button>
          </React.Fragment>
        ))}
      </div>
    )
  }

  const debouncedSearch = (searchTerm: string) => {
    const payload = {
      type: "searchService",
      action: "createCombinations",
      payload: {
        search_type: props.search_type,
        query: searchTerm?.toLowerCase(),
        limit: "5000",
        page: "1",
        active: false,
        sort_by: "name",
        sort_order: "asc",
        groupBy: "name",
      },
    };
    if (props?.search_type && searchTerm) {
      send(payload);
    }
    else if (searchTerm === "") {
      callStateUpdate({
        query: "",
        page: "1",
      });
      setShowMenu(false)
    }
  }

  const handleChange = useCallback((event) => {
    if (props?.searchMenu) {
      setShowMenu(true)
      debouncedSearch(event.value);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && showMenu) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const renderHeaderAction = () => {
    if (
      !props?.edit &&
      !props?.delete &&
      !props?.status &&
      !props?.view &&
      !props?.info &&
      !props?.showAction &&
      !props?.add &&
      !props?.schedule &&
      !props?.actionPayload?.unarchive
    ) {
      return <React.Fragment></React.Fragment>;
    }
    return <th className="action_column head-1 text-center" table-head={action_name} ><div className="th-data">{action_name}</div></th>;
  };

  const renderTableHeader = () => {
    const firstRow: any[] = [];
    const secondRow: any[] = [];
    const thirdRow: any[] = [];

    if (props?.serial_no) {
      firstRow.push(
        <th key="serial_no" rowSpan={3} className="subhead-1 text-center serial_no">
          <div className="th-data">Sr. No.</div>
        </th>
      );
    }

    const traverse = (column: any, depth = 1, parentIndex = '') => {
      const colKey = `${parentIndex}-${column.name}`;

      if (column.children && column.children.length > 0) {
        const colSpan = getLeafCount(column);
        const rowSpan = 1;

        if (depth === 1) {
          firstRow.push(
            <th key={colKey} colSpan={colSpan} rowSpan={rowSpan} className={`subhead-1 text-center`}>
              <div className="th-data">{column.name}</div>
            </th>
          );
          column.children.forEach((child, idx) => traverse(child, 2, colKey + idx));
        } else if (depth === 2) {
          secondRow.push(
            <th key={colKey} colSpan={colSpan} rowSpan={rowSpan} className="subhead-1 text-center">
              <div className="th-data">{column.name}</div>
            </th>
          );
          column.children.forEach((child, idx) => traverse(child, 3, colKey + idx));
        }
      } else {
        const rowSpan = 3 - depth + 1;
        const row = depth === 1 ? firstRow : depth === 2 ? secondRow : thirdRow;
        row.push(
          <th key={colKey} rowSpan={rowSpan} className="subhead-1 text-center">
            <div className="th-data">{column.name}</div>
          </th>
        );
      }
    };

    const getLeafCount = (col: any): number => {
      if (!col.children || col.children.length === 0) return 1;
      return col.children.reduce((sum: number, child: any) => sum + getLeafCount(child), 0);
    };

    OptionSortMenu.forEach((col, idx) => traverse(col, 1, `col-${idx}`));

    if (renderHeaderAction) {
      firstRow.push(
        <th key="action-header" rowSpan={3} className="head-1 text-center">
          <div className="th-data">Actions</div>
        </th>
      );
    }

    return (
      <thead className="thead_parent">
        <tr>{firstRow}</tr>
        {secondRow.length > 0 && <tr>{secondRow}</tr>}
        {thirdRow.length > 0 && <tr>{thirdRow}</tr>}
      </thead>
    );
  };

  const TableBody = () => {
    const offset = (Number(RequestPayload?.page || 1) - 1) * Number(RequestPayload?.limit || 10);
    const Serial = (index: number) => <td align="center" className="serial_value">{offset + index + 1}</td>;
    const SelectInputCheck = (props12: any) => {
      const { index, item } = props12
      const isCheck = selectItem?.find((item1) => item?.id == item1?.id);
      const onChange = () => {
        if (isCheck) {
          const listItem = selectItem?.filter((item1) => item?.id !== item1?.id);
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
            <input type="checkbox" className="checkBox" id={item?.id} checked={isCheck} onChange={onChange} />
          </div>
        </td>
      )
    };
    const renderAction = (propsAction) => {
      const { item, index } = propsAction;
      if (
        !props?.actionPayload?.unarchive &&
        !props?.edit &&
        !props?.delete &&
        !props?.status &&
        !propsAction?.children &&
        !props?.view &&
        !props?.info &&
        !props?.showAction &&
        !props?.add &&
        !props?.callBackDownload &&
        !props?.schedule
      ) {
        return <React.Fragment></React.Fragment>
      }
      return (
        <td className={`${propsAction?.children ? 'action_table_auto' : 'action_table'}`}>
          <div className="action-content flex justify-center items-center w-full">
            {props?.status && (
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
            {props?.edit && (
              <Icon
                attrIcon={App_url.image.Edit}
                buttonClassName="h-primary"
                button
                onClick={() =>
                  props?.callBackEdit ? props?.callBackEdit(item) :
                    (props?.isNav
                      ? (props?.route ? navigate(`${props?.route}/${item?.id || item?._id}`) : navigate(`${loc.pathname}/${item?.id || item?._id}`))
                      : dispatch(setFormPopup({ status: "edit", url: item, name: `Edit ${props?.modalName}`, })))
                }
                size="md"
              />
            )}

            {propsAction?.children && (
              propsAction?.children
            )}

            {props?.delete && (
              <Icon
                attrIcon={App_url.image.Delete}
                button
                onClick={() => callClickDelete(item)}
                size="md"
                buttonClassName="h-danger"
              />
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

    const getShowColumnKey = (showTableColumn: any[]): Record<string, boolean> | null => {
      const extractKeys = (items: any[]): string[] => {
        const keys: string[] = [];

        items.forEach((item) => {
          if (item.key) {
            keys.push(item.key);
          }
          if (item.children && item.children.length > 0) {
            keys.push(...extractKeys(item.children));
          }
        });

        return keys;
      };

      if (showTableColumn && showTableColumn.length > 0) {
        const keysArray = extractKeys(showTableColumn);
        const result = keysArray.reduce((obj, key) => {
          obj[key] = true;
          return obj;
        }, {} as Record<string, boolean>);

        return result;
      }

      return null;
    };


    const getClassId = (item, index) => {
      if (ShowToggle?.id == item?.id && item?.id) {
        return "column-toggle";
      } else if (props?.dataItem[index - 1]) {
        if (ShowToggle?.id == props?.dataItem[index - 1]?.id) {
          return "first-toggled"
        }
        return "toggle-row"
      }
      return ""
    }
    return (
      <tbody>
        {props?.dataItem?.length > 0 ? (
          <React.Fragment>
            {sortTableLayout(props?.dataItem, RequestPayload)?.map((item: any, index: any) => (
              <React.Fragment key={index}>
                {props?.renderBody?.({
                  ...item,
                  index,
                  Select: () => <SelectInputCheck index={index} item={item} />,
                  Serial: () => Serial(index),
                  renderAction: (children) => renderAction({ item: item, index: index, children: children }),
                  columnView: getShowColumnKey(showTableColumn),
                  toggleColumnClass: getClassId(item, index),
                  columnItem: item,
                })}
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
  const callBackImport = () => {
    if (props?.callBackImport) {
      props?.callBackImport()
    }
  }
  const callBackExport = () => {
    if (props?.callBackExport) {
      props?.callBackExport()
    }
  }

  const filterForm = () => {
    return (
      <form
        action=""
        onSubmit={(e) => {
          handleSubmit(onsubmit)(e);
        }}
        className={`${props?.formClassName}`}
      >
        <div className={`lg:flex ${props?.formInput ? '' : 'my-4'} items-center justify-between mx-0 ${props?.formInputClassName}`}>
          {props?.table_title && <div className={`min-w-fit ${props?.tableTitleClassName}`}>{props?.table_title}</div>}
          {!props?.formInput && SearchInput &&
            <div className="flex-row" ref={dropdownRef}>
              <div className="flex items-center justify-start gap-2">
                <InputField
                  name={""}
                  register={register("search")}
                  placeholder={props?.search_title || `Search by${props?.title?.toLocaleLowerCase().replace('add', '') ?? ''}`}
                  useFor="search"
                  inputClassName="h-10 rounded-md lg:w-[240px] overflow-hidden w-full "
                  className="global-search"
                  controlClassName={"bg-tertiary"}
                  id="global-search"
                  onEnterClick={handleKeyDown}
                  onChange={handleChange}
                  autocomplete="off"
                />
                {(props?.toggleTab?.length > 0) && (
                  <TabToggleList list={props?.toggleTab} />
                )}
              </div>
            </div>
          }

          <div className="w-full">
            <div className="flex justify-between lg:justify-end gap-2">
              {props?.customBtn && (
                <Button
                  onClick={customHandleOpen}
                  icon={App_url.image.add}
                  label={`${props?.customTitle}`}
                  className="bg-primary text-white rounded p-1"
                />
              )}

              {props?.customFilter?.length > 0 && props?.customFilter?.map((item, index) => (
                <React.Fragment key={index}>
                  <div className={``}>
                    {callLoadDropdown(item, index,)}
                  </div>
                </React.Fragment>
              ))}

              {props?.isExport && (
                <NewButton onClick={callBackExport} variant="navy" className="rounded-small" disabled={props.disabled} >
                  Export
                </NewButton>
              )}
              {props?.isImport && (
                <NewButton onClick={callBackImport} variant="navy" className="rounded-small" disabled={props.disabled} >
                  <Icon attrIcon={App_url.image.FileUpload} size="sm" /> Import CSV
                </NewButton>
              )}
              {props?.isAdd && (
                <NewButton onClick={handleOpen} variant="primary" className="rounded-small" disabled={props.disabled} >
                  <Icon attrIcon={App_url.image.add} size="sm" /> {props?.title}
                </NewButton>
              )}
              {props?.viewAll && (
                <Button
                  onClick={handleOpen}
                  label={`${props?.title}`}
                  className="border border-[#0EADE5] text-[#0EADE5] hover:bg-none rounded p-1 font-[500]"
                />
              )}
              {props?.isFilter && (
                <React.Fragment>
                  <Icon
                    attrIcon={App_url.image.filter}
                    buttonClassName={`br-1 btn-action bg-outline`}
                    onClick={callShowFilter}
                    button
                  />
                </React.Fragment>
              )}
              {props?.isSort && (
                <React.Fragment>
                  <ButtonDropDown
                    isCheck
                    onChange={onSelectColumn}
                    options={OptionSortMenu}
                    value={showTableColumn}
                    menuTitle={"Column Filter"}
                  >
                    <Icon attrIcon={App_url.image.sort} button buttonClassName={`br-1 btn-action bg-outline`} />
                  </ButtonDropDown>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
        {BodyFilterList()}
      </form>
    )
  }

  const viewTableLayout = () => {
    const TableComponent = () => {
      return (
        <table className={`${props?.tableClassName}`}>
          {renderTableHeader()}
          {TableBody()}
        </table>
      )
    }
    if (!props?.style) {
      return (
        <div className="table-component whitespace-nowrap">
          {TableComponent()}
        </div>
      )
    }

    return (
      <div className="table-component">
        <Scrollbar style={{ ...props?.style, height: `calc(100vh - ${Number(props?.style?.height) + Number(FilterHeight)}px)` }}>
          {TableComponent()}
        </Scrollbar>
      </div>
    )
  }

  return (
    <div className={`"w-full text-sm h-full ${props?.formInput ? '' : 'px-4'} ${props?.className} `}>
      {pageLoader == `${props?.type}:${props?.action}` && (
        <div className="loader-wrapper">
          <div className="page-loader"></div>
          <div className="backdrop"></div>
        </div>
      )}
      {filterForm()}
      {viewTableLayout()}

      {/* pagination, error message and warnpopup imports */}
      {(!props?.formInput && props?.dataList) && (
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
              {OptionLimitPage?.map((item, index) => (
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
        <WarnPopup content={warnContent(`Edit status of ${props?.actionPayload?.status?.title}`, props?.actionPayload?.status?.description)}></WarnPopup>
      )}
      {props?.errors && (
        <div className="text-red-500 text-sm flex items-center ">
          <img className="h-[0.5rem]" src={App_url.image.info} alt="App_url.image.info" />
          <span className="text-xs mx-1 text-red-600">
            {props?.errors}
          </span>
        </div>
      )}
    </div>
  );
});

export default TableLayout;