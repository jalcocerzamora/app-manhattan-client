import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-field-input',
  template: `
  <input type="type"
    [name]="key"
    [autocomplete]="inputAutocomplete"
    [formControl]="formControl"
    [formlyAttributes]="field"
    [ngClass]="inputClass"
    [class.is-invalid]="showError" class="w-full form-input" />
  `,
  styles: []
  ,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormlyFieldFileComponent extends FieldType {
  get inputClass(): string { return this.to.inputClass || ''; }
  get inputAutocomplete(): string { return this.to.inputAutocomplete || 'off'; }
}
