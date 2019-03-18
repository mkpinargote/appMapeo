import { TestBed } from '@angular/core/testing';

import { RedesService } from './redes.service';

describe('RedesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RedesService = TestBed.get(RedesService);
    expect(service).toBeTruthy();
  });
});
