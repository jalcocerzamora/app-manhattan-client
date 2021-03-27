import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import { AuthenticationService, RequestCacheService, MapBoxGLService } from '@core/services';
import { DirectivesModule } from '@core/directives/directives.module';
// import { HideIfUnauthorizedDirective } from './directives/hide-if-unauthorized.directive';
// import { DisableIfUnauthorizedDirective } from './directives/disable-if-unauthorized.directive';

@NgModule({
  // declarations: [HideIfUnauthorizedDirective, DisableIfUnauthorizedDirective],
  imports: [
    CommonModule,
    HttpClientModule,

    DirectivesModule,
  ],
  providers: [
    // RequestCacheService
    AuthenticationService,
    RequestCacheService,
    MapBoxGLService,
  ]
})
export class CoreModule { }
