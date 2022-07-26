// import { Type } from '@angular/core';
import { IProduct, Product } from './product';
import { ICategory } from './category';
// import { isNullOrUndefined } from 'util';

export interface ISubproduct {
  id?: number;
  product_id: number;
  image: string;
  name: string;
  price: number;
  description: string;
  default: boolean;
  status: boolean;
  online: boolean;

  product?: IProduct;
}

export interface ISubproductsWithCategory {
  Category: ICategory;
  Products: Array<ISubproduct>;
}

export class Subproduct implements ISubproduct {
  id?: number;
  product_id: number;
  image: string;
  name: string;
  price: number;
  description: string;
  default: boolean;
  status: boolean;
  online: boolean;

  product: Product;

  get urlImage(): string {
    const product = (this.image && this.image !== null && this.image !== undefined ? '' : this.image.trim());
    return (product ? `/assets/images/menu/${product}` : '/assets/images/logo.png');
  }

  constructor(_product_id: number, _image: string, _name: string, _price: number, _description: string, _default: boolean, _status: boolean, _online: boolean, _product: Product){
      this.product_id = _product_id;
      this.image = _image;
      this.name = _name;
      this.price = _price;
      this.description = _description;
      this.default = _default;
      this.status = _status;
      this.online = _online;    
      this.product = _product;
  }
}
