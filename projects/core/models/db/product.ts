import { ICategory, Category } from './category';
import { Type } from '@angular/core';

export interface IProduct {
  id?: number;
  category_id: number;
  image: string;
  name: string;
  description: string;
  status: boolean;
  online: boolean;

  category: ICategory;
}

export class Product implements IProduct {
  id?: number;
  category_id: number;
  image: string;
  name: string;
  description: string;
  status: boolean;
  online: boolean;

  category: Category;

  constructor(_category_id: number, _image: string, _name: string, _description: string, _status: boolean, _online: boolean, _category: Category){
    this.category_id = _category_id;
    this.image = _image;
    this.name = _name;
    this.description = _description;
    this.status = _status;
    this.online = _online;
    this.category = _category;
  }
}
