import { Injectable } from '@angular/core';

import { environment } from 'projects/environments/environment';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';

import { ISubproductsWithCategory } from 'projects/core/models/db';
import { IPlacedOrder, PlacedOrder } from 'projects/core/models/db/placed-order';

const API_ENDPOINT: string = environment.BACKEND_ENDPOINT;
@Injectable({
  providedIn: 'root'
})
export class PlacedOrderService {
  private ROUTE = 'placed-order';
  private HTTP_OPTIONS = { headers: new HttpHeaders( { 'Content-Type': 'application/json', } ) };

  constructor(
    private http: HttpClient,
    // private socket: Socket
  ) { }

  private extractData(res: Response): string {
    const response = res;
    // const body = response.json();
    console.log(response);
    return '';
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
      return this.http.get<Array<ISubproductsWithCategory>>(API_ENDPOINT.concat('subproduct/all'))
      .pipe(
        // map(this.extractData(res)),
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

  Create(data: PlacedOrder): Observable<any> {
    const URL = API_ENDPOINT.concat(this.ROUTE);
    const BODY = JSON.stringify(data);
    return this.http.post(URL, BODY, this.HTTP_OPTIONS)
      .pipe(
        map(res => this.extractData),
        catchError(this.handleError)
      );
  }
}
