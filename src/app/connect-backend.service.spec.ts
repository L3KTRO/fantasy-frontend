import { TestBed } from '@angular/core/testing';

import { ConnectBackendService } from './connect-backend.service';

describe('ConnectBackendService', () => {
  let service: ConnectBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
