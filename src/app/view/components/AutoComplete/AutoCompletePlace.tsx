/* eslint-disable eqeqeq */
import React, { useEffect, useRef, useState } from 'react';
import { getLocation } from '../../../api/rest/getLocation';
import { usePosterReducers } from '../../../redux/getdata/usePostReducer';
import { App_url } from '../../../utils/constants/static';
import Icon from '../Icon';
import InputField from '../InputField';
import { Controller } from 'react-hook-form';
import { getData } from '../../../api/rest/fetchData';






interface IAutoCompletePlace {
  value?: string;
  error?: any;
  placeholder?: string;
  required?: boolean;
  label?: string;
  onSelectLocation?: Function;
  setValue?: Function;
  control?: any;
  country?: string;
  rules?: any;
  control_name?: string;
  inputClassName?: string;
  formClassName?: string;
  name_value?: string;
  name_key?: string;
  type?: "textarea" | "search"
  onChange?:Function;
}
const AutoCompletePlace = (props: IAutoCompletePlace) => {
  const [locationList, setLocationList] = useState([]);
  const [showList, setShowList] = useState(false);
  const [cursor, setCursor] = useState(0);
  const [address, setAddress] = useState('');
  const { user_data,accessToken } = usePosterReducers();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowList(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const locationValueChange = async (address, field) => {
    setAddress(address);
    onSelectLocation({ ...field?.value, address: address });
    if (field) {
      field.onChange({ ...field?.value, address: address });
    }
  };


  const onSelectLocationHandler = async (e, index, field) => {
    e.preventDefault();
    const selected = locationList[index];
    
    setShowList(false);
    setLocationList([]);
  };


  const onSelectLocation = (item) => {
    if (props?.onSelectLocation) {
      props?.onSelectLocation(item);
    }
    if (props?.setValue && props?.name_key) {
      props?.setValue(props?.name_key, item[props?.name_value || props?.name_key]);
    }
  }

  const gotoMain = (value) => {
    const element = document.getElementById('innerDivScroll' + cursor);
    document.getElementById('menuScroll').scrollTo({ top: element.offsetTop + value, behavior: 'smooth' });
  };

  // const handleKeyDown = (e, field, value?:any) => {
  //   if(showList){
  //     if (e.key === 'Enter') {
  //       onSelectLocationHandler(e, cursor, field);
  //     } else if (e.keyCode === 38 && cursor > 0) {
  //       gotoMain(-90);
  //       setCursor(cursor - 1);
  //     } else if (e.keyCode === 40 && cursor < locationList.length - 1) {
  //       gotoMain(+10);
  //       setCursor(cursor + 1);
  //     }
  //   }else{
  //     if (e.key === 'Enter' && !e.shiftKey) {
  //       e.preventDefault();
  //       e.stopPropagation();
  //       callAddressSearch(value ? value : props?.value ? props?.value : "", field)
  //     }
  //   }
  // };
  const onKeyDown = (e:KeyboardEvent, field, value?:any) => {

    if((e.key === 'Enter' && e.shiftKey) || e.key === 'Tab'){
      resetState()
    }else{
      if(showList){
        if (e.key === 'Enter') {
          onSelectLocationHandler(e, cursor, field);
        } else if (e.keyCode === 38 && cursor > 0) {
          gotoMain(-90);
          setCursor(cursor - 1);
        } else if (e.keyCode === 40 && cursor < locationList.length - 1) {
          gotoMain(+10);
          setCursor(cursor + 1);
        }
      }else{
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    }
  };

  const resetState = () => {
    setShowList(false);
    setCursor(0);
    setLocationList([]);
    setAddress('')
  };

  const onFocus = () => {
    if (address && locationList?.length) {
      setShowList(true);
    }
  }
  const callRenderInput = (field?: any, value?: any) => {
    return (
      <React.Fragment>
        <div className={`autocomplete-container Location_dropdown ${props?.formClassName}`} ref={dropdownRef}>
          <div className="input-group">
            <InputField
              onChange={(e) => locationValueChange(e.value, field)}
              onEnterClick={(e) => onKeyDown(e, field, value)}
              placeholder={value ? value : props?.value ? props?.value : props?.placeholder}
              error={props?.error}
              label={props?.label}
              inputClassName={`rounded-md ${(props?.value || value) ? "value-set" : ""} ${props?.inputClassName}`}
              required={props?.required}
              // value={address}
              value={value ? value : props?.value ? props?.value : ""}
              onFocus={onFocus}
              rightLabel={value || props?.value ?<Icon attrIcon={App_url.image.search} />:""}
              // onClickRightLabel={()=>callAddressSearch(value ? value : props?.value ? props?.value : "", field)}
              onKeyDown={(e) => onKeyDown(e, field, value)}
              useFor={props?.type}
              rows={3}
            />
          </div>
          {showList && (
            <React.Fragment>
              <div className="list-group" id="menuScroll">
                {locationList?.length == 0 ? (
                  <React.Fragment>
                    <div className={'list-group-item disable'}>
                      No Data Found
                    </div>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {locationList?.map((item, index) => (
                      <div
                        id={'innerDivScroll' + index}
                        key={index}
                        onMouseEnter={() => setCursor(index)}
                        onClick={(e) => onSelectLocationHandler(e, index, field)}
                        className={cursor === index ? 'list-group-item actions' : 'list-group-item'}
                      >
                        <Icon attrIcon={App_url.image.Map} className='sm' />
                        {item?.description}
                      </div>
                    ))}
                  </React.Fragment>
                )}
              </div>
            </React.Fragment>
          )}
        </div>
        {/* {showList && (
        <div onClick={resetState} className="background-click"></div>
      )} */}
      </React.Fragment>
    )
  }
  if (props?.control && props?.control_name) {
    return (
      <Controller
        name={props?.control_name}
        control={props?.control}
        render={({ field }) => {
          return (
            <React.Fragment>
              {callRenderInput(field, field?.value?.address)}
            </React.Fragment>
          )
        }}
        rules={props?.rules}
      />
    )
  }
  return (
    callRenderInput()
  );
};

export default AutoCompletePlace;
