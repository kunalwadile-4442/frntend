export interface ICollegeTypes {
  id: string;
  college_type: string;
  description: string;
  createdAt: string;
  active: boolean;
}

export interface ICollegeTypeRes {
  items: ICollegeTypes[];
  totalCount: number;
  optionList: [];
}
