import { TestBed } from '@angular/core/testing';

import { CreditCardServiceTsService } from './credit-card.service';

describe('CreditCardServiceTsService', () => {
  let service: CreditCardServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditCardServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
