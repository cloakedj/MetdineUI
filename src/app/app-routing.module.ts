import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { SellerPageComponent } from './components/seller-page/seller-page.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { BuyerProfileComponent } from './components/buyer-profile/buyer-profile.component';
import { UserProfileComponent } from './components/buyer-profile/user-profile/user-profile.component';
import { CartComponent } from './components/cart/cart.component';


const routes: Routes =[
  { path: 'seller-page', component: SellerPageComponent},
  { path: 'seller-page/cart', redirectTo:'cart'},
  { path: 'seller-page/cart/:id', redirectTo:'cart/:id'},
  { path: 'home', component: HomepageComponent},
  { path: 'profile', component: BuyerProfileComponent, children:[
    { path: 'profileOptions', component: UserProfileComponent, outlet: 'userProfile' },
    { path: '', redirectTo: '/profile/(userProfile:profileOptions)', pathMatch: 'full'},
  ]},
  { path: 'cart', component: CartComponent},
  { path: 'cart/:id', component: CartComponent},
  { path: '', redirectTo: '/home',pathMatch: 'full'},
  { path: '**', component: PagenotfoundComponent} 
]
@NgModule({
  imports: [RouterModule.forRoot(routes
    ,{ enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
