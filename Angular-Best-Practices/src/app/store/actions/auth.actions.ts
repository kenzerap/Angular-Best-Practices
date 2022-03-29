import { props, createAction } from '@ngrx/store';
import { User } from 'src/app/modules/user/models/user.model';

const prefix = 'authentication';

export const login = createAction(
    `[${prefix}] Login`,
    props<{ userName: string, passWord: string }>()
);

export const loginSuccess = createAction(
    `[${prefix}] Login - success`,
    props<{ userName: string, passWord: string }>()
);

export const loginFailed = createAction(
    `[${prefix}] Login - failed`,
);

export const saveUserInfo = createAction(
    `[${prefix}] Save user info`,
    props<{ userInfo: any }>()
);

export const clearState = createAction(
    `[${prefix}] Clear state`,
);
