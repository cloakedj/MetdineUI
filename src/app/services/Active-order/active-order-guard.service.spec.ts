import { TestBed } from '@angular/core/testing';

import { ActiveOrderGuardService } from './active-order-guard.service';

describe('ActiveOrderGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActiveOrderGuardService = TestBed.get(ActiveOrderGuardService);
    expect(service).toBeTruthy();
  });
});
