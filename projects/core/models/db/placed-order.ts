import { ICategory, Category } from './category';
import { Type } from '@angular/core';

export interface IPlacedOrder {
  id?: number;
  order_time?: string,
  estimated_delivery_time?: string,
  food_ready?: string,
  actual_delivery_time?: string,
  delivery_address_id?: number,
  customer_id?: number,
  subtotal: number,
  discount: number,
  total: number,
  comment?: string,

  // address: IC;
  // customer: ICustomer;
}

export class PlacedOrder implements IPlacedOrder {
  id?: number;
  order_time?: string = null;
  estimated_delivery_time?: string = null;
  food_ready?: string= null;
  actual_delivery_time?: string= null;
  delivery_address_id?: number= null;
  customer_id?: number = null;
  subtotal: number = 0;
  discount: number = 0;
  total: number = 0;
  comment?: string;
}
