import { TestBed } from '@angular/core/testing';

import { CreditCardServeService } from './credit-card-http.service';

describe('CreditCardServeService', () => {
  let service: CreditCardServeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditCardServeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
