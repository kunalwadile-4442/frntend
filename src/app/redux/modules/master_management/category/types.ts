
export interface ICategoryListTypes {
  id: string;
  category_name: string;
  description: string;
  active: boolean;
  createdAt: string;
  action?: string; 
}

export interface ICategoryRes {
  items: ICategoryListTypes[];
  totalCount: number;
  optionList: [];
}
