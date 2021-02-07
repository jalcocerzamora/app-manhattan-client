import { Injectable } from '@angular/core';

import { environment } from 'projects/environments/environment';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';

import { ISubproductsWithCategory } from 'projects/core/models/db';

const API_ENDPOINT: string = environment.BACKEND_ENDPOINT;
@Injectable({
  providedIn: 'root'
})
export class SubproductService {
  constructor(
    private http: HttpClient,
    // private socket: Socket
  ) { }

  private extractData(res: any): any {
    const body = res;
    return body.data || { };
  }

  private handleError(err: HttpErrorResponse): any {
    if (err.error instanceof ErrorEvent) {
      console.error('An error occurred:', err.error.message);
    } else if (typeof(err) === 'object') {
      console.error(`Backend returned code ${err.status}, body was: ${err.message}`);
    } else {
      console.error(err);
    }

    return throwError('Something bad happened; please try again later.');
  }

  All(): Observable<any> {
      return this.http.get<Array<ISubproductsWithCategory>>(API_ENDPOINT.concat('menu'))
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }

  GetById(id: string): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('products/' + id));
    // .pipe(
      // map(this.extractData),
      // catchError(this.handleError)
    // );
  }
}
