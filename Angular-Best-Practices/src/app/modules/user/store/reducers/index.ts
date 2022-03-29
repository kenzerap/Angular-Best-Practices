import { createFeatureSelector, createSelector, combineReducers, Action } from '@ngrx/store';
import * as fromUser from './user.reducer';
import * as fromRoot from '@app/store/reducers';

export const featureKey = 'user';

// state
export interface UserState {
  [fromUser.featureKey]: fromUser.State;
}

export interface State extends fromRoot.AppState {
  [featureKey]: UserState;
}

export const initialState: UserState = {
  [fromUser.featureKey]: fromUser.initialState,
};

// reducer
const baseRepaymentReducer = combineReducers({
  [fromUser.featureKey]: fromUser.reducer,
});

export function reducers(state: UserState | undefined, action: Action) {
  return baseRepaymentReducer(state, action);
}

// selectors
export const selectRepaymentState = createFeatureSelector<State, UserState>(featureKey);

// user list selecters
const selectUserListState = createSelector(
  selectRepaymentState,
  (state: UserState) => state[fromUser.featureKey]
);

export const selectUsers = createSelector(
  selectUserListState,
  fromUser.selectUsers
);

export const selectLoading = createSelector(
  selectUserListState,
  fromUser.selectLoading
);

export const selectUserDetail = createSelector(
  selectUserListState,
  fromUser.selectUserDetail
);
