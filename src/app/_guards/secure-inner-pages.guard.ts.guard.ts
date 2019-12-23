import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { Observable } from 'rxjs';
@Injectable({
providedIn: 'root'
})
export class SecureInnerPagesGuard implements CanActivate {
constructor(
public authService: AuthService,
public router: Router
) { }
canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isAuthenticated()) {
        return true;
    }


    this.router.navigate(['/sign-in']);

    return false;
  }

}