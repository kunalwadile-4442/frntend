export interface ICollegeDocumentFile {
  _id: string;
  name: string;
  originalName: string;
  filePath: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  uploadDate: string;
  active: boolean;
  deleted_at: string | null;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICollegeDocument {
  type: string;
  document_id: string;
  _id: string;
  file: ICollegeDocumentFile;
}

export interface ICutoff {
  _id: string;
  college_id: string;
  college_name: string;
  course_id: string;
  course_name: string;
  academic_year: string;
  course_type: string;
  [key: string]: string | number | boolean | null | undefined;
}

export interface ICollegeListTypes {
  _id: string;
  college_name: string;
  college_code: string;
  hospital_details: string;
  bed: number;
  ug_courses: string[];  // assuming it's an array of course names
  pg_courses: string[];  // assuming it's an array of course names
  is_hostel: boolean;
  established_year: string;
  academic_year: string;
  documents: ICollegeDocument[];
  cutoffs: ICutoff[];
  deleted_at: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  course_type?:string;
  address?: string;
  state?: string;
  city?: string;
  pincode?:string;
  course_name?: string;
}

export interface ICollegeListTypesRes {
  items: ICollegeListTypes[];
  totalCount: number;
  optionList: any[];
  back_office_users?: ICollegeListTypes[];
}
