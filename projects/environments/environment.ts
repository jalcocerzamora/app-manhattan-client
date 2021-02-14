// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  language: 'es',
  locale: 'es-MX',
  currency: 'MXN',

  PATH_ASSETS_IMAGES_MENU_LOGO: '/assets/images/logo-min.png',
  PATH_ASSETS_IMAGES_MENU: '/assets/images/menu/',

  TOKEN_API: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJ1c2VybmFtZSI6Im1hbmhhdHRhbiIsImVtYWlsIjoiamFsY29jZXJ6YW1vcmFAZ21haWwuY29tIn0sImlhdCI6MTYwNjcwMDk3OX0.NYyJyrC0riLa7fEBrnh1wBidFQxeZ01CsljEbyPDheY',

  // HEROKU
  SOCKET_ENDPOINT: 'https://app-manhattan-api.herokuapp.com:3456/',
  BACKEND_ENDPOINT: 'https://app-manhattan-api.herokuapp.com/api/',

  // AZURE
  // SOCKET_ENDPOINT: 'https://api-manhattan.azurewebsites.net/:3456/',
  // BACKEND_ENDPOINT: 'https://api-manhattan.azurewebsites.net/v1/',

  // SOCKET_ENDPOINT: 'https://localhost:3456/',
  // BACKEND_ENDPOINT: 'https://localhost:3456/api/',

  BACKEND_USERNAME: 'manhattan',
  BACKEND_PASSWORD: 'manhattan-prod',

  PRIVATE_CRYPTO: 'pc_test_5k6DHO',

  MAPBOX: {
    ACCESS_TOKEN: 'pk.eyJ1IjoiamFsY29jZXJ6IiwiYSI6ImNrZnhqcWZsbzAwMnEycnBqOHRoYzMyOG0ifQ._n_2a1STgpk1kDVdRPJxgw'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
