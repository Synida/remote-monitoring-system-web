import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})

export class AuthguardGuard implements CanActivate {
  constructor(private dataService: ApiService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const routeUrl: string = state.url;
    return this.isLogin(routeUrl);
  }

  isLogin(routeUrl: string) {
    if (this.dataService.isLoggedIn()) {
      return true;
    }

    this.dataService.redirectUrl = routeUrl;
    this.router.navigate(['/login'], {queryParams: {returnUrl: routeUrl}});
  }
}
