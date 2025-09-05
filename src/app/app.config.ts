import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { authInterceptor } from './interceptors/auth.interceptor';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ConfigurationService } from './services/configuration.service';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authReducer } from './store/auth/auth.reducers';
import { advisorReducer } from './store/advisor/advisor.reducer';
import * as AuthEffects from './store/auth/auth.effects';
import * as AdvisorEffects from './store/advisor/advisor.effects';
import { AUTH_FEATURE_KEY } from './store/auth/auth.selectors';
import { ADVISOR_FEATURE_KEY } from './store/advisor/advisor.selectors';


export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(), 

    provideState(AUTH_FEATURE_KEY, authReducer),
    provideEffects(AuthEffects),

    provideState(ADVISOR_FEATURE_KEY, advisorReducer),
    provideEffects(AdvisorEffects),

    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor])
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: initConfigValues,
      deps: [ConfigurationService],
      multi: true
    },
  ]
};

export function initConfigValues(config: ConfigurationService) {
  return (() => config.initConfiguration('/config'));
}

