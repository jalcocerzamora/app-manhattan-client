import { Type } from '@angular/core';

export interface ICategory {
  id?: number;
  sort: number;
  title: string;
}

export class Category implements ICategory {
  id?: number;
  sort: number;
  title: string;
}
