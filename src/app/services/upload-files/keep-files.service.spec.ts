import { TestBed } from '@angular/core/testing';

import { KeepFilesService } from './keep-files.service';

describe('KeepFilesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KeepFilesService = TestBed.get(KeepFilesService);
    expect(service).toBeTruthy();
  });
});
