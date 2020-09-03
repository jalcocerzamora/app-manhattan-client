import { NgModule, LOCALE_ID } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { environment } from 'projects/environments/environment';

// Modules
// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { PopoverModule } from 'ngx-smart-popover';

// Translation
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ServiceWorkerModule } from '@angular/service-worker';

// Components
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { ComponentsModule } from './components/components.module';

// Locales
// import (environment.locale.includes('es') ? '@angular/common/locales/es' : '@angular/common/locales/en');
import '@angular/common/locales/global/es';
import { JwtInterceptor, ErrorInterceptor } from 'projects/core/helpers';
import { AuthenticationService } from 'projects/core/services/authenticate/authentication.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule, AppRoutingModule, HttpClientModule, HttpClientModule,
    PopoverModule,
    PagesModule,
    ComponentsModule
  ],
  providers: [
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
