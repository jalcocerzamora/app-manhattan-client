import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, APP_BASE_HREF } from '@angular/common';

import { HttpClient } from '@angular/common/http';

import { environment } from 'projects/environments/environment';

import { PopoverModule } from 'ngx-smart-popover';

// Translation
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from '../app-routing.module';

import { ComponentsModule } from '../components/components.module';

import { HomeComponent, MenuComponent } from './';
import { ShopcartComponent } from './shopcart/shopcart.component';

export function createTranslateLoader(http: HttpClient) {
  console.log(http, APP_BASE_HREF);
  return new TranslateHttpLoader(http, '/locale/', '.json');
}

// constructor(@Inject(APP_BASE_HREF) private baseHref:string) {
//   console.log(this.baseHref);
// }


@NgModule({
  declarations: [
    // NotFoundComponent,
    // NavbarComponent,
    // HeaderComponent,

    HomeComponent,
    MenuComponent,
    ShopcartComponent,
  ],
  imports: [
    CommonModule, AppRoutingModule,
    // FormsModule, ReactiveFormsModule,
    TranslateModule.forRoot({
      defaultLanguage: environment.language,
      loader: {
        provide: TranslateLoader,
        // useFactory: (http: HttpClient) => { return new TranslateHttpLoader(http); },
        useFactory: (createTranslateLoader),
        deps: [ HttpClient ]
      }
    }),
    ComponentsModule,
    PopoverModule

  ],
  exports: [
    // LoginComponent, RegisterComponent, VerifyEmailComponent, ForgotPasswordComponent,

    // NotFoundComponent,
    HomeComponent,
    MenuComponent,

    // ModalComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class PagesModule { }
