export interface IDistrictTypes {
  id: string;
  district_name: string;
  description: string;
  createdAt: string;
  active: boolean;
}

export interface IDistrictRes {
  items: IDistrictTypes[];
  totalCount: number;
  optionList: [];
}
