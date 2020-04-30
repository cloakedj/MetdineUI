import { Injectable } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth-service/auth-service.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardIsSellerService {
  constructor(
    private api : ApiService,
    private router : Router,
    private auth : AuthService
  ) { }
  canActivate(route :ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean{
    if(localStorage.getItem("is_seller") === "true") {
      if(localStorage.getItem("seller_phone_verified") === "true")
      return true;
      else
      {
      if(localStorage.getItem("buyer-phone-status") == "true")
      this.router.navigate(['/upgrade-phone']);
      else
      this.router.navigate(["/userGateway",{outlets : {userGatewayRouter : ['verify-phone']}}],
      {queryParams : {sellerSide : true}});
      return false;
      }
    }
    this.router.navigate(['/becomeSeller']);
    return false;
}
}
