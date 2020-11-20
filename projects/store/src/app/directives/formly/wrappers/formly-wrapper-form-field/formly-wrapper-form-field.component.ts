import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-wrapper-form-field',
  template: `
    <div class="form-group relative mb-5x" [class.has-error]="showError">
      <label *ngIf="to.label && to.hideLabel !== true" [ngClass]="to.labelClass" [attr.for]="id">
        {{ to.label }}
        <span *ngIf="to.required && to.hideRequiredMarker !== true">*</span>
      </label>
      <ng-template #fieldComponent></ng-template>
      <div *ngIf="showError" class="invalid-feedback absolute bottom-0x left-0x" [style.display]="'block'">
        <formly-validation-message [field]="field"></formly-validation-message>
      </div>
      <small *ngIf="to.description" class="form-text text-muted">{{ to.description }}</small>
    </div>
  `,
  styles: [
    '.form-group .form-control { margin-bottom: 1rem; }'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormlyWrapperFormFieldComponent extends FieldWrapper {

  get labelClass(): string {
    return this.to.labelClass || '';
  }

}
