import { Injectable } from '@angular/core';

import { ShopCart, ShopCartItem } from 'projects/core/models/shopcart';

@Injectable({
  providedIn: 'root'
})
export class ShopCartService<T> {
  private ShopCart: ShopCart<T> = new ShopCart<T>(null);

  public get GetCount(): number {
    return this.ShopCart.Count;
  }

  public get GetTotal(): number {
    console.log(this.GetShopCart);
    return this.ShopCart.Items.length > 0 ?
      this.ShopCart.Items.map(i => (i.Price * i.Quantity)).reduce((previous, current) => previous + current, 0)
      :
      0;
  }

  public get GetShopCart(): ShopCart<T> {
    return this.ShopCart;
  }

  public get GetItems(): Array<ShopCartItem<T>> {
    let result = null;
    result = this.GetShopCart.Items;
    return result;
  }

  public get GetAny(): boolean {
    return (this.ShopCart.Items ? this.ShopCart.Items.length > 0 : false);
  }

  constructor() {
    this.Update();
  }

  public Update() {
    if (localStorage.getItem('Cart')) {
      const ls = JSON.parse(localStorage.getItem('Cart'));
      const shopcart = new ShopCart<T>(ls);
      this.ShopCart = shopcart;
    } else {
      this.ShopCart = new ShopCart<T>(null);
      localStorage.setItem('Cart', JSON.stringify(this.ShopCart));
    }
    // console.log('ShopCartService.Update.localstorage.set', this.ShopCart);
  }

  public AddItem(shopCartItem: ShopCartItem<T>) {
    // console.log('ShopCartService.AddItem', this.GetItems, shopCartItem);
    const Exist = this.GetItems.find(i => i.Id === shopCartItem.Id);

    let currentIndex = this.ShopCart.Items.length;

    if (!Exist) {
      shopCartItem.Item = currentIndex++;
      this.ShopCart.Items.push(shopCartItem);
      this.ShopCart.Count = this.ShopCart.Items.length;
      localStorage.setItem('Cart', JSON.stringify(this.ShopCart));
      return;
    }
    Exist.Quantity = shopCartItem.Quantity;
    this.ShopCart.Count = this.ShopCart.Items.length;
    localStorage.setItem('Cart', JSON.stringify(this.ShopCart));
  }

  public RemoveItem(shopCartItemId: number) {
    console.log('ShopCartService.RemoveItem', this.GetItems, shopCartItemId);
    const Exist = this.GetItems.find(i => i.Id === shopCartItemId);

    if (Exist) {
      this.GetItems.splice(this.GetItems.indexOf(Exist), 1);
      this.ShopCart.Count = this.ShopCart.Items.length;
      localStorage.setItem('Cart', JSON.stringify(this.ShopCart));
      return;
    }
  }

  public FoundItem(idItem: number) {
    let result: ShopCartItem<T> = new ShopCartItem<T>();
    if (this.GetAny) {
      const found = this.GetItems.find(i => i.Id === idItem);
      if (found) {
        result = found;
      }
    }

    return result;
  }

  public Clear(): void {
    localStorage.removeItem('Cart');
    this.ShopCart = new ShopCart<T>();
  }
}
