import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'projects/environments/environment';
import { BaseService } from './base';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_ENDPONIT: string = environment.BACKEND_ENDPOINT;
  private httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type':  'application/json',
      }
    )
  };

  constructor(
    private http: HttpClient,
  ) { }

  Authenticate(): Observable<any> {
    const user = { username: environment.BACKEND_USERNAME, password: environment.BACKEND_PASSWORD };
    return this.http.post(this.API_ENDPONIT.concat('user'), JSON.stringify(user), this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error) {
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
}
