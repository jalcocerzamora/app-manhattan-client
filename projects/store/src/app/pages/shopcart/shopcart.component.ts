import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild
  } from '@angular/core';
import {
  Customer,
  ICustomer,
  ISubproductsWithCategory,
  Subproduct
  } from '@core/models/db';
import { DeliveryTime, ShopCart } from '@core/models/shopcart';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PaymentGatewayService } from '@core/services/payment/payment-gateway.service';
import { PlacedOrder } from '@core/models/db/placed-order';
import { PlacedOrderService } from '@core/services/db/placed-order.service';
import { ScriptService, StyleService } from '@core/services/helpers';
import { ShopCartService } from '@core/services/shopcart/shop-cart.service';
import { StripeCardComponent } from 'ngx-stripe';
import { SubproductService } from '@core/services/db/subproduct/subproduct.service';


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
  // @ViewChild('container_menu_body_markup_banner') containerBanner: ElementRef<HTMLDivElement>;

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
  ) {
    // console.log('ShopcartComponent.constructor');
  }

  ngOnInit(): void {
    this.loadComponent();
    // console.log('ShopcartComponent.ngOnInit', this);
    this.paymentGatewayService.setButtonSubmit = this.btnPaymentOrder;
  }

  ngAfterViewInit(): void {
    // do stuff
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
        // const dataCustomer: ICustomer = this.shopcart

        const data: PlacedOrder = {
          customer_id: null,
          // order_time: new da;
          // estimated_delivery_time: null;
          // food_ready: null;
          // actual_delivery_time: null;
          // delivery_address_id: null;
          // customer_id: null,
          subtotal: this.shopcart.Subtotal,
          discount: 0,
          total: this.shopcart.Total,
          // comment: null,
        };

        // this.placedOrderService.Create(data).pipe(first()).subscribe(
        //   next => {
        //     console.log('ShopcartComponent.onSubmitOrder', next);
        //   },
        //   error => {
        //     console.error('ShopcartComponent.onSubmitOrder', error);
        //     // this.errorMessage = error;
        //     // this.loading = false;
        //   }
        // );
      }
    }
  }

  onClickRemove(id: number) {
    this.serviceShopCart.RemoveItem(id);
  }

}
