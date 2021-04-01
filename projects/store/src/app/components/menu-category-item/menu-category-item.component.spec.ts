import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCategoryItemComponent } from './menu-category-item.component';

describe('MenuCategoryItemComponent', () => {
  let component: MenuCategoryItemComponent;
  let fixture: ComponentFixture<MenuCategoryItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuCategoryItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCategoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
