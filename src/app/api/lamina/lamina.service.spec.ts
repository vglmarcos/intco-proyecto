import { TestBed } from '@angular/core/testing';

import { LaminaService } from './lamina.service';

describe('LaminaService', () => {
  let service: LaminaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaminaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
