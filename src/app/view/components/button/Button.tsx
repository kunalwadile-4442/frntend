import { useState } from "react";
import SpinnerSm from "../loader/SpinnerSm";
import { useNavigate } from "react-router-dom";

type IButtonTypes = {
  label?: any;
  className?: string;
  onClick?: any;
  to?: string;
  type?: "submit" | "reset" | "button" | undefined;
  icon?: any;
  state?: any;
  disabled?: boolean;
  isLoading?: boolean;
  spinnerColor?: string;
};
const Button = (prop: IButtonTypes) => {
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const onClick = (e) => {
    if (prop?.onClick) {
      setDisabled(true);
      if (!prop.disabled && !prop.isLoading) {
        prop?.onClick(e);
      }
      setTimeout(() => setDisabled(false), 500);
    }
    if (prop?.to) {
      navigate(prop?.to, { state: prop?.state });
    }
  };
  return (
    <button
      disabled={prop.disabled || disabled}
      type={`${prop.type ? prop.type : "button"}`}
      className={`warnpopup-button ${
        prop.className
      } py-1 px-3  text-sm  ${
        !prop.disabled
          ? prop?.className?.includes("hover:bg")
            ? ""
            : "hover:bg-primary-100"
          : ""
      }`}
      // onClick={!prop.disabled && prop.onClick}
      // style={{whiteSpace: "nowrap"}}
      onClick={onClick}
    >
      <div className="flex justify-center items-center gap-2">
        {prop.icon && (
          <img src={prop.icon} className="h-3 text-primary" alt="" />
        )}
        <p
        >
          {prop.label}
        </p>
        {prop.isLoading &&<div className="h-auto w-auto">
        <SpinnerSm className={prop?.spinnerColor||((prop?.className?.includes('text-white') || !prop?.className?.includes('bg-white') )&&"border-white w-4 h-4")}/>
        </div>}
      </div>
    </button>
  );
};

export default Button;
