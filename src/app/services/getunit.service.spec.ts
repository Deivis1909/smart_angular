import { TestBed } from '@angular/core/testing';

import { GetunitService } from './getunit.service';

describe('GetunitService', () => {
  let service: GetunitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetunitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
