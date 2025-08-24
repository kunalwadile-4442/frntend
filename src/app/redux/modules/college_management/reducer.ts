import { ActionTypes } from './action';
import { ICollegeListTypesRes } from './types';

const initialState: ICollegeListTypesRes = {
  items: [],
  totalCount: 0,
  optionList: [],
};

const collegeReducer = (state: ICollegeListTypesRes = initialState, action): ICollegeListTypesRes => {
  switch (action.type) {
    case ActionTypes.SET_COLLEGE_LIST: {
      const optionList = action.payload?.items?.map((item: any) => ({
        value: item.id,
        label: item.name,
      }));

      return {
        ...state,
        items: action.payload?.items || [],
        totalCount: action.payload?.totalCount || 0,
        optionList: optionList || [],
      };
    }

    case ActionTypes.SET_ADD_COLLEGE: {
      const items = [action.payload, ...state.items];
      const totalCount = state.totalCount + 1;
      return {
        ...state,
        items,
        totalCount,
      };
    }

    case ActionTypes.SET_UPDATE_COLLEGE: {
      const updatedList = state.items.map(college =>
        college._id === action.payload.id ? action.payload : college
      );
      return {
        ...state,
        items: updatedList,
      };
    }

    default:
      return state;
  }
};

export default collegeReducer;
