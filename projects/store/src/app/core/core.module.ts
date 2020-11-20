import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { Category, ICategory, Product, IProduct } from 'projects/core/models/db';
import { IShopCart } from 'projects/core/models/shopcart';

@NgModule(
  {
    declarations: [],
    imports: [
      CommonModule, HttpClientModule
    ],
    exports: [

    ]
  }
)
export class CoreModule {
  // constructor(@Optional() @SkipSelf() core: CoreModule) {
  //   if (core) {
  //     throw new Error('You should import core module only in the root module');
  //   }
  // }
}
