import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FirstCasePipe } from './first-case.pipe';
import { FormlySelectOptionsPipe } from './select-options-pipe';
import { ISODatePipe } from './iso-date.pipe';
import { ISOTimePipe } from './time.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'projects/environments/environment';

@NgModule({
  declarations: [
    FirstCasePipe,
    ISODatePipe,
    ISOTimePipe,

    FormlySelectOptionsPipe,
  ],
  imports: [
    // CommonModule
    FormsModule, ReactiveFormsModule,
  ],
  exports: [
    FirstCasePipe,
    ISODatePipe,
    ISOTimePipe,

    FormlySelectOptionsPipe,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: environment.locale },
  ]
})
export class PipesModule {
  static forRoot() {
    return {
        ngModule: PipesModule,
        providers: [
          { provide: LOCALE_ID, useValue: environment.locale },
        ],
    };
 }
}
