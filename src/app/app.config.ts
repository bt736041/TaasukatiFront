import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { authInterceptor } from './interceptors/auth.interceptor';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ConfigurationService } from './services/configuration.service';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authReducer } from './store/auth/auth.reducers';
import { advisorReducer } from './store/advisor/advisor.reducer';
import {resultReducer} from './store/results/results.reducer'
import * as AuthEffects from './store/auth/auth.effects';
import * as AdvisorEffects from './store/advisor/advisor.effects';
import * as OpenEffects from './store/open/open.effects'
import * as closedEffects from './store/closed/closed.effects'
import * as ClientEffects from './store/client/client.effects'
import * as resultsEffects from './store/results/results.effects';
import { AUTH_FEATURE_KEY } from './store/auth/auth.selectors';
import { ADVISOR_FEATURE_KEY } from './store/advisor/advisor.selectors';
import { OPEN_FEATURE_KEY } from './store/open/open.selectors';
import { openReducer } from './store/open/open.reducer';
import { CLIENT_FEATURE_KEY } from './store/client/client.selectors';
import { clientReducer } from './store/client/client.reducer';
import { CLOSED_FEATURE_KEY } from './store/closed/closed.selectors';
import { closedReducer } from './store/closed/closed.reducer';
import {AI_RESULT_FEATURE_KEY} from './store/results/results.selectors'
import { ServerErrorInterceptor } from './core/server-error.interceptor';



export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(),

    provideState(AUTH_FEATURE_KEY, authReducer),
    provideEffects(AuthEffects),

    provideState(ADVISOR_FEATURE_KEY, advisorReducer),
    provideEffects(AdvisorEffects),

    provideState(OPEN_FEATURE_KEY, openReducer),
    provideEffects(OpenEffects),

    provideState(CLOSED_FEATURE_KEY, closedReducer),
    provideEffects(closedEffects),

    provideState(CLIENT_FEATURE_KEY, clientReducer),
    provideEffects(ClientEffects),

    provideState(AI_RESULT_FEATURE_KEY, resultReducer),
    provideEffects(resultsEffects),

    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

   provideHttpClient(
  withFetch(),
  withInterceptors([
    authInterceptor,
    errorInterceptor // ⬅️ שימוש רגיל בקבוע הפונקציונלי
  ])
),
    {
      provide: APP_INITIALIZER,
      useFactory: initConfigValues,
      deps: [ConfigurationService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true
    },
  ]
};


export function initConfigValues(config: ConfigurationService) {
  return (() => config.initConfiguration('/config'));
}

export function initAuth(authStartup: AuthStartupService) {
  return () => authStartup.runRefresh();
}

