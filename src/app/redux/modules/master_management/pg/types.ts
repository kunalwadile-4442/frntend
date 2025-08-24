
export interface IPGCourseListTypes {
  id: string;
  course_name: string;
  description: string;
  active: boolean;
  createdAt: string;
  action?: string; 
}

export interface IPGCourseRes {
  items: IPGCourseListTypes[];
  totalCount: number;
  optionList: [];
}
