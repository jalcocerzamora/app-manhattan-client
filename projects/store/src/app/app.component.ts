import { Component, AfterViewInit, ElementRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { environment } from 'projects/environments/environment';

import { TranslateService } from '@ngx-translate/core';
import { AuthGuard } from 'projects/core/helpers';

import { AuthenticationService } from 'projects/core/services/authenticate/authentication.service';
import { Router } from '@angular/router';
import {  } from './core/services/db/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'store';

  constructor(
    private router: Router,
    private authGuard: AuthGuard,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.login(environment.BACKEND_USERNAME, environment.BACKEND_PASSWORD).toPromise().finally();
  }
}
