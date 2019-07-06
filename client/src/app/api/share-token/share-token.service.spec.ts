import { TestBed } from '@angular/core/testing';

import { ShareTokenService } from './share-token.service';

describe('ShareTokenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShareTokenService = TestBed.get(ShareTokenService);
    expect(service).toBeTruthy();
  });
});
