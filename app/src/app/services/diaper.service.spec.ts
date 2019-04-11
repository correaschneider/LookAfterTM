import { TestBed } from '@angular/core/testing';

import { DiaperService } from './diaper.service';

describe('DiaperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiaperService = TestBed.get(DiaperService);
    expect(service).toBeTruthy();
  });
});
