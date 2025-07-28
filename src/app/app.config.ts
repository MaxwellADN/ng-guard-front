import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { reducers, metaReducers } from './core/states/reducers';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { environment } from '../environments/environment.development';
import { provideEffects } from '@ngrx/effects';
import { PricingEffects } from './core/states/effects/pricing.effect';
import { SubscriptionEffects } from './core/states/effects/subscription.effect';
import { UserEffects } from './core/states/effects/user.effect';
import { provideTranslateService, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, './i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(),
    provideStore(reducers, { metaReducers }),
    provideEffects([
      PricingEffects,
      SubscriptionEffects,
      UserEffects
    ]),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.googleProviderId, {
              oneTapEnabled: true,
              prompt: ''
            })
          }
        ],
        onError: (err) => console.error(err)
      } as SocialAuthServiceConfig
    },
    provideTranslateService({
      defaultLanguage: 'en'
    }),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    })
  ]
};
