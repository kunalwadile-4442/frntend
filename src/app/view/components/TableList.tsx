import React from 'react';
import Icon from './Icon';
import { App_url } from '../../utils/constants/static';

interface ITableList{
    children ? : React.ReactNode,
    columnName ?: string[],
    dataItem ?: object[],
    serial_no ?: boolean,
    edit ?: boolean,
    delete ?: boolean,
    renderBody ?: Function,
    payload ?: object,
    setPayload ?: Function,
}
const TableList:React.FC<ITableList> = (props) => {
  const { dataItem = [], columnName = [], edit = false, serial_no=false, renderBody = ()=>{}} = props
  const TableHeader = () =>{
    const renderAction = () =>{
      // if(!edit && !props?.delete){
      //   return <React.Fragment></React.Fragment>
      // }
      return (
        <th>
          Action
        </th>
      )
    }
    return(
      <thead>
        <tr>
          {serial_no &&(
            <th>Sr.No</th>
          )}
          {columnName?.map((item: any, index: any)=>(
            <React.Fragment>
              <th>{item}</th>
            </React.Fragment>
          ))}
          {renderAction()}
          <th>
          Action
        </th>
        </tr>
      </thead>
    )
  }
  const TableBody = () =>{
    const Serial = (index: number) =>{
      return <td>{index+1}</td>;
    }
    const renderAction = (item: number, index: number) =>{
      return (
        <td>
          {edit && (
            <Icon attrIcon={App_url.image.Edit} button />
          )}
          {props?.delete && (
            <Icon attrIcon={App_url.image.Delete} button />
          )}
        </td>
      )
    }
    return(
      <tbody>
        {dataItem?.map((item: any, index: any)=>(
            <React.Fragment>
              {renderBody({
                ...item, index:index,
                Serial: ()=>Serial(index),
                renderAction: ()=>renderAction(item, index),
              })}
            </React.Fragment>
          ))}
      </tbody>
    )
  }
  return (
    <div className='table-component '>
        <table className="text-sm bg-white">
          {TableHeader()}
          {TableBody()}
        </table>
    </div>
  )
}

export default TableList;