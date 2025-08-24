
export interface IUGCourseListTypes {
  id: string;
  course_name: string;
  description: string;
  active: boolean;
  createdAt: string;
  action?: string; 
}

export interface IUGCourseRes {
  items: IUGCourseListTypes[];
  totalCount: number;
  optionList: [];
}
