export interface IPassingYearTypes {
  id: string;
  passing_year_date: string;
  description: string;
  createdAt: string;
  active: boolean;
}

export interface IPassingYearRes {
  items: IPassingYearTypes[];
  totalCount: number;
  optionList: [];
}
