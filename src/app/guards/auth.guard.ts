import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return this.auth.getCurrentUser().pipe(
      filter((val) => val !== null),
      take(1),
      map((isAuthenticated) => {
        if (isAuthenticated) {
          return true;
        } else {
          return this.router.createUrlTree(['/welcome']);
        }
      })
    );
  }
}
