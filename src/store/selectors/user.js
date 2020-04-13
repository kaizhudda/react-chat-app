import { createSelector } from "reselect";

export const selectUserData = (state) => state.user;

export const selectCurrentUser = createSelector(
  selectUserData,
  (user) => user.currentUser
);

export const selectUserLoading = createSelector(
  selectUserData,
  (user) => user.isLoading
);
