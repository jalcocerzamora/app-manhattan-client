import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import aes from 'crypto-js/aes';

import { environment } from 'projects/environments/environment';
import { Login } from 'projects/core/models/db/index';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthGroup } from './authorization.types';

// import { AuthorizationDataService } from './authorization-data.service';

const API_URL: string = environment.BACKEND_ENDPOINT;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  permissions: Array<string>; // Store the actions for which this user has permission
  private currentLoginSubject: BehaviorSubject<Login> = new BehaviorSubject<Login>(null);
  public currentLogin: Observable<Login> = this.currentLoginSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
  ) {
    const usr = localStorage.getItem('Token') || localStorage.getItem('currentLogin') || environment.TOKEN_API;
    let USR_PARSE = null;
    try { USR_PARSE = JSON.parse(usr); } catch (e) { USR_PARSE = null; }
    this.currentLoginSubject = new BehaviorSubject<Login>(USR_PARSE);
    this.currentLogin = this.currentLoginSubject.asObservable();
  }

  public get currentLoginValue(): Login {
    return this.currentLoginSubject.value;
  }

  login(username: string, password: string) {
    // console.log('AuthenticationService.login');

    const options = { headers: new HttpHeaders( { 'Content-Type': 'application/json', /*Origin: window.location.origin*/ } ) };
    const URL = API_URL.concat('authenticate');

    if (this.currentLoginValue) {
      // tslint:disable-next-line: deprecation
      const obs1 = Observable.create((observer) => {
        observer.next(this.currentLoginValue);
        observer.complete();
      });

      const obs2 = of(this.currentLoginValue);

      return obs2;
    }
    const confirmPassword = this.router.url.includes('login') ? password : environment.BACKEND_PASSWORD;
    password = aes.encrypt(confirmPassword, environment.PRIVATE_CRYPTO).toString();

    return this.http.post<Login>(API_URL.concat('authenticate'), { username, password }, options)
      .do(req => this.setSession(req), catchError(this.handleError1));
      // .pipe(
      //   map(res => this.setSession(res)),
      //   catchError(this.handleError1),
      //   catchError(this.handleError2)
      // );
  }

  logout() {
    // console.log('AuthenticationService.logout');

    // remove USER from local storage to log USER out
    localStorage.removeItem('currentLogin');
    this.currentLoginSubject.next(null);
  }

  private setSession(request) {
    // console.log('AuthenticationService.setSession', request);

    // login successful if there's a jwt token in the response
    if (request && request.Token && request.Role) {
      // store USER details and jwt token in local storage to keep USER logged in between page refreshes
      localStorage.setItem('currentLogin', JSON.stringify(request));
      this.currentLoginSubject.next(request);
    } else {
      delete request.Username;
      localStorage.setItem('Token', JSON.stringify(request));
      this.currentLoginSubject.next(request);
    }
    // const expiresAt = moment().add(authResult.expiresIn,'second');

    // localStorage.setItem('id_token', authResult.idToken);
    // localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }

  private handleError1(error) {
    console.log('AuthenticationService.handleError1');
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  private handleError2(error: HttpErrorResponse): any {
    console.log('AuthenticationService.handleError2');
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.message}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
