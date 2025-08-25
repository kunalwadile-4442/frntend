import { useSelector } from "react-redux";
import { RootState } from "../store";
import { createSelector } from "reselect";

// Create memoized selector
const selectPosterReducers = createSelector(
  (state: RootState) => state?.combinedReducer,
  (combinedReducer) => ({
    ...combinedReducer?.usePosterReducers,
    accessToken: combinedReducer?.user_data?.accessToken,
    user_data: combinedReducer?.user_data,
    user_id: combinedReducer?.user_data?.user?.id,
    user: combinedReducer?.user_data?.user,
    column_permissions: combinedReducer?.user_data?.user?.column_permissions,
    role: combinedReducer?.user_data?.user?.role,
    isAdmin: combinedReducer?.user_data?.user?.role === "admin" ? true : false,
  })
);

export const usePosterReducers = () => {
  return useSelector(selectPosterReducers);
};
