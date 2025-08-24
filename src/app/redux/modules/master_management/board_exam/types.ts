export interface IBoardExamTypes {
  id: string;
  exam_board_name: string;
  description: string;
  createdAt: string;
  active: boolean;
}

export interface IBoardExamRes {
  items: IBoardExamTypes[];
  totalCount: number;
  optionList: [];
}
