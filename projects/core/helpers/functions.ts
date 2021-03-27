import { environment } from 'projects/environments/environment';

export function GET_URL_ASSETS(pathImage: string = null) {
    let result = window.location.host;
    const origin = window.location.origin;

    if (result.includes('github.io')) {
        result = origin.concat('/app-manhattan-client');
        result = (pathImage ? result.concat(environment.PATH_ASSETS_IMAGES_MENU).concat(pathImage) : result.concat(environment.PATH_ASSETS_IMAGES_MENU_LOGO));
    } else {
        result = origin.concat(environment.PATH_ASSETS_IMAGES_MENU);
        result = (pathImage ? result.concat(pathImage) : environment.PATH_ASSETS_IMAGES_MENU_LOGO);
    }

    return result;
}

import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';

export function HANDLE_ERROR_REQUEST(err: HttpErrorResponse): any {
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
