import { enableProdMode, LOCALE_ID } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from 'projects/environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule,
  {
  providers: [
    {
      provide: LOCALE_ID,
      useValue: environment.locale
    }
  ]
}).then(
  ref => {
    // Ensure Angular destroys itself on hot reloads.
    // if (window['ngRef']) {
    //   window['ngRef'].destroy();
    // }
    // // tslint:disable-next-line: no-string-literal
    // window['ngRef'] = ref;
  }
).catch(err => console.error(err));
