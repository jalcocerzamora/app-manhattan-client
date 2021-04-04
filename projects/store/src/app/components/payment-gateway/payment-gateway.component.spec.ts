import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule, DatePipe, PlatformLocation } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { environment } from '@env/environment';
import { HttpLoaderFactory } from '@core/helpers';

import { PaymentGatewayComponent } from './payment-gateway.component';
import { NgxStripeModule, StripeService } from 'ngx-stripe';
import { AppRoutingModule } from '@store/app/app-routing.module';
import { PaymentGatewayService } from '@core/services/payment/payment-gateway.service';

describe('PaymentGatewayComponent', () => {
  let component: PaymentGatewayComponent;
  let fixture: ComponentFixture<PaymentGatewayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentGatewayComponent ],
      imports: [
        CommonModule,
        AppRoutingModule,
        HttpClientModule,
        NgxStripeModule.forRoot(environment.STRIPE.PUBLIC_KEY),
        TranslateModule.forRoot({
          defaultLanguage: environment.language,
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient, PlatformLocation]
          }
        }),
      ],
      providers: [
        // HttpClient,
        // HttpHandler,
        DatePipe,
        StripeService,
        PaymentGatewayService,
        // TranslateService,
        // { provide: FORMLY_CONFIG, multi: true, useFactory: registerTranslateExtension, deps: [TranslateService] },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
