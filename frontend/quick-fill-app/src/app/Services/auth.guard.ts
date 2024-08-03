import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { isPlatformBrowser } from '@angular/common';
import { CONSTANTS } from './constant';

@Injectable({
  providedIn: 'root',
})
class AuthGuardCN {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const isAuthenticated = this.localStorageService.get(CONSTANTS.ACCESS_TOKEN_COOKIE);
      if (!isAuthenticated) {
        this.router.navigate(['login']);
        return false;
      }
      try {
        const parsedData = JSON.parse(isAuthenticated);
        if(parsedData.token){
          if(next.data['role'] && parsedData.role === next.data['role'] ){
            return true; 
          } 
        }
      } catch (error) {
        console.error('Failed to parse access token:', error);
        // this.router.navigate(['/', ROUTS.LOGIN]);
      }
      this.router.navigate(['login']);
    }
    return false;
  }
};

export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  return inject(AuthGuardCN).canActivate(next, state);
  // return true
};


