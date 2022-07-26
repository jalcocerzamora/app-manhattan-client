import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild
  } from '@angular/core';
import { map } from 'rxjs/operators';
import { PaymentGatewayService } from '@core/services/payment/payment-gateway.service';
import { ScriptService } from '@core/services/helpers/script.service';
import { ShopCartService } from '@core/services/shopcart/shop-cart.service';
import { Subproduct } from 'projects/core/models/db';
import { SubproductService } from '@core/services/db/subproduct/subproduct.service';
// import { Socket } from 'ngx-socket-io';

@Component({
  templateUrl: './placing-your-order.component.html',
  styleUrls: ['./placing-your-order.component.scss']
})
export class PlacingYourOrderComponent implements OnInit {

  public progressTime: 0;
  private interval = null;

  @ViewChild('myBar') progressBar: ElementRef<HTMLDivElement> | null = null;

  constructor(
    private el: ElementRef,
    private rd: Renderer2,
    // private socket: Socket,
    // private scriptService: ScriptService,
    // private serviceSubproducts: SubproductService,
    public serviceShopCart: ShopCartService<Subproduct>,
    // private paymentGatewayService: PaymentGatewayService
  ) {
    this.progressTime = 0;
  }

  // constructor() {
  //   super({ url: 'http://url_one:portOne', options: {} });
  // }

  ngOnInit(): void {
    console.log('PlacingYourOrderComponent.ngOnInit', this.progressBar);

    setTimeout(() => this.sendMessage('txt'), 2000);

    // this.interval = setInterval(() => {
    //   console.log(this, this.progressTime, this.progressBar);
    //   if (this.progressTime >= 100) {
    //     clearInterval(this.interval);
    //   } else {
    //     this.progressTime++;
    //     this.progressBar.nativeElement.style.width = `${this.progressTime}%`;
    //   }
    // }, 100);
  }

  sendMessage(msg: string) {
    // this.socket.emit('message', msg);
  }

  getMessage() {
    // return this.socket
    //   .fromEvent('message')
    //   .pipe(map((data) => data));
  }
}
