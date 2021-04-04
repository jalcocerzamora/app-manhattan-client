import { catchError, map } from 'rxjs/operators';
import { environment } from 'projects/environments/environment';
import { HANDLE_ERROR_REQUEST } from '@core/helpers/functions';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISubproductsWithCategory } from '@core/models/db';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
// import { Http, Response } from '@angular/http';

// import { RequestErrorService } from '@core/services/helpers/requestError.service';

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
    console.log('extractData.body', body);
    console.log('extractData.body.data', body.data);
    return body.data || body || { };
  }

  All(): Observable<any> {
      return this.http.get<Array<ISubproductsWithCategory>>(API_ENDPOINT.concat('menu'))
      .pipe(
        map(this.extractData),
        catchError(HANDLE_ERROR_REQUEST)
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
