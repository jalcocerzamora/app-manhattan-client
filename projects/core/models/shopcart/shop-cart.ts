import { Customer, ICustomer } from './../db';

import { DatePipe } from '@angular/common';
import { ShopCartItem, IShopCartItem } from './shop-cart-item';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

//#region SHOPCART
export interface IShopCart<T> {
  ReserveId?: number;
  ClientId?: number;
  Count: number;
  Items: Array<ShopCartItem<T>>;
  Total: number;
  Subtotal?: number;

  // getTotal: number;
}
export class ShopCart<T> implements IShopCart<T> {
  ReserveId?: number = undefined;
  ClientId?: number = undefined;
  Count: number = 0;
  Items: Array<ShopCartItem<T>> = new Array<ShopCartItem<T>>();
  Subtotal: number = 0;

  get Total(): number {
    return (this.Items.length > 0 ?
      this.Items
        .map(i => { const shopcartItem = new ShopCartItem<T>(i); return shopcartItem.Total; })
        .reduce((previous, current) => previous + current)
      :
      0
    );
  }

  constructor(model: IShopCart<T>) {
    this.ReserveId  = model.ReserveId ? model.ReserveId : 0;
    this.ClientId   = model.ClientId ? model.ClientId : 0;
    this.Count      = model.Count;
    this.Items      = model.Items;
    this.Subtotal   = model.Subtotal ? model.Subtotal : 0;
  }
}
//#endregion

//#region CONTACT
export interface IDeliveryContact {
  firstname: string;
  lastname: string;
  cellphone: number;
  country?: string;
  email: string;
}

// export class DeliveryContact implements IDeliveryContact {
export class DeliveryContact extends Customer {
  // firstname: string;
  // lastname: string;
  // cellphone: number;
  // email: string;
  // country?: string;

  // constructor() { // firstname: string, lastname: string, cellPhone: number, email: string, country: string
    // do stuff
    // this.FirstName = firstname;
    // this.LastName = lastname;
    // this.CellPhone = cellPhone;
    // this.Email = email;
    // this.Country = country;
  // }
}
//#endregion

//#region METHOD
export interface IDeliveryMethod {
  PlaceName: string;
  PostCode: number;
  Latitude: number;
  Longitude: number;

  toString(): string;
}

// export class DeliveryMethod implements IDeliveryMethod {
export class DeliveryMethod implements IDeliveryMethod {
  PlaceName: string;
  PostCode: number;
  Latitude: number;
  Longitude: number;

  constructor(_placeName: string, _postCode: number, _latitude: number, _longitude: number) {
    this.PlaceName = _placeName;
    this.PostCode = _postCode;
    this.Latitude = _latitude;
    this.Longitude = _longitude;
  }

  public readonly toString = (): string => {
    return `${this.PlaceName}`;
  }
}
//#endregion

//#region TIME
export interface IDeliveryTime {
  Date: Date;
  Schedule: Date;
}
export class DeliveryTime implements IDeliveryTime {
  Method?: number;
  Date: Date;
  Schedule: Date;

  constructor(_date: Date, _schedule: Date) {
    this.Date = _date;
    this.Schedule = _schedule;
  }

  get ScheduleFormat() {
    const date = new Date(Date.parse(`${this.Date} ${this.Schedule}`));
    const result = date.toLocaleString('es-MX', { hour: 'numeric', minute: 'numeric', hour12: true, /*timeZone: 'UTC',*/ });
    return date;
  }
}
//#endregion

//#region PAYMENT
export enum PaymentMethodEnum {
  Cash              = 0,
  Card              = 1,
  Transfer          = 2,
  Paypal            = 3,
  Alipay            = 4,
  Bancontact        = 5,
  EPS               = 6,
  iDEAL             = 7,
  Giropay           = 8,
  Multibanco        = 9,
  Przelewy24        = 10,
  SEPA_Direct_Debit = 11,
  SOFORT            = 12,
  WeChat_Pay        = 13,
  BECS_Direct_Debit = 14,
}
export interface IDeliveryPaymentMethod {
  Method?: number | undefined;

  CardHolder: string;
  AddressCountry: string;
  Currency: string;

  Brand?: string;
  CardNumber?: string;
  CardExpiry?: string;
  CardCvc?: string;
  PostalCode?: number;
}
export class DeliveryPaymentMethod implements IDeliveryPaymentMethod {
  Method?: PaymentMethodEnum | undefined = undefined;

  CardHolder: string;
  AddressCountry: string;
  Currency: string;

  Brand: string;
  CardNumber: string;
  CardExpiry: string;
  CardCvc: string;
  PostalCode: number;

  constructor(_method: PaymentMethodEnum | undefined, _cardHolder: string, _addressCountry: string, _currency: string, _brand: string, _cardNumber: string, _cardExpiry: string, _cardCvc: string, _postalCode: number) {
    this.Method = _method;
    this.CardHolder = _cardHolder;
    this.AddressCountry = _addressCountry;
    this.Currency = _currency;
    this.Brand = _brand;
    this.CardNumber = _cardNumber;
    this.CardExpiry = _cardExpiry;
    this.CardCvc = _cardCvc;
    this.PostalCode = _postalCode;
  }
}
//#endregion