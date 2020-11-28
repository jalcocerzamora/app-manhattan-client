import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';

import { StripeCardComponent } from 'ngx-stripe';

import { ScriptService } from 'projects/store/src/app/core/services/script.service';

import { SubproductService } from 'projects/store/src/app/core/services/db/subproduct.service';
import { ShopCartService } from 'projects/store/src/app/core/services/shopcart/shop-cart.service';
import { PaymentGatewayService } from 'projects/store/src/app/core/services/payment-gateway.service';

import { ISubproductsWithCategory, Subproduct } from 'projects/core/models/db';
import { DeliveryTime, ShopCart } from 'projects/core/models/shopcart';

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
