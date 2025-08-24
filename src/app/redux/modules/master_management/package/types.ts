
export interface IPackageListTypes {
  id: string;
  graduation_type: string;
  course_name: string;
  description: string;
  active: boolean;
  createdAt: string;
  fees?: string; 
}

export interface IPackageRes {
  items: IPackageListTypes[];
  totalCount: number;
  optionList: [];
}
