import { TestBed, inject } from '@angular/core/testing';

import { CreatesService } from './creates.service';

describe('CreatesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreatesService]
    });
  });

  it('should be created', inject([CreatesService], (service: CreatesService) => {
    expect(service).toBeTruthy();
  }));
});
