import { TestBed } from '@angular/core/testing';

import { ShoppingApiService } from './shopping-api.service';

describe('ShoppingApiService', () => {
  let service: ShoppingApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
