import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { RequestCacheService } from './services/requestCache.service';
import { DirectivesModule } from './directives/directives.module';
import { AuthenticationService } from './services';
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
  ]
})
export class CoreModule { }
