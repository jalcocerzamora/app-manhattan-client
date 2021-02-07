import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';

import { StripeCardComponent } from 'ngx-stripe';

import { ScriptService } from 'projects/store/src/app/core/services/script.service';
import { StyleService } from 'projects/store/src/app/core/services/style.service';

import { SubproductService } from 'projects/store/src/app/core/services/db/subproduct.service';
import { ShopCartService } from 'projects/store/src/app/core/services/shopcart/shop-cart.service';
import { PaymentGatewayService } from 'projects/store/src/app/core/services/payment-gateway.service';

import { ISubproductsWithCategory, Subproduct } from 'projects/core/models/db';
import { DeliveryTime, ShopCart } from 'projects/core/models/shopcart';
import { PlacedOrderService } from '../../core/services/db/placed-order.service';
import { PlacedOrder } from 'projects/core/models/db/placed-order';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-shopcart',
  templateUrl: './shopcart.component.html',
  styleUrls: [
    './shopcart.component.scss',
    // '../../../../../../node_modules/leaflet/dist/leaflet.css',
  ],
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
    private serviceSubproducts: SubproductService,

    public serviceShopCart: ShopCartService<Subproduct>,
    private paymentGatewayService: PaymentGatewayService,
    private placedOrderService: PlacedOrderService,

    private tagScriptService: ScriptService,
    private tagStyleService: StyleService,
  ) {
    // console.log('ShopcartComponent.constructor');
    // console.log('Loading External Scripts');
    // this.tagScriptService.load('mapbox-gl');
    // this.tagStyleService.load('leaflet');
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

  formPaymentGatewayUpdate(status: boolean) {
    this.formPaymentGatewayValid = status;
  }

  onSubmitOrder(event) {
    if (this.formPaymentGatewayValid) {
      if (this.paymentGatewayService.cardStripe !== null) {
        this.paymentGatewayService.setButtonSubmit = this.btnPaymentOrder;
        this.paymentGatewayService.createPaymentIntent();
      } else {
        const data: PlacedOrder = {
          // customer_id: null,
          // order_time: new da;
          // estimated_delivery_time: null;
          // food_ready: null;
          // actual_delivery_time: null;
          // delivery_address_id: null;
          // customer_id: null,
          subtotal: this.shopcart.Subtotal,
          discount: 0,
          total: this.shopcart.getTotal,
          // comment: null,
        };

        this.placedOrderService.Create(data).pipe(first()).subscribe(
          next => {
            console.log('ShopcartComponent.onSubmitOrder', next);
          },
          error => {
            console.error('ShopcartComponent.onSubmitOrder', error);
            // this.errorMessage = error;
            // this.loading = false;
          }
        );
      }
    }
  }

  onClickRemove(id: number) {
    this.serviceShopCart.RemoveItem(id);
  }

}
