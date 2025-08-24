/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
import React, { useState } from 'react'
import Icon from '../Icon';

interface DropdownProps {
  className?: string
  options?: object[];
  value?: any[];
  children?: React.ReactNode,
  onChange?: Function,
  isCheck?: boolean,
  menuTitle?: any,
  theme?: "list" | "cols"
  place?: "end" | "start"
}

const ButtonDropDown: React.FC<DropdownProps> = (props) => {
  const {
    children,
    options,
    isCheck,
    theme = "list",
    place = "end",
  } = props;
  const [showMenu, setShowMenu] = useState(false);
  const callShowMenu = () => {
    setShowMenu(!showMenu)
  }

  // const onChange = (e: any, data: any) => {

  //   const allValue = props?.value;
  //   const listValue: any[] = [];
  //   const checkFind = allValue?.find((item, index) => data?.value == item?.value);
  //   if (checkFind) {
  //     allValue?.map((item, index) => {
  //       if (data?.value != item?.value) {
  //         listValue.push(item);
  //       }
  //     });
  //   } else {
  //     allValue?.map((item, index) => {
  //       listValue.push(item);
  //     });
  //     listValue.push(data)
  //   }

  // }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, data: any) => {
    const allValue = props?.value || []; 
    let listValue: any[] = [];
  
    const checkFind = allValue.some((item) => item.value === data.value); 
    if (checkFind) {
      listValue = allValue.filter((item) => item.value !== data.value); 
    } else {
      listValue = [...allValue, data]; 
    }
  
    props.onChange?.(listValue); 
  };
  
  const onSelect = (item) => {
    if (props?.onChange) {
      props?.onChange(item);
    }
    callShowMenu();
  }

  const ListOptions = ({ children, className, onClick }: any) => {
    if (theme == "list") {
      return (
        <li className={`${className} options-theme-${theme}  `} onClick={onClick} >{children}</li>
      )
    }
    if (theme == "cols") {
      return (
        <div className={`${className} options-theme-${theme}  `} onClick={onClick} >{children}</div>
      )
    }
  }
  const callOptionList = (item: any, index: any) => {
    if (isCheck) {
      const checkSelect = props?.value?.find((item1, index) => item?.value == item1.value);
      return (
        <ListOptions >
          <label htmlFor={`${item?.label}_${index}`} className={`option ${item?.label}_${index}`}>
            <input
              type="checkbox"
              checked={checkSelect ? true : false}
              onChange={(e) => onChange(e, item)}
              // onClick={onClick}
              id={`${item?.label}_${index}`}
              className='mr-2 '
            />
            <span className="option-text">{item?.label || item?.name}</span>
          </label>
        </ListOptions>
      )
    }
    return (
      <ListOptions className="option" onClick={(e) => onSelect(item)}>
        {
          item?.icon && (
            <Icon attrIcon={item?.icon} />
          )
        }
        <span className="option-text" onClick={item?.callBack && item?.callBack}>{item?.label || item?.name}</span>
      </ListOptions>
    )
  }
  return (
    <React.Fragment>
      <div className={`dropdown-wrapper ${props?.className}`} >
        <div className={`select-menu place-${place} ${!showMenu ? "" : "active"}`}>
          <div className="select-btn" onClick={callShowMenu}>
            {children}
          </div>
          {options?.length && (
            <ul className={`options ${showMenu ? (theme == "cols" ? "flex" : "") : ""}`}>
              {props?.menuTitle && (
                <ListOptions className="option-label">
                  <span className="option-text text-sm font-[600] border-dropdown border-b">{props?.menuTitle}</span>
                </ListOptions>
              )}
              <div className={`options-row`}>
                {options?.map((item: any, index) => (
                  <React.Fragment key={index}>
                    {callOptionList(item, index)}
                  </React.Fragment>
                ))}
              </div>
            </ul>
          )}
        </div>
        {showMenu && (
          <div className='backdrop' onClick={callShowMenu}></div>
        )}
      </div>
    </React.Fragment>
  )
}

export default ButtonDropDown;