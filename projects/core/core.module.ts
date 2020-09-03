import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { HideIfUnauthorizedDirective } from './directives/hide-if-unauthorized.directive';
import { DisableIfUnauthorizedDirective } from './directives/disable-if-unauthorized.directive';

@NgModule({
  declarations: [HideIfUnauthorizedDirective, DisableIfUnauthorizedDirective],
  imports: [
    CommonModule,

    HttpClientModule
  ]
})
export class CoreModule { }
