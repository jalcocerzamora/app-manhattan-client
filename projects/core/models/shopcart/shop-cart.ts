import { DatePipe } from '@angular/common';
import { ShopCartItem, IShopCartItem } from './shop-cart-item';
export interface IShopCart<T> {
  ReserveId?: number;
  ClientId?: number;
  Count: number;
  Items: Array<ShopCartItem<T>>;
  Total: number;
  Subtotal?: number;

  getTotal(): number;
}
export class ShopCart<T> { // implements IShopCart<T> {
  ReserveId?: number = null;
  ClientId?: number = null;
  Count: number = 0;
  Items: Array<ShopCartItem<T>> = new Array<ShopCartItem<T>>();
  Subtotal: number = 0;
  Total: number = 0;

  constructor(model: IShopCart<T> = null) {
    this.ReserveId  = (model && model.ReserveId ? model.ReserveId : null);
    this.ClientId   = (model && model.ClientId ? model.ClientId : null);
    this.Count      = (model && model.Count ? model.Count : 0);
    this.Items      = (model && model.Items ? model.Items : new Array<ShopCartItem<T>>());
    this.Subtotal   = (model && model.Subtotal ? model.Subtotal : 0);
    this.Total      = (model && model.Total ? model.Total : 0);
  }

  get getTotal(): number {
    return (this.Items.length > 0 ?
      this.Items
        .map(i => { const shopcartItem = new ShopCartItem<T>(i); return shopcartItem.getTotal; })
        .reduce((previous, current) => previous + current)
      :
      0
    );
  }
}

export interface IDeliveryContact {
  FirstName: string;
  LastName: string;
  CellPhone: number;
  Country?: string;
  Email: string;
}
export class DeliveryContact implements IDeliveryContact {
  FirstName: string;
  LastName: string;
  CellPhone: number;
  Email: string;
  Country?: string;

  constructor(){
    // this. = 0;
    // this.Items = new Array<ShopCartItem<T>>();
  }
}



export interface IDeliveryMethod {
  PlaceName: string;
  PostCode: number;
  Latitude: number;
  Longitude: number;

  toString(): string;
}
export class DeliveryMethod implements IDeliveryMethod {
  PlaceName: string;
  PostCode: number;
  Latitude: number;
  Longitude: number;

  constructor() {}

  public readonly toString = (): string => {
    return `${this.PlaceName}`;
  }
}

export interface IDeliveryTime {
  Date: Date;
  Schedule: Date;
}
export class DeliveryTime implements IDeliveryTime {
  Method?: number;
  Date: Date;
  Schedule: Date;

  constructor() {}

  get ScheduleFormat() {
    const date = new Date(Date.parse(`${this.Date} ${this.Schedule}`));
    const result = date.toLocaleString('es-MX', { hour: 'numeric', minute: 'numeric', hour12: true, /*timeZone: 'UTC',*/ });
    return date;
  }
}

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
  Method: number;

  CardHolder: string;
  AddressCountry: string;
  Currency: string;

  Brand: string;
  CardNumber: string;
  CardExpiry: string;
  CardCvc: string;
  PostalCode: number;
}
export class DeliveryPaymentMethod implements IDeliveryPaymentMethod {
  Method: PaymentMethodEnum;

  CardHolder: string;
  AddressCountry: string;
  Currency: string;

  Brand: string;
  CardNumber: string;
  CardExpiry: string;
  CardCvc: string;
  PostalCode: number;

  constructor() {}
}
