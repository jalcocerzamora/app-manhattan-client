import { PipesModule } from '@core/pipes/pipes.module';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductItemComponent } from './product-item.component';

describe('ProductItemComponent', () => {
  let component: ProductItemComponent;
  let fixture: ComponentFixture<ProductItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductItemComponent ],
      imports: [
        PipesModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should show TEST INPUT', () => {
  //   component.input = 'test input';
  //   component.processInput();
  //   fixture.detectChanges();
  //   expect(fixture.nativeElement.querySelector('div').innerText).toEqual('TEST INPUT');
  // });
});
