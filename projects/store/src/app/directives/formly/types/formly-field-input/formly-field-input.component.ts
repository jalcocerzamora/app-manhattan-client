import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-field-input',
  template: `
    <!-- // [autocomplete]="'new_' + key" -->
    {{ ComponentConstruct }}
    <input
      *ngIf="type !== 'number'; else numberTmp"
      [type]="type"
      [name]="key"
      autocomplete="off"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [ngClass]="inputClass"
      [class.is-invalid]="showError"
      class="w-full form-control"
      [attr.list]="inputDatalist"
    />

    <datalist *ngIf="inputDatalist" [id]="inputDatalist"></datalist>

    <ng-template #numberTmp>
      <input
        type="number"
        [name]="key"
        [autocomplete]="'new_' + key"
        [formControl]="formControl"
        [formlyAttributes]="field"
        [ngClass]="inputClass"
        [class.is-invalid]="showError"
        class="form-control"
      />
    </ng-template>
  `,
  styles: [
    'input[type="date"]::-webkit-calendar-picker-indicator { position: absolute; right: 0; }'
  ]
  ,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormlyFieldInputComponent extends FieldType {
  get type() { return this.to.type || 'text'; }

  get inputClass(): string { return this.to.inputClass || ''; }

  get inputDatalist(): string { return this.to.inputDatalist || ''; }

  get ComponentConstruct(): string {
    // console.log(this);
    return '';
  };

  // constructor() {
  //   super();
  //   console.log('FormlyFieldInputComponent.constructor', this);
  // }
}
