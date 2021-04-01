import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacingYourOrderComponent } from './placing-your-order.component';

describe('PlacingYourOrderComponent', () => {
  let component: PlacingYourOrderComponent;
  let fixture: ComponentFixture<PlacingYourOrderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacingYourOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacingYourOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
