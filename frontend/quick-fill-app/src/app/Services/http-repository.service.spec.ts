import { TestBed } from '@angular/core/testing';

import { HttpRepositoryService } from './http-repository.service';

describe('HttpRepositoryService', () => {
  let service: HttpRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
