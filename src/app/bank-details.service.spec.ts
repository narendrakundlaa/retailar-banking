import { TestBed, inject } from '@angular/core/testing';

import { BankDetailsService } from './bank-details.service';

describe('BankDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BankDetailsService]
    });
  });

  it('should be created', inject([BankDetailsService], (service: BankDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
