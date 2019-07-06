import { TestBed } from '@angular/core/testing';

import { UserContactsService } from './user-contacts.service';

describe('UserContactsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserContactsService = TestBed.get(UserContactsService);
    expect(service).toBeTruthy();
  });
});
