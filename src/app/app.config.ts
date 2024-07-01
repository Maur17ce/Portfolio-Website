import { APP_INITIALIZER, ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import {
  InMemoryScrollingFeature,
  InMemoryScrollingOptions,
  provideRouter,
  withInMemoryScrolling,
} from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { MAT_CARD_CONFIG, MatCardConfig } from '@angular/material/card';
import { authInterceptor } from '@interceptors/auth.interceptor';
import { MatMomentDateAdapterOptions, provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDateFormats } from '@angular/material/core';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { ConfigService } from '@services/config.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

registerLocaleData(localeDe);

export function initializeApp(srv: ConfigService) {
  return () => srv.getConfig();
}

export const MatMomentDateOptions: MatMomentDateAdapterOptions = {
  useUtc: true,
  strict: true,
};

export const MatMomentDateFormat: MatDateFormats = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'L',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};

export const inMemoryScrollingFeature: InMemoryScrollingFeature = withInMemoryScrolling(scrollConfig);

export const MAT_FORM_FIELD_SETTINGS: MatFormFieldDefaultOptions = {
  appearance: 'outline',
};

export const MAT_CARD_SETTINGS: MatCardConfig = {
  appearance: 'outlined',
};

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/i18n/');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, inMemoryScrollingFeature),
    provideAnimationsAsync(),
    provideMomentDateAdapter(MatMomentDateFormat),
    provideHttpClient(withInterceptors([authInterceptor])),
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: MAT_FORM_FIELD_SETTINGS },
    { provide: MAT_CARD_CONFIG, useValue: MAT_CARD_SETTINGS },
    { provide: LOCALE_ID, useValue: 'de' },
    { provide: APP_INITIALIZER, useFactory: initializeApp, multi: true, deps: [ConfigService] },
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'de',
    }).providers!,
  ],
};
