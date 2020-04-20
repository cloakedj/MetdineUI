import { TestBed } from '@angular/core/testing';

import { UsernameEmailCheckService } from './username-email-check.service';

describe('UsernameEmailCheckService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsernameEmailCheckService = TestBed.get(UsernameEmailCheckService);
    expect(service).toBeTruthy();
  });
});
