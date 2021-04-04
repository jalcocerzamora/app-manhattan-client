import { HttpClientModule } from '@angular/common/http';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopcartComponent } from './shopcart.component';
import { PaymentGatewayService } from '@core/services/payment/payment-gateway.service';
import { NgxStripeModule, StripeService } from 'ngx-stripe';
import { environment } from '@env/environment';

describe('ShopcartComponent', () => {
  let component: ShopcartComponent;
  let fixture: ComponentFixture<ShopcartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopcartComponent ],
      imports: [
        HttpClientModule,
        NgxStripeModule.forRoot(environment.STRIPE.PUBLIC_KEY),
      ],
      providers: [
        PaymentGatewayService,
        StripeService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
