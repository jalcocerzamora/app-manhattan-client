import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

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
  private currentLoginSubject: BehaviorSubject<Login>;
  public currentLogin: Observable<Login>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    // private authorizationDataService: AuthorizationDataService
  ) {
    const usr = localStorage.getItem('Token') || localStorage.getItem('currentLogin');
    this.currentLoginSubject = new BehaviorSubject<Login>(JSON.parse(usr));
    this.currentLogin = this.currentLoginSubject.asObservable();
  }

  public get currentLoginValue(): Login {
    return this.currentLoginSubject.value;
  }

  login(username: string, password: string) {
    const options = {}; // { headers: new HttpHeaders( { 'Content-Type': 'application/json', Origin: window.location.origin } ) };
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

    return this.http.post<Login>(API_URL.concat('authenticate'), { username, password }, options)
      .pipe(
        map(login => {
          // login successful if there's a jwt token in the response
          if (login && login.Token && login.Role) {
            // store USER details and jwt token in local storage to keep USER logged in between page refreshes
            localStorage.setItem('currentLogin', JSON.stringify(login));
            this.currentLoginSubject.next(login);
          } else {
            delete login.Username;
            localStorage.setItem('Token', JSON.stringify(login));
            this.currentLoginSubject.next(login);
          }

          return login;
        }),
        catchError(this.handleError1),
        catchError(this.handleError2)
      );
  }

  logout() {
    // remove USER from local storage to log USER out
    localStorage.removeItem('currentLogin');
    this.currentLoginSubject.next(null);
  }

  private handleError1(error) {
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
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.message}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
