import { TestBed } from '@angular/core/testing';

import { ProductCategoryDataService } from './product-category-data.service';

describe('ProductCategoryDataService', () => {
  let service: ProductCategoryDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductCategoryDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
