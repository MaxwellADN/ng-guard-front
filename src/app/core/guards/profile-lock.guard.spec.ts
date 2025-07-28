import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { profileLockGuard } from './profile-lock.guard';

describe('profileLockGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => profileLockGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
