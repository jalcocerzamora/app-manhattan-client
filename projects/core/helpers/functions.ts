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
