import { IBoardExamTypes, IBoardExamRes } from "./types";

export const ActionTypes = {
  BOARD_EXAM_LIST: "BOARD_EXAM_LIST",
  ADD_BOARD_EXAM: "ADD_BOARD_EXAM",
  UPDATE_BOARD_EXAM: "UPDATE_BOARD_EXAM",
  DELETE_BOARD_EXAM: "DELETE_BOARD_EXAM",
};

export const setBoardExamList = (payload: IBoardExamRes) => ({
  type: ActionTypes.BOARD_EXAM_LIST,
  payload,
});

export const addBoardExam = (payload: IBoardExamTypes) => ({
  type: ActionTypes.ADD_BOARD_EXAM,
  payload,
});

export const updateBoardExam = (payload: IBoardExamTypes) => ({
  type: ActionTypes.UPDATE_BOARD_EXAM,
  payload,
});

export const deleteBoardExam = (payload: IBoardExamTypes) => ({
  type: ActionTypes.DELETE_BOARD_EXAM,
  payload,
});
