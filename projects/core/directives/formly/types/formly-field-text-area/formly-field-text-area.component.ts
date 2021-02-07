import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-field-text-area',
  template: `
    <textarea
      [formControl]="formControl"
      [cols]="to.cols"
      [rows]="to.rows"
      class="form-textarea"
      [ngClass]="inputClass"
      [class.is-invalid]="showError"
      [formlyAttributes]="field"
    >
    </textarea>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormlyFieldTextAreaComponent extends FieldType {

  defaultOptions = {
    templateOptions: {
      cols: 1,
      rows: 1,
    },
  };

  get inputClass(): string {
    return this.to.inputClass || '';
  }

}

