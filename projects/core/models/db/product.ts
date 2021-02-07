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
}
