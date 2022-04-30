import { TestBed } from '@angular/core/testing';

import { UsurioService } from './usuario.service';

describe('UsurioService', () => {
  let service: UsurioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsurioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
