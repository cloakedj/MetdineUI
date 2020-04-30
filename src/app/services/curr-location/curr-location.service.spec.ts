import { TestBed } from '@angular/core/testing';

import { CurrLocationService } from './curr-location.service';

describe('CurrLocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrLocationService = TestBed.get(CurrLocationService);
    expect(service).toBeTruthy();
  });
});
