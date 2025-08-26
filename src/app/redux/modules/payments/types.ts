import {  IPhoneTypes } from "../../../utils/types";

export interface IInternalUserTypes {
  proficiency?:string
  tl_id?:string
  delivery_date: string;
  customer_name: any;
  delivery_address: any;
  id: string;
  name: string;
  emp_id: string;
  phone_code: string;
  phone: string;
  dob: string;
  doj: string;
  address: string;
  email: string;
  photo: string;
  active: boolean;
  password: string;
  author: string;
  role: string;
  location_facility: string;
  location: string;
  role_id: string;
  emp_status: string;
  user_type: string;
  created_at: string;
  updated_at: string;
  password_reset_token: string | null;
  password_reset_at: string | null;
  role_name: string | null;
  country: string;
  status?: string
  action?: string
  assigned_at?: string;
  price ?: string | number
  designation?:string;
}


export interface IInternalUserTypesRes {
  items: IInternalUserTypes[];
  totalCount: number;
  optionList: [];
  back_office_users?: IInternalUserTypes[]
}


export interface IAddInternalUser extends IPhoneTypes {
  tl_id?:string
  tl_name?:string
  city: string;
  proficiency?:string
  emp_id: string;
  name: string;
  dob: string | Date;
  doj: string | Date;
  address: string;
  email: string;
  location_facility: string;
  role_id: string;
  emp_status: string;
  user_type: string;
  state: string;
  state_id: string | number;
  addressState?: any;
  designation?: string;
}