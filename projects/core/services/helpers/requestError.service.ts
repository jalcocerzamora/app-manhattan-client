import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
    providedIn: 'root'
})
export class RequestErrorService {
    public static handleError(err: HttpErrorResponse): any {
        if (err.error instanceof ErrorEvent) {
            console.error('An error occurred:', err.error.message);
            return throwError(`An error occurred: ${err.error.message}`);
        } else if (typeof (err) === 'object') {
            console.error(`Backend returned code: ${err.status}, body was: ${err.message}`);
            return throwError(`Backend returned code: ${err.error.message}`);
        } else {
            console.error(err);
            return throwError(err);
        }

        return throwError('Something bad happened; please try again later.');
    }
}
