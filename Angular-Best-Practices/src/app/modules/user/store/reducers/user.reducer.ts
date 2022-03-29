import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/user.model';

import { UserActions } from '../actions';

export const featureKey = 'userList';

// state
export interface State {
  users: User[];
  loading: boolean;
  userDetail: User;
}

export const initialState: State = {
  users: [],
  loading: false,
  userDetail: null
};

// reducer
export const reducer = createReducer(
  initialState,
  on(
    UserActions.getUsers,
    (state) => ({ ...state, loading: true })
  ),
  on(
    UserActions.getUsersSuccess,
    (state, { users }) => ({ ...state, users, loading: false })
  ),
  on(
    UserActions.createUser,
    UserActions.editUser,
    (state) => ({ ...state, loading: true })
  ),
  on(
    UserActions.getUserDetailSuccess,
    (state, { user }) => ({ ...state, userDetail: user })
  ),
  on(
    UserActions.getUsersFailed,
    UserActions.createUserSuccess,
    UserActions.createUserFailed,
    UserActions.editUserSuccess,
    UserActions.editUserFailed,
    (state) => ({ ...state, loading: false })
  ),
  on(
    UserActions.resetUserState,
    () => ({ ...initialState })
  )
);

// selectors
export const selectUsers = (state: State) => state.users;
export const selectLoading = (state: State) => state.loading;
export const selectUserDetail = (state: State) => state.userDetail;
