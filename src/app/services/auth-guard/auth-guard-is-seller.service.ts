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
    if(localStorage.getItem("is_seller") === "true") return true;
    this.router.navigate(['/becomeSeller']);
    return false;
}
}