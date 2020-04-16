import { TestBed } from '@angular/core/testing';

import { CheckImageStatusService } from './check-image-status.service';

describe('CheckImageStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckImageStatusService = TestBed.get(CheckImageStatusService);
    expect(service).toBeTruthy();
  });
});
