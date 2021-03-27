import { Type } from '@angular/core';
import { IProduct, Product } from './product';
import { ICategory } from './category';
import { isNullOrUndefined } from 'util';

export interface ISubproduct {
  id?: number;
  product_id: number;
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
  // tslint:disable-next-line: variable-name
  product_id: number;
  image: string;
  name: string;
  price: number;
  description: string;
  default: string;
  status: string;
  online: string;

  product: Product;

  get urlImage(): string {
    const product = (this.image && this.image !== null && this.image !== undefined ? '' : this.image.trim());
    return (product ? `/assets/images/menu/${product}` : '/assets/images/logo.png');
  }
}
