import { Type } from '@angular/core';
import { ITimestamps } from './timestamps';

export interface ICustomer {
  id?: number;
  firstname: string;
  lastname: string;
  cellphone?: number;
  country?: string;
  email: string;
}

export class Customer implements ICustomer, ITimestamps {
  id?: number;
  firstname: string;
  lastname: string;
  cellphone?: number;
  country?: string;
  email: string;

  createdAt?: string;
  updatedAt?: string;

  constructor(_firstname: string, _lastname: string, _email: string){
    this.firstname = _firstname;
    this.lastname = _lastname;
    this.email = _email;
  }
}
