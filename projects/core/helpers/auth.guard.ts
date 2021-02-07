import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Projects } from 'projects/core/models/projects.enum';

import { AuthenticationService } from 'projects/core/services/authenticate/authentication.service';
import { AuthorizationService } from '../services/authorization.service';
import { AuthGroup } from '../services/authenticate/authorization.types';

class UserToken { }
class Permissions {
  canActivate(user: UserToken, id: string): boolean {
    return true;
  }
}

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {
  protected CurrentLogin: any = null;

  constructor(
    private router: Router,
    // private permissions: Permissions,
    // private currentUser: UserToken,
    private authenticationService: AuthenticationService,
    protected authorizationService: AuthorizationService
  ) {
    // console.log('AuthGuard.constructor');
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // console.log('AuthGuard.canActivate');

    // return this.permissions.canActivate(this.currentUser, route.params.id);
    // return this.hasRequiredPermission(this.currentUser, route.params.id);

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

    // not logged in so redirect to login page with the return url
    const urlRedirect = (route.data.project === Projects.BACKOFFICE ? 'login' : '/');
    this.router.navigate([urlRedirect], { queryParams: { returnUrl: state.url } });
    return false;
  }

  protected hasRequiredPermission(authGroup: AuthGroup): Promise<boolean> | boolean {
    // console.log('canActivate.hasRequiredPermission');

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
