import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-field-quantity',
  template: `
    <div class="bg-white relative flex flex-row w-full h-8 rounded-sm border">
      <input
        [type]="type"
        [formControl]="formControl"
        [formlyAttributes]="field"
        readonly
        class="bg-transparent outline-none focus:outline-none text-center w-full font-semibold text-md hover:text-black hover:pointer-events-nonex focus:text-black md:text-basecursor-default flex items-center text-gray-700">
      <button (click)="decrement()" type="button" class="bg-gray-700 text-white hover:bg-gray-600 h-full w-12 border border-r-0 border-white rounded-l cursor-pointer outline-none">
        <fa-icon icon="minus"></fa-icon>
      </button>
      <button (click)="increment()" type="button"class="bg-gray-700 text-white hover:bg-gray-600 h-full w-12 border border-white rounded-r cursor-pointer">
        <fa-icon icon="plus"></fa-icon>
      </button>
    </div>
 `,
  // styleUrls: ['./formly-field-quantity.component.scss']
})
export class FormlyFieldQuantityComponent extends FieldType {
  get type() {
    return this.to.type || 'number';
  }

  decrement() {
    let value = this.formControl.value;
    if (value > this.field.templateOptions.min) { value--; }
    this.formControl.setValue(value);
  }

  increment() {
    let value = this.formControl.value;
    if (value < this.field.templateOptions.max) { value++; }
    this.formControl.setValue(value);
  }

}
