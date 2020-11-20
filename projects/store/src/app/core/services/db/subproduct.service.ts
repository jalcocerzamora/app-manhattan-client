import { Injectable } from '@angular/core';

import { environment } from 'projects/environments/environment';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { ISubproductsWithCategory } from '../../models/subproduct';
import { Socket } from 'ngx-socket-io';

const API_ENDPOINT: string = environment.BACKEND_ENDPOINT;

@Injectable({
  providedIn: 'root'
})
export class SubproductService {
  constructor(
    private http: HttpClient,
    // private socket: Socket
  ) { }

  private extractData(res: Response): any {
    const body = res;
    return body || { };
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.message}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  All(): Observable<any> {
    return this.http.get<Array<ISubproductsWithCategory>>(API_ENDPOINT.concat('subproduct/all'));
    // .pipe(
      // map(this.extractData),
      // catchError(this.handleError)
    // );
  }

  GetById(id: string): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('products/' + id));
    // .pipe(
      // map(this.extractData),
      // catchError(this.handleError)
    // );
  }
}
