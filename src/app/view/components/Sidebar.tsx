/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation, useNavigate } from "react-router-dom";
import {
  App_url,
} from "../../utils/constants/static";
import Icon from "./Icon";
import { WarnFormSetFunctions } from "../../redux/actions/action";
import {
  getSidebarList,
} from "../../utils/common";
import { usePosterReducers } from "../../redux/getdata/usePostReducer";
import { useDispatch } from "react-redux";
import Scrollbar from "./Scrollbar";
import { useMemo, useState } from "react";

const Sidebar = ({ isOpen, toggleSidebar }: any) => {
  const { pathname } = useLocation();
  const route = pathname.split("/");
  const { user_data } = usePosterReducers();
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);

  const handleToggleDropdown = (title: string) => {
    setOpenDropdowns((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const SidebarListing: any = useMemo(
    () => getSidebarList(user_data),
    [
      user_data?.user?.role,
      user_data?.user?.api_permissions,
      user_data?.user?.role_permissions,
    ]
  );
  const isDashboard = useMemo(() => {
    return SidebarListing?.find((item) => item?.route === "/dashboard");
  }, [SidebarListing]);

  function onRoute(e: any, subMenuItem: string) {
    e.preventDefault();
    navigate(subMenuItem);
  }

  return (
    <div
      id={`${isOpen ? `panel-sidebar` : `hidden`}`}
      className={`text-sm text-slate-700 min-h-screen fixed lg:block lg:relative sidebar-container overflow-auto z-10 transition-all duration-300 ${isOpen ? 'translate-x-0 3xl:w-[300px] lg:w-[250px] w-3/5' : '-translate-x-full 3xl:max-w-fit lg:max-w-fit max-w-fit'}`}
    >
      <div
        className="flex relative justify-start px-4 text-end mt-4"
      >
        <div className="flex items-center justify-between gap-4">
          <div
            className="bg-contain bg-no-repeat bg-center h-[70px] w-[70px] cursor-pointer hover:brightness-90"
            style={{ backgroundImage: `url(${App_url.image.admin})` }}
            onClick={() =>
              isDashboard
                ? navigate(App_url.link.DASHBOARD_URL)
                : navigate(SidebarListing?.[0]?.route)
            }
          ></div>
          <div className="text-start">
            <p className="text-lg font-semibold">{user_data?.user?.name}</p>
            <p className="text-sm text-gray-500">{user_data?.user?.role}</p>
          </div>
        </div>

      </div>
      <Scrollbar style={{ height: `calc(100vh - 140px)` }}>
        {SidebarListing?.map((menuItem, index) => {
          const isLastInGroup =
            menuItem?.group_id !== SidebarListing[index + 1]?.group_id;
          const isDropdownOpen = openDropdowns.includes(menuItem.title);
          return (
            <div className={`${menuItem?.className ?? ""} px-3`} key={index}>
              <div
                className={`my-4 ${(menuItem?.route?.split('/')[1] === route[1] ||
                  isDropdownOpen ||
                  menuItem?.children?.some(child => child.route?.split('/')[1] === route[1]))

                  ? "bg-[#347AE5] text-primary rounded-md"
                  : ""
                  }
              hover:bg-[#347AE5] sidebar-content  hover:border-primary hover:text-[#FFFFFF] cursor-pointer p-2 px-3 hover:rounded-md my-1`}
                onClick={(e) => {
                  if (menuItem.children) {
                    handleToggleDropdown(menuItem.title);
                  } else {
                    onRoute(e, menuItem.route);
                  }
                }}
              >
                <div className="flex items-center justify-between gap-1">
                  <div className="flex items-center gap-3">
                    <Icon
                      className={"hover:bg-primary"}
                      attrIcon={menuItem.icon}
                    />
                    <p id={index?.toString()}>{menuItem.title}</p>
                  </div>
                  {menuItem.children && (
                    <span>{isDropdownOpen ?
                      <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.00061 4L4.00061 1L7.00061 4" stroke="white" stroke-width="1.49966" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>

                      :
                      <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 1L4 4L1 1" stroke="black" stroke-width="1.49966" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    }</span>
                  )}
                </div>
              </div>
              {menuItem.children && isDropdownOpen && (
                <div className="mt-[-10px] bg-[#E2EDFF] py-2 px-2 rounded-lg">
                  {menuItem.children.map((child: any, childIndex: number) => {
                    const isChildActive = child.route?.split("/")[2] === route[2];

                    return (
                      <div
                        key={childIndex}
                        // className={`flex items-center gap-3 py-2 px-2 mt-1 cursor-pointer rounded
                        //  ${isChildActive ? "bg-[#abc3eb] text-white" : ""}
                        //  hover:bg-[#abc3eb] hover:text-white transition-colors duration-200`}
                        className={`group ${isChildActive ? 'bg-[#a3c4f5da] text-primary' : ''}  sidebar-content  hover:border-primary  cursor-pointer p-2 px-3 rounded-md my-1`}
                        onClick={(e) => onRoute(e, child.route)}
                      >
                        <div className="flex items-center gap-3">
                        <div
                            className={`h-[28px] w-[28px] rounded-full flex justify-center items-center
                            ${isChildActive ? "bg-[#347AE5] text-white" : "bg-white"}
                            group-hover:bg-[#347AE5]`}
                          >
                            <Icon
                              className="text-inherit"
                              attrIcon={child.icon}
                            />
                          </div>
                          <p id={child?.toString()}>{child.title}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className={`${isLastInGroup ? "border-b-[1px] border-secondary my-4" : ""}`}></div>
            </div>
          );
        })}
      </Scrollbar>
      <div
        onClick={() =>
          dispatch(
            WarnFormSetFunctions({
              status: "delete",
              url: "logout",
              name: "Logout",
            })
          )
        }
        className="flex items-center mx-4 p-2 cursor-pointer hover:bg-red-50 rounded-md text-error gap-2"
      >
        <Icon
          style={{ background: "#d1293d" }}
          className={""}
          attrIcon={App_url.image.logout}
        />
        <p className="">Log Out</p>
      </div>
    </div>
  );
};

export default Sidebar;
