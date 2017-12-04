import { TestBed, inject } from '@angular/core/testing';

import { PageCreateResolverService } from './page-create-resolver.service';

describe('PageCreateResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageCreateResolverService]
    });
  });

  it('should be created', inject([PageCreateResolverService], (service: PageCreateResolverService) => {
    expect(service).toBeTruthy();
  }));
});
