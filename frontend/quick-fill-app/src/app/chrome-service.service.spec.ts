import { TestBed } from '@angular/core/testing';

import { ChromeServiceService } from './chrome-service.service';

describe('ChromeServiceService', () => {
  let service: ChromeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChromeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
