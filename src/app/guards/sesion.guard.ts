import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HelpersService } from '../services/helpers.service';

@Injectable({
  providedIn: 'root'
})

export class SesionGuard implements CanActivate {

  constructor( private router: Router, private sHelper: HelpersService ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    const token = this.sHelper.getToken();
    const name = this.sHelper.getName();
    if( token === null || name === null )
    {
      this.router.navigate( [ '/login' ] );
      return false;
    }
    return true;
  }

}
