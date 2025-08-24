/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

interface NavElementTypes {
  title: string;
  path: string;
  action_type?: string;
}

interface DropdownProps {
  label: string;
  onSelect: (e: any) => void;
  placeholder: string;
  defaultValue: string;
  options: any[];
  control: any;
  rules: any;
  name: string;
  errors: any;
  formClassName: string;
  required?: boolean;
}

interface ICredentialSetUp {
  children?: React.ReactNode;
  childrenProjects?: Function;
  navElement?: NavElementTypes[]|any;
  selectedProjectId?: string | null;
  className?: string;
  buttonClassName?: string;
  variant?: "tab" | "nav";
  active?: string;
  containerClassName?: string;
  wrapperClassName?: string;
  onClickTab?: Function;
  theme?: "primary-bottom" | "normal" | "admin-side";
  isNewTabCss?: boolean;
  childTab?: number;
  projectSelection?: boolean;
}

const TabRouting: React.FC<ICredentialSetUp> = (props) => {
  const { navElement, children, className, variant = "nav", childTab } = props;
  const navigate = useNavigate();
  const loc = useLocation();
  const onClickHandler = (item) => {
    if (variant == "nav") {
      navigate(item?.path);
    } else if (props?.onClickTab) {
      props?.onClickTab(item?.path);
    }
  };

  const activeTab = (item) => {
    if (childTab) {
      const path = item.path?.split('/')?.slice(0, childTab)?.join('/')
      const location_name = loc?.pathname?.split('/')?.slice(0, childTab)?.join('/')
      return path === location_name
    } else {
      return item?.path === loc?.pathname;
    }
  };

  const selectTheme = props?.theme ?? "normal";
  const theme = {
    "admin-side": {
      body: `${variant == "nav" ? "px-" : ""}  text-sm `,
      container: `${variant == "tab" ? "" : "border-"
        } overflow-x-auto w-full whitespace-nowrap no-scrollbar`,
      wrapper: props.isNewTabCss
        ? `${className} ${variant == "nav"
          ? `px-2 ${className?.includes("pt-") ? "" : "pt-1"}`
          : " rounded-lg p-0 bg-secondary_1 "
        }   text-sm   relative  w-full `
        : `${className} ${variant == "nav"
          ? `px-4 ${className?.includes("pt-") ? "" : "pt-4"}`
          : "bg-white rounded-lg p-0 bg-secondary_1 "
        }   text-sm   relative  w-full `,
      content: `flex justify-between cursor-pointer bg-white border-b ${variant == "tab" ? "p-1 gap-2" : "gap-2 "
        } overflow-x-auto w-full whitespace-nowrap no-scrollbar`,
      button: (item) =>
        props.isNewTabCss
          ? `${variant == "nav"
            ? "py-2 font-[600] text-[#4E4E4E] text-sm"
            : "font-[600] text-body p-1 py-2 "
          } ${item?.path === loc?.pathname &&
          "border-b border-primary text-primary"
          } ${variant == "tab"
            ? props?.active === item?.path &&
            "bg-white [box-shadow:0px_0px_4px_0px_#00000040] rounded-md"
            : ""
          } flex-auto hover:text-primary text-center`
          : `${variant == "nav" ? "p-2" : "font-[600] text-body p-1 py-2 "} ${item?.path === loc?.pathname && "border-b border-primary"
          } ${variant == "tab"
            ? props?.active === item?.path &&
            "bg-white [box-shadow:0px_0px_4px_0px_#00000040] rounded-md"
            : ""
          } flex-auto text-center hover:bg-slate-200 hover:transition-all hover:duration-300`,
    },
    normal: {
      body: `${variant == "nav" ? "px-" : ""}  text-sm `,
      container: `${variant == "tab" ? "" : "border-b"
        } bg-white overflow-x-auto w-full whitespace-nowrap no-scrollbar`,
      wrapper: props.isNewTabCss
        ? `${className} ${variant == "nav"
          ? `px-4 ${className?.includes("pt-") ? "" : "pt-1"}`
          : " rounded-lg p-0 bg-secondary_1 "
        }   text-sm   relative  w-full `
        : `${className} ${variant == "nav"
          ? `px-4 ${className?.includes("pt-") ? "" : "pt-"}`
          : " rounded-lg p-0 bg-secondary_1 "
        }   text-sm   relative  w-full `,
      content: `flex justify-between cursor-pointer  ${variant == "tab" ? "p-1 gap-2" : "border- gap-4 "
        } overflow-x-auto w-full whitespace-nowrap no-scrollbar`,
      button: (item) =>
        props.isNewTabCss
          ? `${variant == "nav"
            ? "py-2 font-[600] text-[#4E4E4E] text-sm"
            : "font-[600] text-body p-1 py-2 "
          } ${item?.path === loc?.pathname &&
          "border-b border-primary text-primary"
          } ${variant == "tab"
            ? props?.active === item?.path &&
            "bg-white [box-shadow:0px_0px_4px_0px_#00000040] rounded-md"
            : ""
          } flex-auto hover:text-primary text-center`
          : `${variant == "nav" ? "p-3" : "font-[600] text-body p-1 py-2 "} ${activeTab(item) && "border-b-4 border-primary"
          } ${variant == "tab"
            ? props?.active === item?.path &&
            "bg-white [box-shadow:0px_0px_4px_0px_#00000040] rounded-md"
            : ""
          } flex-auto text-center hover:text-primary hover:transition-all hover:duration-300`,
    },
    "primary-bottom": {
      body: ``,
      container: `w-full bg-white`,
      wrapper: ``,
      content: `flex justify-between gap-2`,
      button: (item) =>
        `flex-auto cursor-pointer hover:text-primary text-center px-5 py-3 text-sm font-500 lg:min-w-[200px] relative ${item?.path === loc?.pathname && "active-tab text-primary"
        }`,
    },
  };

  const {
    control,
    formState: { errors },
    reset,
  } = useForm();

  return (
    <React.Fragment>
      {props?.childrenProjects?.()}
      {(children || navElement?.length > 0) && (
        <div
          className={`tab-component  relative  ${theme?.[selectTheme]?.body}`}
        >
          {navElement?.length > 0 && (
            <nav
              className={`tab-nav-container flex justify-between gap-4 ${props?.containerClassName} ${theme?.[selectTheme]?.container} `}
            >
              <div
                className={`${theme?.[selectTheme]?.wrapper} ${props?.wrapperClassName}`}
              >
                {/* {props?.projectSelection && props?.childrenProjects?.()} */}
                <nav className={`${theme?.[selectTheme]?.content}`}>
                  {navElement?.map?.((item, index) => (
                    <p
                      key={index}
                      onClick={() => onClickHandler(item)}
                      className={`${theme?.[selectTheme]?.button(item)} ${props?.buttonClassName
                        }`}
                    >
                      {item?.title}
                    </p>
                  ))}
                </nav>
              </div>
            </nav>
          )}
          {children}
        </div>
      )}
    </React.Fragment>
  );
};

export default TabRouting;
