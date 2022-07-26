import { Directive } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: 'input[type=file]',
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '(change)': 'onChange($event.target.files)',
    '(blur)': 'onTouched()',
  },
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileValueAccessorDirective,
      multi: true
    }
  ]
})
export class FileValueAccessorDirective implements ControlValueAccessor {
  value: any;
  onChange = () => {};
  onTouched = () => {};

  writeValue() {}
  registerOnChange(fn: any){ this.onChange = fn; }
  registerOnTouched(fn: any){ this.onTouched = fn; }
}
