import { CUSTOM_ELEMENTS_SCHEMA, DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe, PlatformLocation } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { environment } from '@env/environment';

import { faCircle, faEdit, faMinus, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FaConfig, FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FirstCasePipe } from '@core/pipes/first-case.pipe';

import { AppRoutingModule } from './../app-routing.module';
import { DirectivesModule } from 'projects/core/directives/directives.module';
import { FormlyConfig } from 'projects/core/directives/formly/formly.config';

import { PipesModule } from 'projects/core/pipes/pipes.module';

import { FORMLY_CONFIG, FormlyModule } from '@ngx-formly/core';

import { HeaderComponent } from './header/header.component';
import { MenuCategoryComponent } from './menu-category/menu-category.component';
import { MenuCategoryItemComponent } from './menu-category-item/menu-category-item.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductPopperComponent } from './product-popper/product-popper.component';

// Maps
import { MapBoxGLComponent } from './map-box-gl/map-box-gl.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { GeolocateControlDirective } from 'ngx-mapbox-gl/lib/control/geolocate-control.directive';
// import { LeafletModule } from '@asymmetrik/ngx-leaflet';
// import { NgxLeafletLocateModule } from '@runette/ngx-leaflet-locate';

// Translation
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpLoaderFactory, registerTranslateExtension } from 'projects/core/helpers/translate.extension';

// Fcebook Pixel
import { PixelModule } from 'ngx-pixel';

// Stripe
import { NgxStripeModule } from 'ngx-stripe';

// Import the library

@NgModule({
  declarations: [
    NotFoundComponent,
    HeaderComponent,
    NavbarComponent,
    MenuCategoryComponent,
    MenuCategoryItemComponent,
    ProductPopperComponent,
    ProductItemComponent,
    PaymentGatewayComponent,
    MapBoxGLComponent,
    // GeolocateControlDirective,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    PipesModule,
    FormlyModule.forRoot(FormlyConfig),
    TranslateModule.forRoot({ defaultLanguage: environment.language, loader: { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient, PlatformLocation] } }),
    NgxStripeModule.forRoot(environment.STRIPE.PUBLIC_KEY),
    NgxMapboxGLModule.withConfig({
      accessToken: environment.MAPBOX.ACCESS_TOKEN, // Optional, can also be set per map (accessToken input of mgl-map)
      // geocoderAccessToken: 'TOKEN' // Optional, specify if different from the map access token, can also be set per mgl-geocoder (accessToken input of mgl-geocoder)
    }),
    PixelModule.forRoot({ enabled: environment.PIXEL.FACEBOOK.ENABLED, pixelId: environment.PIXEL.FACEBOOK.ID }),
    // LeafletModule,
    // NgxLeafletLocateModule,
    DirectivesModule,
  ],
  exports: [
    NotFoundComponent,
    HeaderComponent,
    NavbarComponent,
    MenuCategoryComponent,
    MenuCategoryItemComponent,
    ProductPopperComponent,
    ProductItemComponent,
    PaymentGatewayComponent,
  ],
  providers: [
    DatePipe,
    // FirstCasePipe,
    // TranslateService,
    { provide: LOCALE_ID, useValue: environment.locale },
    { provide: DEFAULT_CURRENCY_CODE, useValue: environment.currency },
    { provide: FORMLY_CONFIG, multi: true, useFactory: registerTranslateExtension, deps: [TranslateService] },
  ],
  entryComponents: [
    ProductPopperComponent,
    // ControlErrorComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class ComponentsModule {
  constructor(
    private iconLibrary: FaIconLibrary,
    private iconConfig: FaConfig
  ){
    iconConfig.defaultPrefix = 'fas';
    iconConfig.fixedWidth = true;
    iconLibrary.addIcons(faTimes, faPlus, faMinus, faCircle, faEdit);
  }

  static forRoot() {
    return {
      ngModule: ComponentsModule,
      // providers: [ { provide: LOCALE_ID, useValue: environment.locale }, ],
    };
  }
}
