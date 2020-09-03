import { Type } from '@angular/core';
import { IProduct, Product } from './product';
import { ICategory } from './category';
import { isNullOrUndefined } from 'util';

export interface ISubproduct {
  id?: number;
  productId: number;
  image: string;
  name: string;
  price: number;
  description: string;
  default: string;
  status: string;
  online: string;

  product: IProduct;
}

export interface ISubproductsWithCategory {
  Category: ICategory;
  Products: Array<ISubproduct>;
}

export class Subproduct implements ISubproduct {
  id?: number;
  productId: number;
  image: string;
  name: string;
  price: number;
  description: string;
  default: string;
  status: string;
  online: string;

  product: Product;

  get urlImage(): string {
    // tslint:disable-next-line: deprecation
    const product = (isNullOrUndefined(this.image) ? '' : this.image.trim());
    console.log(product);
    return (product ? `/assets/images/menu/${product}` : '/assets/images/logo.png');
  }
}
