/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import InputField from '../InputField';
import { useWebSocket } from '../../../api/websocket/WebSocketContext';
import { usePosterReducers } from '../../../redux/getdata/usePostReducer';
import Scrollbar from '../Scrollbar';

type ISearchFilter = {
    formInput?: boolean;
    searchMenu?: boolean;
    SearchInput?: boolean;
    search_type?: string[];
    search_title?: string;
    title?: string;
    callStateUpdate: Function;
    reset?: Function;
    setValue: Function;
    register: Function;
    className?: String;
    callBackSearch?:Function

}
export default function SearchFilter(props: ISearchFilter) {
    const dropdownRef = useRef(null);
    const {register} = props;
    const { searchList } = usePosterReducers();
    const {send} = useWebSocket();
    const [showMenu, setShowMenu] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const handleKeyDown = (event: any) => {
        if (event.key === "Enter") {
            event.preventDefault();
            const inputElement = document.getElementById("global-search") as HTMLInputElement;
            if (inputElement) {
                const value = inputElement.value;
                if(props?.callBackSearch){
                    props?.callBackSearch(value)
                }
                props?.callStateUpdate?.({
                    query: value,
                    page: "1",
                });
                props?.setValue?.("query", value );
            }
            // event.target.form.requestSubmit();
        }
    };
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
            props?.callStateUpdate?.({
                query: "",
                page: "1",
            });
            props?.setValue?.("query", "" );
            setShowMenu(false)
        }
    }

    const handleChange = useCallback((event) => {
        if (props?.searchMenu) {
            setShowMenu(true)
            debouncedSearch(event.value);
        }

    }, [debouncedSearch]);

    const handleSelect = useCallback((item) => {
        props?.setValue?.("search", item?.name );
        props?.setValue?.("query", item?.name );
        props?.callStateUpdate?.({
            query: item?.name,
            page: "1",
        });
        setShowMenu(!showMenu);
        // props?.reset?.({ search: item?.name });

    }, [props?.callStateUpdate, props?.reset]);

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
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [searchList, selectedIndex, handleSelect]);
    if(props?.formInput || !props?.SearchInput){
        return null
    }
  return (
    <div className="relative flex items-center justify-center"  ref={dropdownRef}>
        <InputField
            name={""}
            register={register("search")}
            placeholder={props?.search_title || `Search ${props?.title?.toLocaleLowerCase().replace('add', '') ?? ''} & press enter`}
            useFor="search"
            inputClassName={`rounded-md ${props?.className ?? "max-w-[250px] min-w-[250px]"} overflow-hidden w-full`}
            className="global-search"
            controlClassName={"bg-transparent"}
            id="global-search"
            onEnterClick={handleKeyDown}
            onChange={handleChange}
            autocomplete="off"
        />
        {searchList?.items?.length > 0 && props?.searchMenu && showMenu && (
            <div className="absolute z-[14] bg-white shadow-xl rounded-md border border-gray-200 mt-1 lg:w-96 w-full max-h-60 min-w-min top-full left-0">
                <Scrollbar style={{ height: `${Math.min(searchList?.items?.length * 48, 240)}px` }}>
                    <ul className="max-h-60 " tabIndex={0} >
                        {searchList?.items?.map((item, index) => (
                            <li key={index} className={`px-4 py-3 cursor-pointer ${selectedIndex === index ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                                onClick={() => handleSelect(item)}
                                onMouseEnter={() => setSelectedIndex(index)}>
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </Scrollbar>
            </div>
        )}
    </div>
  )
}
