export const environment = {
  production: true,

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
  // SOCKET_ENDPOINT: 'https://api-manhattan.azurewebsites.net:3456/',
  // BACKEND_ENDPOINT: 'https://api-manhattan.azurewebsites.net/v1/',

  BACKEND_USERNAME: 'manhattan',
  BACKEND_PASSWORD: 'manhattan-prod',

  PRIVATE_CRYPTO: 'pc_test_5k6DHO',

  MAPBOX: {
    ACCESS_TOKEN: 'pk.eyJ1IjoiamFsY29jZXJ6IiwiYSI6ImNrZnhqcWZsbzAwMnEycnBqOHRoYzMyOG0ifQ._n_2a1STgpk1kDVdRPJxgw'
  }
};
