import { environment } from 'projects/environments/environment';

export function GET_URL_ASSETS(pathImage: string = null) {
    const origin = window.location.origin;

    const generateURL = (pathURL) => {
        const HOST = window.location.origin;
        const HREF = window.location.href;
        return (
            environment.production ?
            (
                pathURL !== null ?
                (
                    (HOST.includes('github')) ? HREF.replace('menu', '').concat(environment.PATH_ASSETS_IMAGES_MENU).concat(pathURL) :  HOST.concat(environment.PATH_ASSETS_IMAGES_MENU).concat(pathURL)
                )
                :
                (
                    (HOST.includes('github')) ? HREF.replace('menu', '').concat(environment.PATH_ASSETS_IMAGES_MENU_LOGO) : HOST.concat(environment.PATH_ASSETS_IMAGES_MENU_LOGO)
                )
            )
            :
            (
                pathURL !== null ?
                (
                    HOST.concat(environment.PATH_ASSETS_IMAGES_MENU).concat(pathURL)
                )
                :
                (
                    environment.PATH_ASSETS_IMAGES_MENU_LOGO
                )
            )
        );
    };
    return generateURL(pathImage);
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
