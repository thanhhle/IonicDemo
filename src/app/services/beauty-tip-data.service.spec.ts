import { TestBed } from '@angular/core/testing';

import { BeautyTipDataService } from './beauty-tip-data.service';

describe('BeautyTipDataService', () => {
  let service: BeautyTipDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeautyTipDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
