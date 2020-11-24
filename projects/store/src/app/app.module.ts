import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';

import { environment } from 'projects/environments/environment';

// Modules
// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

// Translation
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpLoaderFactory, registerTranslateExtension } from 'projects/core/helpers/translate.extension';

// import { ServiceWorkerModule } from '@angular/service-worker';

// Components
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { ComponentsModule } from './components/components.module';

import { FORMLY_CONFIG, } from '@ngx-formly/core';
import { FormlyConfig } from './directives/formly/formly.config';

// Locales
// import { registerLocaleData } from '@angular/common';
// import (environment.locale.includes('es') ? '@angular/common/locales/es-MX' : '@angular/common/locales/en');
import '@angular/common/locales/global/es';
import '@angular/common/locales/global/en';
// import localeEsMx from '@angular/common/locales/es-MX';
// import localeEsMxExtra from '@angular/common/locales/extra/es-MX';

// registerLocaleData(localeEsMx, localeEsMxExtra);

import { JwtInterceptor, ErrorInterceptor, CacheInterceptor } from 'projects/core/helpers';
import { AuthenticationService } from 'projects/core/services/authenticate/authentication.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from './directives/directives.module';
import { PipesModule } from './pipes/pipes.module';
import { SocketIoModule } from 'ngx-socket-io';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    FontAwesomeModule,

    SocketIoModule.forRoot({ url: environment.SOCKET_ENDPOINT, options: {} }),

    PipesModule,
    DirectivesModule,
    ComponentsModule,
    PagesModule,

    TranslateModule.forRoot({ defaultLanguage: environment.language, loader: { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient, PlatformLocation] } }),
  ],
  providers: [
    Title,
    AuthenticationService,

    { provide: LOCALE_ID, useValue: environment.locale },
    { provide: DEFAULT_CURRENCY_CODE, useValue: environment.currency },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
    { provide: FORMLY_CONFIG, multi: true, useFactory: registerTranslateExtension, deps: [TranslateService] },
    // { provide: APP_BASE_HREF, useFactory: (s: PlatformLocation) => trimLastSlashFromUrl(s.getBaseHrefFromDOM()), deps: [PlatformLocation] // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    // private iconLibrary: FaIconLibrary,
    // private iconConfig: FaConfig
  ){
    // iconLibrary.addIconPacks(fas, far);
    // iconConfig.defaultPrefix = 'fas';
    // iconConfig.fixedWidth = true;
    // iconLibrary.addIcons(faSpinner);
    // iconLibrary.addIcons(faBook, faInfoCircle, faShoppingCart);
    // iconLibrary.addIcons(faUser, faTruck, faClock, faCreditCard, faPencilAlt, faTimes, faTrash, faSave);
    // iconLibrary.addIcons(faTimes, faPlus, faMinus, faCircle);

    // <!-- simple name only that assumes the default prefix -->
    // <fa-icon icon="coffee"></fa-icon>
    // <!-- ['fas', 'coffee'] is an array that indicates the [prefix, iconName] -->
    // <fa-icon [icon]="['fas', 'coffee']"></fa-icon>
  }
}
