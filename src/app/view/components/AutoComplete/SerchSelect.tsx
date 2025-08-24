/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useWebSocket } from "../../../api/websocket/WebSocketContext";
import InputField from "../InputField";
import Scrollbar from "../Scrollbar";
import { usePosterReducers } from "../../../redux/getdata/usePostReducer";

interface ISearchSelectTypes {
  option: {
    search_type: string | string[];
    search_title: string;
    title?: string;
    register: any;
    setValue: any;
    name:string;
    onSelect:Function;
    handleKeyDown?:Function;
    sort_by?:string
    group_by?:string
    className?:string
    inputClassName?:string
    type?:string
    action?:string
    isCustom?:boolean
    onEnterClick?:Function
    onChange?:Function

  };
}
const SearchSelect: React.FC<ISearchSelectTypes> = (props) => {
  const { send } = useWebSocket();
  const [ShowMenu, setShowMenu] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { searchList } = usePosterReducers();
  const itemRefs = useRef([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = (searchTerm: string) => {

    const payload = {
      type: props?.option?.type||"searchService",
      action: props?.option?.action||"list",
      payload: {
        search_type: props?.option.search_type,
        query: searchTerm,
        limit: "5000",
        page: "1",
        active: false,
        // sort_by:props?.option?.sort_by|| "reference_number",
        sort_order: "asc",
        // groupBy: props?.option?.group_by||"reference_number",
      },
      demo:{isCustom:props?.option?.isCustom}
    };
    console.log(props?.option.search_type);

    if (props?.option.search_type) {
      send(payload);
    }
  };
function handleEnterPress(e: any): void {
  if(props?.option?.onEnterClick){
    props?.option?.onEnterClick(e)
  }
  // if (e.key === "Enter") {
  //   e?.preventDefault();
  //   e?.stopPropagation();
  // }
}

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSelect = (item) => {
    setShowMenu(false);
    props?.option?.setValue('search',item?.reference_number||item?.name);
    props?.option?.onSelect(item);
  };
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!searchList?.items?.length) return;

      switch (event.key) {
        case 'ArrowDown':
          setSelectedIndex((prevIndex) =>
            prevIndex < searchList.items.length - 1 ? prevIndex + 1 : 0
          );
          break;
        case 'ArrowUp':
          setSelectedIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : searchList.items.length - 1
          );
          break;
        case 'Enter':
          if (selectedIndex >= 0) {
            handleSelect(searchList.items[selectedIndex]);
          }
          break;
        default:
          break;
      }
    };

    // Attach event listener to the document
    document.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [searchList, selectedIndex, handleSelect]);

  const handleChange = useCallback(
    (event) => {
      setShowMenu(true);
      console.log('event',event);
      debouncedSearch(event.value || "");
      if(props?.option?.onChange){
        props?.option?.onChange(event)
      }

    },
    [debouncedSearch]
  );
  useEffect(() => {
    if (selectedIndex >= 0 && itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [selectedIndex]);


  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside the dropdown container
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
  return (
    <div className={`${props?.option?.className||'absolute z-10'}`}>
      <InputField
        name={""}
        register={props?.option?.register("search")}
        placeholder={
            props?.option?.search_title ||
          `Search${
            props?.option?.title?.toLocaleLowerCase().replace("add", "") ?? ""
          } & press enter`
        }
        useFor="search"
        inputClassName={props?.option?.inputClassName||"h-10 rounded-3xl lg:w-96 w-full bg-tertiary"}
        className="global-search"
        id="global-search"
        autocomplete="off"
        onChange={handleChange}
        onEnterClick={handleEnterPress}
      />
      {searchList.items.length > 0 && ShowMenu && (
        <div ref={dropdownRef} className="absolute  bg-white shadow-xl rounded-md border border-gray-200 mt-2 text-sm lg:w-96 w-full z-50">

          <Scrollbar
              style={{
                // height: `30vh`,
                height: `${Math.min(searchList.items.length * 48, 240)}px`,
              }}
          >
            <ul className=" " tabIndex={0}>
            {searchList?.items?.map((item, index) => (
                      <li key={index} className={`px-4 py-3 cursor-pointer ${
                        selectedIndex === index ? 'bg-teal-50' : 'hover:bg-teal-50'
                      }`}
                       onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(index)}  ref={(el) => (itemRefs.current[index] = el)}>

                        {item[`${props?.option?.name}`]||item?.name}
                      </li>
                    ))}
            </ul>
          </Scrollbar>
        </div>
      )}
    </div>
  );
};

export default SearchSelect;
