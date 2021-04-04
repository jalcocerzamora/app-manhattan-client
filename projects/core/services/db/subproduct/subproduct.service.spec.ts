import {
  async,
  inject,
  TestBed,
  waitForAsync
  } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { SubproductService } from './subproduct.service';

describe('SubproductService', () => {
  // let service: SubproductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [ SubproductService ]
    });
    // service = TestBed.inject(SubproductService);
  });

  it('should be created', inject([SubproductService], (service: SubproductService) => {
    expect(service).toBeTruthy();
  }));

  it('should get menu', waitForAsync(() => {
    const service: SubproductService = TestBed.inject(SubproductService);
    // tslint:disable-next-line: deprecation
    service.All().subscribe({
      next: (response) => expect(response.json()).not.toBeNull(),
      error: (error) => fail(error)
    });
  }));
});
