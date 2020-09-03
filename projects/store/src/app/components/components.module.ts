import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { environment } from 'projects/environments/environment';

import { AppRoutingModule } from './../app-routing.module';

import { PopoverModule } from 'ngx-smart-popover';

// Translation
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { NotFoundComponent } from './not-found/not-found.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';

import { MenuCategoryComponent } from './menu-category/menu-category.component';
import { MenuCategoryItemComponent } from './menu-category-item/menu-category-item.component';
import { ProductItemComponent } from './product-item/product-item.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../../locale/', '.json');
}

// import { TranslationComponent } from './translation/translation.component'

@NgModule({
  declarations: [
    NotFoundComponent,
    HeaderComponent,
    NavbarComponent,
    MenuCategoryComponent,
    MenuCategoryItemComponent,
    ProductItemComponent,
    // FooterComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AppRoutingModule,

    PopoverModule,
  ],
  exports: [
    HeaderComponent,
    NavbarComponent,

    MenuCategoryComponent,
    MenuCategoryItemComponent,
    ProductItemComponent,
    // FooterComponent,
  ]
})
export class ComponentsModule { }
