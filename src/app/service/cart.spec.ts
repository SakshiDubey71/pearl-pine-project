import { TestBed } from '@angular/core/testing';

import { cartService } from './cartService';

describe('Cart', () => {
  let service: cartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(cartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
