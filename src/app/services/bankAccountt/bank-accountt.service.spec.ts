import { TestBed } from '@angular/core/testing';

import { BankAccounttService } from './bank-accountt.service';

describe('BankAccounttService', () => {
  let service: BankAccounttService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankAccounttService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
