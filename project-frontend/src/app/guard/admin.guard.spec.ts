import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { PLATFORM_ID } from '@angular/core';

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Create router spy
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AdminGuard,
        { provide: Router, useValue: routerSpy },
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    });

    guard = TestBed.inject(AdminGuard);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access when user is admin', () => {
    spyOn(localStorage, 'getItem').and.returnValue('admin');
    
    const result = guard.canActivate();
    
    expect(result).toBe(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should redirect to login when user is not admin', () => {
    spyOn(localStorage, 'getItem').and.returnValue('user');
    
    const result = guard.canActivate();
    
    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/user/login']);
  });

  it('should handle localStorage errors', () => {
    spyOn(localStorage, 'getItem').and.throwError('localStorage error');
    
    const result = guard.canActivate();
    
    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/user/login']);
  });
});
