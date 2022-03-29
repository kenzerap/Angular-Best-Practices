import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/modules/user/models/user.model';
import { AuthActions } from '../actions';

export const featureKey = 'auth';

export interface State {
  userInfo: any;
}

export const initialState: State = {
  userInfo: null
};

export const reducer = createReducer(
  initialState,
  on(
    AuthActions.loginSuccess,
    (state, { userName, passWord }) => {
      localStorage.setItem('userName', userName);
      localStorage.setItem('role', 'Admin');
      const token = `${userName}-${passWord}`;
      localStorage.setItem('token', token);

      return { ...state, userInfo: { userName, token, role: 'Admin' } }
    }
  ),
  on(
    AuthActions.saveUserInfo,
    (state, { userInfo }) => {
      return { ...state, userInfo }
    }
  ),
  on(
    AuthActions.clearState,
    (state) => {
      return { ...initialState }
    }
  )
);

export const selectUserInfo = (state: State) => state.userInfo;
