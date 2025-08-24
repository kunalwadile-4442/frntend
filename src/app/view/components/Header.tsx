/* eslint-disable eqeqeq */
import { useLocation, useNavigate } from "react-router-dom";
import Icon from "./Icon";
import { App_url, adminsidebarcontent } from "../../utils/constants/static";
import { usePosterReducers } from "../../redux/getdata/usePostReducer";
import { useMemo } from "react";
import ButtonDropDown from "./button/ButtonDropDown";
import { useDispatch } from "react-redux";
import { setLogout, WarnFormSetFunctions } from "../../redux/actions/action";
import { FaBars } from "react-icons/fa6";
// import { IoClose } from "react-icons/io5";

// import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
// import { RiBarChartHorizontalLine } from "react-icons/ri";

const Header = ({ toggleSidebar, isActive }: any) => {
  const loc = useLocation();
  const { user_data } = usePosterReducers();
  // const role = user_data?.user?.role;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let path =
    loc.pathname.split("/")[1].charAt(0).toUpperCase() +
    loc.pathname.split("/")[1].slice(1);
  let replacedPath: string = capitalizeWords(path.replace(/-/g, ' '));

  function capitalizeWords(input: string): string {
    return input.replace(/\b\w/g, (char: string) => {
      return char.toUpperCase();
    });
  }

  const getSidebarList = () => {
    return adminsidebarcontent;
  };

  const SidebarListing = useMemo(getSidebarList, [user_data?.user?.role]);
  const icon1 = SidebarListing?.find(icon => icon.title === replacedPath);

  const options = [
    { label: "Logout", value: "logout" },
  ];

  const onChange = (e: any) => {
    if (e.value !== 'change-password') {
      dispatch(WarnFormSetFunctions({ status: "delete", url: "logout", name: "Logout" }))   
    } else {
      navigate(App_url.link.CHANGE_PASSWORD)
    }
  }
  const getAvatarName = useMemo(() => {
    const getNames = user_data?.user?.name?.split?.(" ");
    if (getNames?.filter((item) => item != "")?.length > 1) {
      return getNames?.map?.((item) => item?.slice?.(0, 1))?.toString?.()?.replaceAll?.(",", "");
    } else if (getNames?.length > 0) {
      return getNames?.[0]?.slice?.(0, 2)
    }
  }, [user_data?.user?.name])

  return (
    <section className={`min-h-[51px] flex items-center pl-3 pr-6 w-full bg-white relative z-`}>
      <div className="h-full w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="font-semibold">{replacedPath}</p>
        </div>
        <div className="flex items-center gap-2">
          <ButtonDropDown
            options={options}
            onChange={onChange}
          >
            <div className="flex items-center justify-center gap-1 cursor-pointer">
              <div className="items-center justify-center text-center rounded-full h-[40px] w-[40px] flex cursor-pointer overflow-hidden">
                <img
                  src={App_url?.image?.applogo}
                  alt="App Logo"
                  className="object-cover h-full w-full"
                  style={{ objectPosition: "center" }}
                />
              </div>
              <p className="text-[#347AE5]">CHATRAPATI</p>
            </div>
          </ButtonDropDown>
        </div>
      </div>
    </section>
  );
};

export default Header;
