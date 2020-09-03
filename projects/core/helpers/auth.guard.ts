import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from 'projects/core/services/authenticate/authentication.service';
import { AuthorizationService } from '../services/authorization.service';
import { AuthGroup } from '../services/authenticate/authorization.types';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {
  protected CurrentLogin: any = null;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    protected authorizationService: AuthorizationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // return this.hasRequiredPermission(route.data['auth']);

    const currentLogin = this.authenticationService.currentLoginValue;
    if (currentLogin) {
      // check if route is restricted by role
      if (route.data.roles && route.data.roles.indexOf(currentLogin.Role) === -1) {
        // role not authorised so redirect to home page
        this.router.navigate(['/']);
        return false;
      }

      // authorised so return true
      return true;
    }

    if (this.CurrentLogin){

    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  protected hasRequiredPermission(authGroup: AuthGroup): Promise<boolean> | boolean {
    // If user’s permissions already retrieved from the API
    if (this.authorizationService.permissions) {
        if (authGroup) {
            return this.authorizationService.hasPermission(authGroup);
        } else {
            return this.authorizationService.hasPermission(null);
        }
    } else {
        // Otherwise, must request permissions from the API first
        const promise = new Promise<boolean>((resolve, reject) => {
            this.authorizationService.initializePermissions()
                .then(() => {
                    if (authGroup) {
                        resolve(this.authorizationService.hasPermission(authGroup));
                   } else {
                        resolve(this.authorizationService.hasPermission(null));
                    }
                }).catch(() => {
                    resolve(false);
                });
        });
        return promise;
    }
}
}
