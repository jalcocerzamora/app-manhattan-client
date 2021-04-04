export interface IShopCartItem<T> {
  Item?: number;
  Id?: number;
  Price?: number;
  Quantity?: number;
  Total?: number;
  Instructions?: string;

  Data?: T;
}

export class ShopCartItem<T> implements IShopCartItem<T> {
  public Item?: number;
  public Id?: number;
  public Price: number = 0;
  public Quantity: number = 1;
  private total?: number = 0;
  public get Total(): number {
    const result = (this.Price && this.Quantity ? this.Price * this.Quantity : 0);
    return result;
  }
  public set Total(value) {
    this.total = value;
  }
  public Instructions?: string;

  public Data: T;

  constructor(model: ShopCartItem<T> = null) {
    this.Id = (model && model.Id ? model.Id : null);
    this.Price = (model && model.Price ? model.Price : 0);
    this.Quantity = (model && model.Quantity ? model.Quantity : 1);
    this.Data = (model && model.Data ? model.Data : null);
  }
}
