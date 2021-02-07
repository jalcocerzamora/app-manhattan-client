import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-wrapper-form-addons',
  templateUrl: './formly-wrapper-form-addons.component.html',
  styleUrls: ['./formly-wrapper-form-addons.component.scss'],
})
export class FormlyWrapperFormAddonsComponent extends FieldWrapper {
  addonRightClick($event: any) {
    if (this.to.addonRight.onClick) {
      this.to.addonRight.onClick(this.to, this, $event);
    }
  }

  addonLeftClick($event: any) {
    if (this.to.addonLeft.onClick) {
      this.to.addonLeft.onClick(this.to, this, $event);
    }
  }
}
