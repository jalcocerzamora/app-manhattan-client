import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { ISubproductsWithCategory, Subproduct } from 'projects/core/models/db';
import { Observable } from 'rxjs';

import { ScriptService } from '../../core/services/script.service';
import { SubproductService } from '../../core/services/db/subproduct.service';
import { ShopCartService } from '../../core/services/shopcart/shop-cart.service';

import { DeliveryTime, ShopCart } from 'projects/core/models/shopcart';
import { PaymentGatewayService } from '../../core/services/payment-gateway.service';
import { StripeCardComponent } from 'ngx-stripe';

@Component({
  selector: 'app-shopcart',
  templateUrl: './shopcart.component.html',
  styleUrls: ['./shopcart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopcartComponent implements OnInit, AfterViewInit {
  @ViewChild('container_menu_header') containerHeader: ElementRef<HTMLDivElement>;
  @ViewChild('container_menu_body_markup_banner') containerBanner: ElementRef<HTMLDivElement>;

  @ViewChild('btnPaymentOrder') btnPaymentOrder: ElementRef<HTMLButtonElement>;

  public CategoryWithProducts: Observable<Array<ISubproductsWithCategory>> = this.getProducts();

  public shopcart: ShopCart<Subproduct> = null;

  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  public formPaymentGatewayValid = false;

  constructor(
    private el: ElementRef,
    private rd: Renderer2,
    private scriptService: ScriptService,
    private serviceSubproducts: SubproductService,

    public serviceShopCart: ShopCartService<Subproduct>,
    private paymentGatewayService: PaymentGatewayService
  ) {
    // console.log('ShopcartComponent.constructor');
    // console.log('Loading External Scripts');
    this.scriptService.load('mapbox-gl');
  }

  ngOnInit(): void {
    this.loadComponent();
    // console.log('ShopcartComponent.ngOnInit', this);
    this.paymentGatewayService.setButtonSubmit = this.btnPaymentOrder;
  }

  ngAfterViewInit(): void {
  }

  getProducts(): Observable<Array<ISubproductsWithCategory>> {
    return this.serviceSubproducts.All();
  }

  loadComponent() {
    this.shopcart = this.serviceShopCart.GetShopCart;
    this.el.nativeElement.closest('body').classList.add('overflow-hidden');
  }

  formPaymentGatewayUpdate(status: boolean){
    this.formPaymentGatewayValid = status;
  }

  onSubmitOrder(event) {
    if (this.formPaymentGatewayValid) {
      this.paymentGatewayService.setButtonSubmit = this.btnPaymentOrder;
      this.paymentGatewayService.createPaymentIntent();
    }
  }

  onClickRemove(id: number){
    this.serviceShopCart.RemoveItem(id);
  }

}
