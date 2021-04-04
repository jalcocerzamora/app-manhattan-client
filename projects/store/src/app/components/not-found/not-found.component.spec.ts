import { HttpClientModule } from '@angular/common/http';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { AppRoutingModule } from '@store/app/app-routing.module';

import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  const fakeActivatedRoute = {
    snapshot: { data: { returnUrl: '' } }
  } as unknown as ActivatedRoute;

  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NotFoundComponent ],
      imports: [
        HttpClientModule,
        AppRoutingModule
      ],
      providers: [
        // ActivatedRoute
      ]
      // providers: [ {provide: ActivatedRoute, useValue: fakeActivatedRoute} ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
