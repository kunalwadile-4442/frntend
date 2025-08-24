import { IPhoneData, ICommonListTypes } from "../../../../utils/types";
import { IProjectListType } from "../../backOffice/projectManagement/types";

export interface IContactPerson{
  email: string;
  name: string;
  phone: string;
  phone_code: string;
  phoneNumber?: IPhoneData;
}

interface FileData {
  file: string | any;
  id:string;
  name:string;
  original_name:string;
  file_type:string;
  file_size:string;
  is_thumbnails:string;
  active:string;
  created_at:string;
  updated_at:string;
  deleted_at:string;
  author:string;
}

interface Document {
  name: string;
  file: FileData;
}
export interface ICustomers extends ICommonListTypes {
  aging_at?: string;
  account_id: string;
  addressData?: any;
  address: string;
  address_lc: string;
  author: string;
  city: string;
  city_id: string;
  contact_person: IContactPerson[];
  created_at: string;
  deleted_at: string;
  email: string[];
  id: string;
  name: string;
  value?: string;
  label?: string;
  name_lc: string;
  phone: string;
  phone_code: string;
  state: string;
  state_id: string;
  updated_at: string;
  zip_code: string;
  phoneNumber?: IPhoneData;
  tax_exempt?: boolean;
  documents?:Document[]
}
export interface ICustomerListTypes {
    optionsList?: ICustomers[];
    parsedItems: ICustomers[];
    totalCount?: number;
}
export interface ICustomersRes {
  customersList?:ICustomerListTypes,
  customerDetails?:ICustomers,
  customerProjects?:{[id: string]:IProjectListType},
}
