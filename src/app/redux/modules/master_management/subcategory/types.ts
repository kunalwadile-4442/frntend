
export interface ISubCategoryListTypes {
  id: string;
  sub_category_name: string;
  description: string;
  active: boolean;
  createdAt: string;
  action?: string; 
}

export interface ISubCategoryRes {
  items: ISubCategoryListTypes[];
  totalCount: number;
  optionList: [];
}
