import { props, createAction } from '@ngrx/store';
import { User } from '../../models/user.model';

const prefix = 'User';

export const getUsers = createAction(
  `[${prefix}] Get user list`,
);

export const getUsersSuccess = createAction(
  `[${prefix}] Get user list - success`,
  props<{ users: User[] }>()
);

export const getUsersFailed = createAction(
  `[${prefix}] Get user list - failed`,
);

export const getUserDetail = createAction(
  `[${prefix}] Get user detail`,
  props<{ userId: string }>()
);

export const getUserDetailSuccess = createAction(
  `[${prefix}] Get user detail - success`,
  props<{ user: User }>()
);

export const getUserDetailFailed = createAction(
  `[${prefix}] Get user detail - failed`,
);

export const createUser = createAction(
  `[${prefix}] Create user`,
  props<{ user: User }>()
);

export const createUserSuccess = createAction(
  `[${prefix}] create user - success`,
);

export const createUserFailed = createAction(
  `[${prefix}] Create user - failed`,
);

export const editUser = createAction(
  `[${prefix}] Edit user`,
  props<{ user: User }>()
);

export const editUserSuccess = createAction(
  `[${prefix}] Edit user - success`,
);

export const editUserFailed = createAction(
  `[${prefix}] Edit user - failed`,
);

export const deleteUser = createAction(
  `[${prefix}] Delete user`,
  props<{ userId: string }>()
);

export const deleteUserSuccess = createAction(
  `[${prefix}] Delete user - success`,
);

export const deleteUserFailed = createAction(
  `[${prefix}] Delete user - failed`,
);

export const resetUserState = createAction(
  `[${prefix}] Reset user`
);
