export interface IShopCartItem<T> {
  Item?: number;
  Id?: number;
  Price?: number;
  Quantity?: number;
  Total?: number;

  Data?: T;

   readonly getTotal?: number;
}

export class ShopCartItem<T> implements IShopCartItem<T> {
  public Item: number;
  public Id: number;
  public Price: number;
  public Quantity: number;
  public Total: number;

  public Data: T;

  constructor(model: ShopCartItem<T>) {
    this.Id = (model && model.Id ? model.Id : null);
    this.Price = (model && model.Price ? model.Price : 0);
    this.Quantity = (model && model.Quantity ? model.Quantity : 1);
    this.Data = (model && model.Data ? model.Data : null);
  }

  public get getTotal() {
    const result = (this.Price && this.Quantity ? this.Price * this.Quantity : 0);
    return result;
  }
}
