
import TableLayout from '../../../../components/layout/TableLayout';
import { collegeRes, formatDate } from '../../../../../utils/common';
import { App_url } from '../../../../../utils/constants/static';

const List = () => {
  const renderBody = (props: any) => {
    return (
      <tr>
        {props?.Serial()}
        {props?.columnView?.college_name && <td>{props?.college_name}</td>}
        {props?.columnView?.college_code && <td>{props?.college_code}</td>}
        {props?.columnView?.est && <td>{formatDate(props?.established_year)}</td>}
        {props?.columnView?.hospital_details && <td>{props?.hospital_details}</td>}
        {props?.columnView?.bed && <td>{props?.bed}</td>}
        {props?.columnView?.is_hostel && <td>{props?.is_hostel ? "Yes" : "No"}</td>}
        {props?.columnView?.sc_af && <td>{props?.cutoffs[0]?.sc_af}</td>}
        {props?.columnView?.sc_al && <td>{props?.cutoffs[0]?.sc_al}</td>}

        {props?.columnView?.st_af && <td>{props?.cutoffs[0]?.st_af}</td>}
        {props?.columnView?.st_al && <td>{props?.cutoffs[0]?.st_al}</td>}

        {props?.columnView?.vj_af && <td>{props?.cutoffs[0]?.vj_af}</td>}
        {props?.columnView?.vj_al && <td>{props?.cutoffs[0]?.vj_al}</td>}

        {props?.columnView?.nt1_af && <td>{props?.cutoffs[0]?.nt1_af}</td>}
        {props?.columnView?.nt1_al && <td>{props?.cutoffs[0]?.nt1_al}</td>}

        {props?.columnView?.nt2_af && <td>{props?.cutoffs[0]?.nt2_af}</td>}
        {props?.columnView?.nt2_al && <td>{props?.cutoffs[0]?.nt2_al}</td>}

        {props?.columnView?.nt3_af && <td>{props?.cutoffs[0]?.nt3_af}</td>}
        {props?.columnView?.nt3_al && <td>{props?.cutoffs[0]?.nt3_al}</td>}

        {props?.columnView?.obc_af && <td>{props?.cutoffs[0]?.obc_af}</td>}
        {props?.columnView?.obc_al && <td>{props?.cutoffs[0]?.obc_al}</td>}

        {props?.columnView?.ews_af && <td>{props?.cutoffs[0]?.ews_af}</td>}
        {props?.columnView?.ews_al && <td>{props?.cutoffs[0]?.ews_al}</td>}

        {props?.columnView?.open_af && <td>{props?.cutoffs[0]?.open_af}</td>}
        {props?.columnView?.open_al && <td>{props?.cutoffs[0]?.open_al}</td>}

        {props?.columnView?.d1_af && <td>{props?.cutoffs[0]?.d1_af}</td>}
        {props?.columnView?.d1_al && <td>{props?.cutoffs[0]?.d1_al}</td>}

        {props?.columnView?.d2_af && <td>{props?.cutoffs[0]?.d2_af}</td>}
        {props?.columnView?.d2_al && <td>{props?.cutoffs[0]?.d2_al}</td>}

        {props?.columnView?.d3_af && <td>{props?.cutoffs[0]?.d3_af}</td>}
        {props?.columnView?.d3_al && <td>{props?.cutoffs[0]?.d3_al}</td>}

        {props?.columnView?.pf_af && <td>{props?.cutoffs[0]?.pf_af}</td>}
        {props?.columnView?.pf_al && <td>{props?.cutoffs[0]?.pf_al}</td>}

        {props?.columnView?.mkb_af && <td>{props?.cutoffs[0]?.mkb_af}</td>}
        {props?.columnView?.mkb_al && <td>{props?.cutoffs[0]?.mkb_al}</td>}

        {props?.columnView?.nri_af && <td>{props?.cutoffs[0]?.nri_af}</td>}
        {props?.columnView?.nri_al && <td>{props?.cutoffs[0]?.nri_al}</td>}

        {props?.renderAction()}
      </tr>
    );
  };
  const FormPayload = [
    {
      name: "college name",
      key: "college_name",
    },
    {
      name: "college code",
      key: "college_code",
    },
    {
      name: "Established Date",
      key: "est",
    },
    {
      name: "Hospital Details",
      children: [
        { name: "Name", key: "hospital_details" },
        { name: "Bed", key: "bed" }
      ],
    },
    // {
    //   name: "Courses",
    //   children: [
    //     { name: "UG", key: "sc_first" },
    //     { name: "PG", key: "sc_last" },
    //   ],
    // },
    {
      name: "Hostel",
      key: "is_hostel",
    },
    {
      name: "2024 Cut Off",
      children: [
        {
          name: "SC",
          children: [
            { name: "First Admitted", key: "sc_af" },
            { name: "Last Admitted", key: "sc_al" },
          ],
        },
      ],
    },
    {
      name: "2024 Cut Off",
      children: [
        {
          name: "ST",
          children: [
            { name: "First Admitted", key: "st_af" },
            { name: "Last Admitted", key: "st_al" },
          ],
        },
      ],
    },
    {
      name: "2024 Cut Off",
      children: [
        {
          name: "VJ",
          children: [
            { name: "First Admitted", key: "vj_af" },
            { name: "Last Admitted", key: "vj_al" },
          ],
        },
      ],
    },
    {
      name: "2024 Cut Off",
      children: [
        {
          name: "nt1",
          children: [
            { name: "First Admitted", key: "nt1_af" },
            { name: "Last Admitted", key: "nt1_al" },
          ],
        },
      ],
    },
    {
      name: "2024 Cut Off",
      children: [
        {
          name: "nt2",
          children: [
            { name: "First Admitted", key: "nt2_af" },
            { name: "Last Admitted", key: "nt2_al" },
          ],
        },
      ],
    },
    {
      name: "2024 Cut Off",
      children: [
        {
          name: "nt3",
          children: [
            { name: "First Admitted", key: "nt3_af" },
            { name: "Last Admitted", key: "nt3_al" },
          ],
        },
      ],
    },
    {
      name: "2024 Cut Off",
      children: [
        {
          name: "OBC",
          children: [
            { name: "First Admitted", key: "obc_af" },
            { name: "Last Admitted", key: "obc_al" },
          ],
        },
      ],
    },
    {
      name: "2024 Cut Off",
      children: [
        {
          name: "EWS",
          children: [
            { name: "First Admitted", key: "ews_af" },
            { name: "Last Admitted", key: "ews_al" },
          ],
        },
      ],
    },
    {
      name: "2024 Cut Off",
      children: [
        {
          name: "OPEN",
          children: [
            { name: "First Admitted", key: "open_af" },
            { name: "Last Admitted", key: "open_al" },
          ],
        },
      ],
    },
    {
      name: "2024 Cut Off",
      children: [
        {
          name: "D1",
          children: [
            { name: "First Admitted", key: "d1_af" },
            { name: "Last Admitted", key: "d1_al" },
          ],
        },
      ],
    },
    {
      name: "2024 Cut Off",
      children: [
        {
          name: "D2",
          children: [
            { name: "First Admitted", key: "d2_af" },
            { name: "Last Admitted", key: "d2_al" },
          ],
        },
      ],
    },
    {
      name: "2024 Cut Off",
      children: [
        {
          name: "D3",
          children: [
            { name: "First Admitted", key: "d3_af" },
            { name: "Last Admitted", key: "d3_al" },
          ],
        },
      ],
    },
    {
      name: "2024 Cut Off",
      children: [
        {
          name: "PH",
          children: [
            { name: "First Admitted", key: "pf_af" },
            { name: "Last Admitted", key: "pf_al" },
          ],
        },
      ],
    },
    {
      name: "2024 Cut Off",
      children: [
        {
          name: "MKB",
          children: [
            { name: "First Admitted", key: "mkb_af" },
            { name: "Last Admitted", key: "mkb_al" },
          ],
        },
      ],
    },
    {
      name: "2024 Cut Off",
      children: [
        {
          name: "NRI",
          children: [
            { name: "First Admitted", key: "nri_af" },
            { name: "Last Admitted", key: "nri_al" },
          ],
        },
      ],
    },
  ];
  const statusOptions = [
    { label: "Assign", value: true },
    { label: "Not Assigned", value: false }
]
const listTab = [
    { label: "Open", value: 'OPEN' },
    { label: "Archived", value: "ARCHIVED" },
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
      title='Add College'
      handleOpen={App_url.link.ADD_COLLEGE_MASTER_URL}
      isFilter
      style={{ height: 180 }}
      isImport
      isExport
      customFilter={[{
          name: 'state',
          label: 'Detailed By',
          type: "select",
          options:statusOptions,
          defaultValue: "State",
          placeholder:"Course Name"
        },
        {
          name: 'state',
          label: 'Detailed By',
          type: "select",
          options:statusOptions,
          defaultValue: "State",
          placeholder:"College Type"
        }
      ]}
      
      filterList={[
        {
          name: 'state',
          label: 'Detailed By',
          type: "select",
          options:statusOptions,
          defaultValue: "State",
        },
        {
          name: 'city',
          label: 'Select City',
          type: "select",
          options:statusOptions,
          defaultValue: "city",
        },
        {
          name: 'year',
          label: 'Select Year',
          type: "select",
          options:statusOptions,
          defaultValue: "year",
        }
      ]}
    />
  )
}

export default List
