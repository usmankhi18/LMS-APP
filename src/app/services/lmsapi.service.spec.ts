import { TestBed } from '@angular/core/testing';

import { LmsapiService } from './lmsapi.service';

describe('LmsapiService', () => {
  let service: LmsapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LmsapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
