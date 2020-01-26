import { TestBed } from '@angular/core/testing';

import { GetCategoryService } from './get-category.service';

describe('GetCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetCategoryService = TestBed.get(GetCategoryService);
    expect(service).toBeTruthy();
  });
});
