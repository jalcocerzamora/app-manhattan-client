import { ICategory } from './../../../../../core/models/db/category';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ISubproduct } from '@core/models/db';
import { PipesModule } from '@core/pipes/pipes.module';
import { ProductPopperComponent } from './product-popper.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { environment } from '@env/environment';
import { HttpLoaderFactory } from '@core/helpers';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PlatformLocation } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import '@angular/common/locales/global/es';
import '@angular/common/locales/global/en';

describe('ProductPopperComponent', () => {
  let component: ProductPopperComponent;
  let fixture: ComponentFixture<ProductPopperComponent>;

  const FAKE_TESTING_CATEGORY: ICategory = {
    id: 1,
    sort: 2,
    title: 'Entradas'
  };

  const FAKE_TESTIN_PRODUCT: ISubproduct = {
    id: 1,
    product_id: 1,
    image: 'entradas/hot-chiles.jpg',
    name: 'Hot Chiles (2pz)',
    price: 35.00,
    description: 'Chiles caribes empanizados rellenos de philadelphia tapico y queso chester.',
    default: false,
    status: true,
    online: true
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPopperComponent ],
      imports: [
        HttpClientModule,
        PipesModule,
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
        { provide: LOCALE_ID, useValue: environment.locale },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPopperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show [subproduct] input', () => {
    component.category = FAKE_TESTING_CATEGORY;
    component.subproduct = FAKE_TESTIN_PRODUCT;
    fixture.detectChanges();
    expect(fixture.componentInstance.subproduct).not.toBeNull();
  });
});
