import { ICommonListTypes, IListType } from "../../../../utils/types";

export interface IInventoryStock extends ICommonListTypes {
  name: string;
  id: string;
  product_id: string;
  product_name: string;
  product_name_lc: string;
  location_id: string;
  location_name: string;
  location_name_lc: string;
  size_id: string;
  size_name: string;
  size_name_lc: string;
  grade_id: string;
  grade_name: string;
  grade_name_lc: string;
  coating_id: string;
  coating_name: string;
  coating_name_lc: string;
  total_qty: number;
  low_stock_qty: number | null;
  out_of_stock_qty: number | null;
  length_id: string;
  length_name: string;
  length_name_lc: string;
  supplier_type_id: string;
  supplier_type_name: string;
  supplier_type_name_lc: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  author: string;
  is_dashboard: boolean;
  year: string;
  month: string;

}

interface IInventoryChanges {
  ADD: any[];
  SUB: any[];
}
interface ISalesChanges {
  total:any[];
  balance:any[];
}

export interface IDashboardData {
  InventoryChanges: IInventoryChanges;
  ISalesChanges: ISalesChanges;

}

export interface IDashboardRes {
  inventoryStocks?: IDashboardData,
}

