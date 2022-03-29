import { InjectionToken } from '@angular/core';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

export class AppState {
    [fromAuth.featureKey]: fromAuth.State;
}

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<AppState>>(
    'Root reducers token',
    {
        factory: () => ({
            [fromAuth.featureKey]: fromAuth.reducer,
        }),
    }
);

// auth selectors
export const selectAuthState = createFeatureSelector<fromAuth.State>(fromAuth.featureKey);

export const selectUserInfo = createSelector(
    selectAuthState,
    fromAuth.selectUserInfo
);
