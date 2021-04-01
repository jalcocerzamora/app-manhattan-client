import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPopperComponent } from './product-popper.component';

describe('ProductPopperComponent', () => {
  let component: ProductPopperComponent;
  let fixture: ComponentFixture<ProductPopperComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPopperComponent ]
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
});
