import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from 'projects/environments/environment';
import { AppRoutingModule } from './app-routing.module';

//#region MY IMPORTS
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
  //#region FORMLY
import { FORMLY_CONFIG, } from '@ngx-formly/core';
  //#endregion

  //#region SOCKET IO
// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
  //#endregion

  //#region TRANSLATION
// import { registerLocaleData } from '@angular/common';
// import (environment.locale.includes('es') ? '@angular/common/locales/es-MX' : '@angular/common/locales/en');
// import localeEsMx from '@angular/common/locales/es-MX';
// import localeEsMxExtra from '@angular/common/locales/extra/es-MX';
// registerLocaleData(localeEsMx, localeEsMxExtra);
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpLoaderFactory, registerTranslateExtension } from '@core/helpers/translate.extension';
import '@angular/common/locales/global/es';
import '@angular/common/locales/global/en';
  //#endregion

  //#region COMPONENTS
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { ComponentsModule } from './components/components.module';
  //#endregion

  //#region INTERCEPTOR
import { JwtInterceptor, ErrorInterceptor, CacheInterceptor } from '@core/helpers';
  //#endregion

  //#region SERVICES
import { AuthenticationService } from '@core/services/authenticate/authentication.service';
import { RequestCacheService } from '@core/services/helpers/requestCache.service';
  //#endregion

  //#region MODULES
import { DirectivesModule } from '@core/directives/directives.module';
import { PipesModule } from '@core/pipes/pipes.module';
  //#endregion

  //#region LEAFLET
// import { LeafletModule } from '@asymmetrik/ngx-leaflet';
// import { NgxLeafletLocateModule } from '@runette/ngx-leaflet-locate';
  //#endregion
//#endregion

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

    // SocketIoModule.forRoot({ url: environment.SOCKET_ENDPOINT, options: {} }),

    PipesModule,
    DirectivesModule,
    ComponentsModule,
    PagesModule,

    TranslateModule.forRoot({ defaultLanguage: environment.language, loader: { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient, PlatformLocation] } }),
    NgxMapboxGLModule.withConfig({
      accessToken: environment.MAPBOX.ACCESS_TOKEN, // Optional, can also be set per map (accessToken input of mgl-map)
      // geocoderAccessToken: 'TOKEN' // Optional, specify if different from the map access token, can also be set per mgl-geocoder (accessToken input of mgl-geocoder)
    })
    // LeafletModule,
    // NgxLeafletLocateModule,
  ],
  providers: [
    Title,
    AuthenticationService,
    RequestCacheService,
    { provide: LOCALE_ID, useValue: environment.locale },
    { provide: DEFAULT_CURRENCY_CODE, useValue: environment.currency },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
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
