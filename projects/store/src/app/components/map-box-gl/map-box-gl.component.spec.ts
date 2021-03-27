import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapBoxGLComponent } from './map-box-gl.component';

describe('MapBoxGLComponent', () => {
  let component: MapBoxGLComponent;
  let fixture: ComponentFixture<MapBoxGLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapBoxGLComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapBoxGLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
