/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState } from "react";
import SpinnerSm from "../loader/SpinnerSm";
import { useNavigate } from "react-router-dom";
type IButtonTypes = {
    label?: any;
    children?: any;
    icons?: any;
    className?: string;
    onClick?: any;
    to?: string;
    type?: "submit" | "reset" | "button" | undefined;
    icon?: any;
    radius?: "sm"| "lg"| "md" | "xl";
    fw?: "100"| "200"| "300" | "400"| "500"| "600"| "700"| "800"| "900" | "normal" | "bold" | "bolder" | "lighter";
    size?: "normal"| "sm"| "lg"| "md";
    variant?: "normal"| "primary" | "primary-trans"|"navy";
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

  
  const sizeClass = {
    normal:`text-[13px] py-[0.469rem] px-4 `,
    sm:"text-[12px] px-[15px] py-[5px] font-[500]",
    lg:"text-[16px] px-5 py-3",
    md:"text-[12px] px-4 py-2",
  }
  const textColor = {
    normal: { text:"body", hover:"body", active:"body", },
    primary: { text:"white", hover:"white", active:"white", },
    navy: { text:"white", hover:"white", active:"white", },
    "primary-trans": { text:"primary", hover:"primary", active:"primary", },
  }
  const variantClass = {
    "normal":`font-semibold text-${textColor.normal.text} hover:text-${textColor.normal.text}`,
    "primary":`bg-primary-blue hover:bg-primary-100 text-${textColor.primary.text} hover:text-${textColor.primary.hover}`,
    "navy":`bg-[#222326] hover:bg-[#19191b] text-${textColor.primary.text} hover:text-${textColor.primary.hover}`,
    "primary-trans":`bg-primary-trans hover:primary-trans text-${textColor["primary-trans"].text} hover:text-${textColor["primary-trans"].hover}`,
  }

  const className = useMemo(()=>{
    if(prop?.icons){
      return "p-1"
    }
    return `flex items-center justify-center ${sizeClass[prop?.size] ?? sizeClass?.normal} ${variantClass?.[prop?.variant] ?? variantClass?.normal} transition-colors duration-300 hover:darken-on-hover `;
  },[prop, prop?.size, prop?.variant])
  const styles ={}
  styles["--button-color"] = `var(--${textColor?.[prop?.variant]?.text})`;
  styles["--hover-button-color"] = `var(--${textColor?.[prop?.variant]?.hover})`;
  styles["--active-button-color"] = `var(--${textColor?.[prop?.variant]?.active})`;

  return (
    <button
      disabled={prop.disabled || disabled}
      type={prop.type ? prop.type : "button"}
      className={`${prop.className} ${className} button-component rounded-${prop?.radius}`}
      onClick={onClick}
      style={styles}
    >
      <div className={`flex justify-center items-center gap-2  font-[${prop?.fw}]`}>
        {prop.icon && <img src={prop.icon} className="h-3" alt="" />}
        {prop?.icons ? prop.label :<p className={`flex justify-center items-center gap-2 `}>{prop?.children ?? prop.label}</p>}
        {prop.isLoading && <SpinnerSm />}
      </div>
    </button>
  );
};

export default Button;
