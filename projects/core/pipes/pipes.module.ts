import { CommonModule } from '@angular/common';
import { environment } from 'projects/environments/environment';
import { FirstCasePipe } from './first-case.pipe';
import { FormlySelectOptionsPipe } from './select-options-pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ISODatePipe } from './iso-date.pipe';
import { ISOTimePipe } from './time.pipe';
import { LOCALE_ID, NgModule } from '@angular/core';


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
