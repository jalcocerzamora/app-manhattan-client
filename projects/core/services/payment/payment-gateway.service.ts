import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DEFAULT_CURRENCY_CODE, ElementRef, Inject, Injectable } from '@angular/core';
import { PaymentIntent } from '@stripe/stripe-js';
import { StripeCardComponent, StripeService } from 'ngx-stripe';
import { environment } from 'projects/environments/environment';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Subproduct } from 'projects/core/models/db';
import { ShopCartService } from '../shopcart/shop-cart.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentGatewayService {
  private PaymentItent?: PaymentIntent | null;

  private API_ENDPOINT: string = environment.BACKEND_ENDPOINT;
  private HTTP_OPTIONS = { headers: new HttpHeaders( { 'Content-Type': 'application/json', } ) };

  public cardStripe: StripeCardComponent | null;
  protected buttonSubmit: ElementRef<HTMLButtonElement> | null;
  protected dataStripe: any = null;

  protected selectedCategoryName = '';

  private events = new BehaviorSubject<boolean>(false);

  constructor(
    @Inject(DEFAULT_CURRENCY_CODE) private currencyCode: string,
    private http: HttpClient,

    private stripeService: StripeService,
    private shopcart: ShopCartService<Subproduct>,
  ) {
    this.PaymentItent = null;
    this.cardStripe = null;
    this.buttonSubmit = null;
  }

  public get spinnerStatus(): Observable<boolean> {
    return this.events.asObservable();
  }

  public set setButtonSubmit(value: any) {
    this.buttonSubmit = value;
    console.log('PaymentGatewayService.setButtonSubmit', value);
  }

  public set setCardStripe(value: StripeCardComponent | null) {
    this.cardStripe = value;
    console.log('PaymentGatewayService.setCardStripe', value);
  }

  public set setDataStripe(value: StripeCardComponent | null) {
    this.dataStripe = value;
    console.log('PaymentGatewayService.setDataStripe', value);
  }

  public showSpinner() {
    this.events.next(true);
  }

  public hideSpinner() {
    this.events.next(false);
  }

  // Show a spinner on payment submission
  public loading(isLoading: boolean) {
    // const $btnOrderNow: HTMLButtonElement = document.querySelector('button#btn-order-now');
    if (isLoading) {
      // Disable the button and show a spinner
      if(this.buttonSubmit != null){
        this.buttonSubmit.nativeElement.disabled = true;
      }
      // document.querySelector('#spinner').classList.remove('hidden');
      // document.querySelector('#button-text').classList.add('hidden');
    } else {
      if(this.buttonSubmit != null){
        this.buttonSubmit.nativeElement.disabled = false;
      }
      // document.querySelector('#spinner').classList.add('hidden');
      // document.querySelector('#button-text').classList.remove('hidden');
    }
  }

  /* ------- UI helpers ------- */
  // Shows a success message when the payment is complete
  public orderComplete(paymentIntentId: number) {
    this.loading(false);
    let result: HTMLElement | any = document.querySelector('.result-message a');
    if(result != undefined){
      result.setAttribute(
        'href',
        'https://dashboard.stripe.com/test/payments/' + paymentIntentId
      );
      result.closest('.result-message')?.classList.remove('hidden');
      const btn: HTMLButtonElement | any = document.querySelector('button#btn-order-now');
      btn.disabled = true;
    }
  }

  // Show the customer the error from Stripe if their card fails to charge
  public showError(errorMsgText: any) {
    this.loading(false);
    const errorMsg: Element | any = document.querySelector('#card-error');
    errorMsg.textContent = errorMsgText;
    setTimeout(() => {
      errorMsg.textContent = '';
    }, 4000);
  }

  public getLineItems() {
    console.log('PaymentGatewayService.getLineItems:');
    const items: any = [];
    this.shopcart.GetItems.forEach( item => items.push({ type: 'sku', parent: item.Id, quantity: item.Quantity }) );
    console.log(items);
    return items;
  }

  public createPaymentIntent() {
    console.log('PaymentGatewayService.createPaymentIntent:');

    const URL = this.API_ENDPOINT.concat('payment/create-intent');
    const BODY = JSON.stringify({ currency: this.currencyCode, items: this.getLineItems(), });
    const response = this.http.post(URL, BODY, this.HTTP_OPTIONS).pipe(catchError(this.handleError))
          .toPromise()
          .then(value => { console.log(value); })
          .catch();

    console.log('PaymentGatewayService.createPaymentIntent:', response);

    // const response = await fetch('/payment_intents', {
    //   method: 'POST',
    //   headers: {'Content-Type': 'application/json'},
    //   body: JSON.stringify({
    //     currency,
    //     items,
    //   }),
    // });

    return of(null);
  }

  // Calls stripe.confirmCardPayment
  // If the card requires authentication Stripe shows a pop-up modal to
  // prompt the user to enter authentication details without leaving your page.
  // tslint:disable-next-line: no-shadowed-variable
  public payWithCard(stripe = null, card = null, clientSecret = null) {
    console.log('payWithCard', [stripe, card, clientSecret]);

    this.loading(true);

    if(this.cardStripe != null){
      this.stripeService
        .createToken(this.cardStripe.element, {})
        // tslint:disable-next-line: deprecation
        .subscribe({
          next: (result) => {
            if (result.token) {
              // Use the token
              console.log(result.token.id);
            } else if (result.error) {
              // Error creating the token
              console.log(result.error.message);
            }
          },
          error: (err) => { console.log(err); }
        });
    }

    // stripe
    //   .confirmCardPayment(clientSecret, {
    //     payment_method: {
    //       card
    //     }
    //   })
    //   .then((result) => {
    //     if (result.error) {
    //       // Show error to your customer
    //       this.showError(result.error.message);
    //     } else {
    //       // The payment succeeded!
    //       this.orderComplete(result.paymentIntent.id);
    //     }
    //   });
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
