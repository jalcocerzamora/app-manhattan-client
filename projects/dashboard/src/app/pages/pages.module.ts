import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject, LOCALE_ID, NgModule, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT, NgComponentOutlet, PlatformLocation } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { far, faUser } from '@fortawesome/free-regular-svg-icons';
import { faShoppingCart, faTruck, faTv, faChevronUp, faChevronDown, fas } from '@fortawesome/free-solid-svg-icons';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { environment } from 'projects/environments/environment';
import { HttpLoaderFactory, registerTranslateExtension } from 'projects/core/helpers';

import { FormlyConfigCustom } from 'projects/core/directives/formly/formly.config';
import { CoreModule } from 'projects/core/core.module';

import { AppRoutingModule } from '../app-routing.module';
import { FormlyModule, FORMLY_CONFIG } from '@ngx-formly/core';

import { LoginComponent } from 'projects/dashboard/src/app/pages/login/login.component';
import { HomeComponent } from 'projects/dashboard/src/app/pages/home/home.component';
import { MyOrdersComponent } from 'projects/dashboard/src/app/pages/my-orders/my-orders.component';
import { ComponentsModule } from 'projects/dashboard/src/app/components/components.module';

@NgModule({
  declarations: [
    // ControlErrorsDirective, ControlErrorContainerDirective, FormSubmitDirective, ShopCartComponent,

    // NotFoundComponent,
    LoginComponent,
    HomeComponent,
    MyOrdersComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,

    CoreModule,
    ComponentsModule,
    FormlyModule.forRoot(),
    TranslateModule.forRoot({ defaultLanguage: environment.language, loader: { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient, PlatformLocation] } }),
  ],
  exports: [
    LoginComponent,
    HomeComponent,
    MyOrdersComponent
    // RegisterComponent, VerifyEmailComponent, ForgotPasswordComponent,
  ],
  providers: [
    HttpClient,
    { provide: LOCALE_ID, useValue: environment.locale },
    { provide: FORMLY_CONFIG, multi: true, useFactory: registerTranslateExtension, deps: [ TranslateService ] },
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class PagesModule {
  constructor(library: FaIconLibrary) {
    // Add multiple icons to the library
    // library.addIcons(faShoppingCart, faTruck, faTv, faUser, faChevronUp, faChevronDown);
    library.addIconPacks(fas);
    library.addIconPacks(far);
  }
}