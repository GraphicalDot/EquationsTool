import { TestBed, inject } from '@angular/core/testing';

import { NanoskillService } from './nanoskill.service';

describe('NanoskillService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NanoskillService]
    });
  });

  it('should be created', inject([NanoskillService], (service: NanoskillService) => {
    expect(service).toBeTruthy();
  }));
});
