import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { CommonModule, PlatformLocation } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule, FORMLY_CONFIG } from '@ngx-formly/core';

import { FaIconLibrary, FaConfig, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes, faPlus, faMinus, faCircle, faMobileAlt, faEnvelope, faGlobe, fas } from '@fortawesome/free-solid-svg-icons';

import { PipesModule } from 'projects/core/pipes/pipes.module';

// Translation
import { TranslateService, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory, registerTranslateExtension } from 'projects/core/helpers/translate.extension';

import { environment } from 'projects/environments/environment';

import {
  FormlyFieldInputComponent,
  FormlyFieldCheckboxComponent,
  FormlyFieldRadioComponent,
  FormlyFieldSelectComponent,
  FormlyFieldQuantityComponent,
  FormlyFieldTextAreaComponent,

  FormlyWrapperFormFieldComponent,
  FormlyWrapperFormAddonsComponent,
  FormlyFieldFileComponent,
  FileValueAccessorDirective,
} from 'projects/core/directives/formly/index';
import { FormlyConfig } from './formly/formly.config';


@NgModule({
  declarations: [
    FormlyFieldInputComponent,
    FormlyFieldFileComponent,
    FormlyFieldTextAreaComponent,
    FormlyFieldCheckboxComponent,
    FormlyFieldRadioComponent,
    FormlyFieldSelectComponent,
    FormlyFieldQuantityComponent,

    FormlyWrapperFormFieldComponent,
    FormlyWrapperFormAddonsComponent,

    FileValueAccessorDirective,
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    FontAwesomeModule,

    PipesModule,
    FormlyModule.forRoot(FormlyConfig),
    TranslateModule.forRoot({ defaultLanguage: environment.language, loader: { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient, PlatformLocation] } }),
  ],
  exports: [
    FormlyFieldCheckboxComponent,
    FormlyFieldInputComponent,
    FormlyFieldRadioComponent,
    FormlyFieldSelectComponent,
    FormlyFieldQuantityComponent,
    FormlyFieldTextAreaComponent,

    FormlyWrapperFormFieldComponent,
    FormlyWrapperFormAddonsComponent,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: environment.locale },
    { provide: FORMLY_CONFIG, multi: true, useFactory: registerTranslateExtension, deps: [TranslateService] },
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class DirectivesModule {

  constructor(
    private iconLibrary: FaIconLibrary,
    private iconConfig: FaConfig
  ) {
    iconConfig.defaultPrefix = 'fas';
    iconConfig.fixedWidth = true;
    // iconLibrary.addIcons(faTimes, faPlus, faMinus, faCircle);
    // iconLibrary.addIcons(faMobileAlt, faEnvelope, faGlobe);

    iconLibrary.addIconPacks(fas);
  }

  static forRoot() {
    return {
      ngModule: DirectivesModule,
      providers: [
        { provide: LOCALE_ID, useValue: environment.locale },
      ],
    };
  }
}
