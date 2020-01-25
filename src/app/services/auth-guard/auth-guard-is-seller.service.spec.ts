import { TestBed } from '@angular/core/testing';

import { AuthGuardIsSellerService } from './auth-guard-is-seller.service';

describe('AuthGuardIsSellerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthGuardIsSellerService = TestBed.get(AuthGuardIsSellerService);
    expect(service).toBeTruthy();
  });
});
