import { Injectable } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(
    private api : ApiService,
    private router : Router
  ) { }
  canActivate(route :ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    if(this.api.checkUserToken()) return true;
    else { 
      this.router.navigateByUrl("/userGateway/(userGatewayRouter:login)");
      return false;
    }
  }
}
