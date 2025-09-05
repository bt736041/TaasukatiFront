import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoginRequest, LoginResponse, RefreshResponse } from '../../models/auth';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login': props<{ loginRequest:LoginRequest }>(),
    'Login Success': props<{ loginResponse: LoginResponse }>(),
    'Login Failure': props<{ message: string }>(),

    'Logout': emptyProps(),
    'Logout Success': emptyProps(),
    'Logout Failure': props<{ message: string }>(),

    'Refresh': emptyProps(),
    'Refresh Success': props<{ refreshResponse: RefreshResponse }>(),
    'Refresh Failure': props<{ message: string }>(),
  }
});
