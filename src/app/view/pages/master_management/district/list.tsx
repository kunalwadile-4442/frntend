
import TableLayout from '../../../components/layout/TableLayout';
import { collegeRes, formatDate } from '../../../../utils/common';
import { App_url } from '../../../../utils/constants/static';

const List = () => {
  const renderBody = (props: any) => {
    return (
      <tr>
        {props?.Serial()}
        {props?.columnView?.district_name && <td>{props?.district_name}</td>}
        {props?.columnView?.description && <td>{props?.description}</td>}
        {props?.columnView?.createdAt && <td>{formatDate(props?.createdAt)}</td>}
        {props?.renderAction()}
      </tr>
    );
  };
  const FormPayload = [
    {
      name: "District Name",
      key: "district_name",
    },
    {
      name: "Description",
      key: "description",
    },
    {
      name: "Date",
      key: "createdAt",
    }
  ];

  const statusOptions = [
    { label: "Assign", value: true },
    { label: "Not Assigned", value: false }
]

  return (
    <TableLayout
      columnKey={FormPayload}
      dataItem={collegeRes?.data.items}
      dataList={collegeRes.data}
      renderBody={renderBody}
      searchMenu
      serial_no
      edit
      isAdd
      isNav
      title='Add District'
      handleOpen={App_url.link.ADD_DISTRICT_URL}
      style={{ height: 200 }}
      customFilter={[
      {
        name: 'state',
        label: 'Course',
        type: "select",
        options:statusOptions,
        defaultValue: "State",
        placeholder:"Course Name"
      }
    ]}
    />
  )
}

export default List
