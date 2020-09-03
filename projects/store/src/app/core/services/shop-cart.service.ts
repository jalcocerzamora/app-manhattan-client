import { Injectable } from '@angular/core';

import { ShopCart } from 'src/app/models/shop-cart';
import { ShopCartItem } from 'src/app/models/shop-cart-item';

@Injectable({
  providedIn: 'root'
})
export class ShopCartService {
  private ShopCart: ShopCart = { Count: 0, Items: new Array<ShopCartItem>() }

  public get GetTotal(): number {
    return this.ShopCart.Items.map(i => i.Pizza.Subtotal).reduce((previous, current) => previous + current)
  }

  public get GetShopCart(): ShopCart {
    return this.ShopCart;
  }

  public get GetItems(): Array<ShopCartItem> {
    return ( this.GetShopCart.Items.length > 1 ?
      this.ShopCart.Items.sort((first, second) => {
        return first.Item - second.Item
      }) :
      this.GetShopCart.Items);
  }

  public get GetAny(): boolean {
    return this.ShopCart.Items.length > 0;
  }

  constructor() {
    this.Update();
  }

  public Update() {
    if (localStorage.getItem('Cart')) {
      this.ShopCart = JSON.parse(localStorage.getItem('Cart')) as ShopCart;
    } else {
      this.ShopCart = { Count: 0, Items: new Array<ShopCartItem>() };
      localStorage.setItem('Cart', JSON.stringify(this.ShopCart));
    }
  }

  public AddItem(shopCartItem: ShopCartItem) {
    const Exist = this.GetItems.find(
      ({Pizza}) => {
        let result = (
          Pizza.Size['Key'] ===shopCartItem.Pizza.Size['Key'] &&
          Pizza.Sauce['Key'] === shopCartItem.Pizza.Sauce['Key'] &&
          Pizza.Dough['Key'] === shopCartItem.Pizza.Dough['Key'] &&
          JSON.stringify(Pizza.Ingredients.map(i => i['Key'])) === JSON.stringify(shopCartItem.Pizza.Ingredients.map(i => i['Key']))
        );
        return result;
      }
    )

    let currentIndex = this.ShopCart.Items.length
    if (!Exist) {
      shopCartItem.Item = currentIndex++;
      this.ShopCart.Items.push({ ...shopCartItem });
      console.debug(this.ShopCart)
      localStorage.setItem('Cart', JSON.stringify(this.ShopCart));
      this.ShopCart.Count = this.ShopCart.Items.length
      return;
    }
    Exist.Pizza.Number += 1;
    this.ShopCart.Count = this.ShopCart.Items.length
    localStorage.setItem('Cart', JSON.stringify(this.ShopCart));
  }

  public SetItemKey(indexItem: number, keyItem: string) {
    this.ShopCart.Items[indexItem].Pizza.Key = keyItem
  }

  public Clear(): void {
    localStorage.removeItem('Cart')
    this.ShopCart = { Count: 0, Items: new Array<ShopCartItem>() }
  }
}
