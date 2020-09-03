import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'projects/environments/environment';
import { AuthenticationService } from 'projects/core/services/authenticate/authentication.service';

const API_URL = environment.BACKEND_ENDPOINT;


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // add auth header with jwt if user is logged in and request is to api url
      const currentLogin = this.authenticationService.currentLoginValue;
      const isLoggedIn = currentLogin && currentLogin.Token;
      const isApiUrl = request.url.startsWith(API_URL);
      if (isLoggedIn && isApiUrl) {
          request = request.clone({
              setHeaders: {
                  Authorization: `Bearer ${currentLogin.Token}`
              }
          });
      }

      return next.handle(request);
  }
}
