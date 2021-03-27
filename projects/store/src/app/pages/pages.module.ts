import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, PlatformLocation } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { environment } from 'projects/environments/environment';

import { AppRoutingModule } from '../app-routing.module';

//#region Formly
import { FormlyModule, FORMLY_CONFIG } from '@ngx-formly/core';
import { FormlyConfig } from 'projects/core/directives/formly/formly.config';
//#endregion

//#region Translation
import { TranslateService, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory, registerTranslateExtension } from 'projects/core/helpers/translate.extension';
//#endregion

//#region FontAwesome
import { FontAwesomeModule, FaIconLibrary, FaConfig } from '@fortawesome/angular-fontawesome';
import { faSpinner,
  faBook, faInfoCircle, faShoppingCart,
  faUser, faTruck, faClock, faCreditCard, faPencilAlt, faTimes, faTrash,
  faPlus, faMinus, faCircle, faSave } from '@fortawesome/free-solid-svg-icons';
//#endregion

//#region MyModules
import { CoreModule } from '@core/core.module';
import { ComponentsModule } from '@store/app/components/components.module';
//#endregion

//#region MyComponents
import { HomeComponent, MenuComponent, ShopcartComponent, PlacingYourOrderComponent } from './';
//#endregion

//#region MyDirectives
import { DirectivesModule } from '@core/directives/directives.module';
//#endregion

//#region MyPipes
import { PipesModule } from '@core/pipes/pipes.module';
//#endregion

import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  declarations: [
    // LoginComponent, RegisterComponent, VerifyEmailComponent, ForgotPasswordComponent,
    // NotFoundComponent, NavbarComponent, HeaderComponent,
    // ControlErrorComponent, ControlErrorsDirective, ControlErrorContainerDirective, FormSubmitDirective, FormCompetenceComponent,

    HomeComponent,
    MenuComponent,
    ShopcartComponent,
    PlacingYourOrderComponent,
  ],
  imports: [
    CommonModule, AppRoutingModule, HttpClientModule,
    FormsModule, ReactiveFormsModule,
    FontAwesomeModule,

    PipesModule,
    CoreModule,
    DirectivesModule,
    ComponentsModule,
    FormlyModule.forRoot(FormlyConfig),
    TranslateModule.forRoot({ defaultLanguage: environment.language, loader: { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient, PlatformLocation] } }),
    LeafletModule,
  ],
  exports: [
    HomeComponent,
    MenuComponent,
    ShopcartComponent,
    PlacingYourOrderComponent
  ],
  providers: [
    Title,
    HttpClient,
    // SubproductService,
    { provide: LOCALE_ID, useValue: environment.locale },
    { provide: FORMLY_CONFIG, multi: true, useFactory: registerTranslateExtension, deps: [ TranslateService ] },
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  entryComponents: [
    // ControlErrorComponent
  ],
})
export class PagesModule {
  constructor(
    iconLibrary: FaIconLibrary,
    iconConfig: FaConfig
  ){
    // iconLibrary.addIconPacks(fas, far);
    iconConfig.defaultPrefix = 'fas';
    iconConfig.fixedWidth = true;
    // Add an icon to the library for convenient access in other components
    // tslint:disable-next-line: max-line-length
    iconLibrary.addIcons(faSpinner);
    iconLibrary.addIcons(faBook, faInfoCircle, faShoppingCart);
    iconLibrary.addIcons(faUser, faTruck, faClock, faCreditCard, faPencilAlt, faTimes, faTrash, faSave);
    iconLibrary.addIcons(faTimes, faPlus, faMinus, faCircle);

    // <!-- simple name only that assumes the default prefix -->
    // <fa-icon icon="coffee"></fa-icon>
    // <!-- ['fas', 'coffee'] is an array that indicates the [prefix, iconName] -->
    // <fa-icon [icon]="['fas', 'coffee']"></fa-icon>
  }
}
