import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';

import { CommonModule, DatePipe, PlatformLocation } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { environment } from '@env/environment';

import { FormlyModule, FORMLY_CONFIG } from '@ngx-formly/core';
import { FormlyConfig } from 'projects/core/directives/formly/formly.config';

import { FaIconLibrary, FaConfig, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes, faPlus, faMinus, faCircle, faEdit } from '@fortawesome/free-solid-svg-icons';

// Maps
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { MapBoxGLComponent } from './map-box-gl/map-box-gl.component';
import { GeolocateControlDirective } from 'ngx-mapbox-gl/lib/control/geolocate-control.directive';

// import { LeafletModule } from '@asymmetrik/ngx-leaflet';
// import { NgxLeafletLocateModule } from '@runette/ngx-leaflet-locate';

// Translation
import { TranslateService, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory, registerTranslateExtension } from 'projects/core/helpers/translate.extension';

import { AppRoutingModule } from './../app-routing.module';

import { PipesModule } from 'projects/core/pipes/pipes.module';

import { DirectivesModule } from 'projects/core/directives/directives.module';

import { NotFoundComponent } from './not-found/not-found.component';

import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MenuCategoryComponent } from './menu-category/menu-category.component';
import { MenuCategoryItemComponent } from './menu-category-item/menu-category-item.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductPopperComponent } from './product-popper/product-popper.component';
import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';

// Import the library
import { NgxStripeModule } from 'ngx-stripe';

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
    CommonModule, AppRoutingModule, HttpClientModule,
    FormsModule, ReactiveFormsModule,
    FontAwesomeModule,

    PipesModule,
    DirectivesModule,
    FormlyModule.forRoot(FormlyConfig),
    TranslateModule.forRoot({ defaultLanguage: environment.language, loader: { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient, PlatformLocation] } }),
    NgxStripeModule.forRoot(environment.STRIPE.PUBLIC_KEY),
    NgxMapboxGLModule.withConfig({
      accessToken: environment.MAPBOX.ACCESS_TOKEN, // Optional, can also be set per map (accessToken input of mgl-map)
      // geocoderAccessToken: 'TOKEN' // Optional, specify if different from the map access token, can also be set per mgl-geocoder (accessToken input of mgl-geocoder)
    })
    // LeafletModule,
    // NgxLeafletLocateModule,
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
}
