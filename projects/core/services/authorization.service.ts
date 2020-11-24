import { Injectable } from '@angular/core';
import { AuthGroup } from './authenticate/authorization.types';

@Injectable({ providedIn: 'root' })
export class AuthorizationService {
  permissions: Array<string>; // Store the actions for which this user has permission

  constructor(
    // private authorizationDataService: AuthorizationDataService
  ) { }

  hasPermission(authGroup: AuthGroup) {
      if (this.permissions && this.permissions.find(permission => {
              return permission === authGroup;
          })) {
          return true;
      }
      return false;
  }

  // This method is called once and a list of permissions is stored in the permissions property
  initializePermissions() {
      return new Promise((resolve, reject) => {
          // Call API to retrieve the list of actions this user is permitted to perform. (Details not provided here.)
          // In this case, the method returns a Promise, but it could have been implemented as an Observable
          // this.authorizationDataService.getPermissions()
          //     .then(permissions => {
          //         this.permissions = permissions;
          //         resolve();
          //     })
          //     .catch((e) => {
          //         reject(e);
          //     });
      });
  }
}
