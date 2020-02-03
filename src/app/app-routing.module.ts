import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './components/user-side/pagenotfound/pagenotfound.component';
import { SellerPageComponent } from './components/user-side/seller-page/seller-page.component';
import { HomepageComponent } from './components/user-side/homepage/homepage.component';
import { BuyerProfileComponent } from './components/user-side/buyer-profile/buyer-profile.component';
import { UserProfileComponent } from './components/user-side/buyer-profile/user-profile/user-profile.component';
import { CartComponent } from './components/user-side/cart/cart.component';
import { LoginComponent } from './components/user-side/login/login.component';
import { SignupComponent } from './components/user-side/signup/signup.component';
import { UserGatewayComponent } from './components/user-side/user-gateway/user-gateway.component';
import { FavouriteOrdersComponent } from './components/user-side/buyer-profile/favourite-orders/favourite-orders.component';
import { SellerProfileComponent } from './components/seller-side/seller-profile/seller-profile.component';
import { ProfileOptionsComponent } from './components/seller-side/seller-profile/profile-options/profile-options.component';
import { MenuItemComponent } from './components/seller-side/menu-item/menu-item.component';
import { SellerDashboardComponent } from './components/seller-side/seller-dashboard/seller-dashboard.component';
import { GeolocationComponent } from './components/geolocation/geolocation.component';
import { SellerPaymentMenuComponent } from './components/seller-side/seller-payment-menu/seller-payment-menu.component';
import { BecomeSellerFormComponent } from './components/seller-side/become-seller-form/become-seller-form.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { AuthGuardIsSellerService } from './services/auth-guard/auth-guard-is-seller.service';
import { SellerSideComponent } from './components/seller-side/seller-side/seller-side.component';
import { CompletedOrdersComponent } from './components/seller-side/completed-orders/completed-orders.component';
import { ConfirmOrderPicsComponent } from './components/seller-side/confirm-order-pics/confirm-order-pics.component';
import { ActiveOrdersComponent } from './components/seller-side/active-orders/active-orders.component';
import { SellerItemsComponent } from './components/seller-side/seller-items/seller-items.component';
import { EditItemComponent } from './components/seller-side/edit-item/edit-item.component';
import { SellerProfileDataComponent } from './components/seller-side/seller-profile-data/seller-profile-data.component';
import { ActiveOrderComponent } from './components/user-side/active-order/active-order.component';


const routes: Routes =[
  { path: 'seller-page/:id', component: SellerPageComponent},
  { path: 'seller-page/cart', redirectTo:'cart'},
  { path: 'seller-page/cart/:id', redirectTo:'cart/:id'},
  { path: 'home', component: HomepageComponent, canActivate: [AuthGuardService]},
  { path: 'profile', component: BuyerProfileComponent, children:[
    { path: 'profileOptions', component: UserProfileComponent, outlet: 'userProfile' },
    { path: 'favouriteOrders', component: FavouriteOrdersComponent, outlet: 'userProfile'},
    { path: '', redirectTo: '/profile/(userProfile:profileOptions)', pathMatch: 'full'},
  ]},
  { path: 'active-order',component: ActiveOrderComponent},
  { path: 'userGateway', component: UserGatewayComponent, children:[
    { path: 'login', component:LoginComponent, outlet: 'userGatewayRouter'},
    { path: 'signup', component:SignupComponent, outlet: 'userGatewayRouter'},
    { path: '', redirectTo: '/userGateway/(userGatewayRouter:login)',pathMatch: 'full'}
  ]},
  { path: 'cart', component: CartComponent},
  { path: 'seller-side', component: SellerSideComponent, canActivate:[AuthGuardIsSellerService],children: [
    { path:'addItem', component:MenuItemComponent, outlet:'sellerRouterOutlet'},
    { path:'seller-dashboard' ,component: SellerDashboardComponent,outlet:'sellerRouterOutlet'},
    { path : 'completed-orders', component : CompletedOrdersComponent, outlet : 'sellerRouterOutlet'},
    {path : 'seller-items', component : SellerItemsComponent, outlet : 'sellerRouterOutlet'},
    {path : 'seller-profile', component : SellerProfileDataComponent, outlet: 'sellerRouterOutlet'},
    {path : 'active-order/:id', component : ConfirmOrderPicsComponent, outlet: 'sellerRouterOutlet'},
    {path : 'active-orders', component: ActiveOrdersComponent, outlet : 'sellerRouterOutlet'},
    {path : 'edit-item/:id',component: EditItemComponent, outlet : 'sellerRouterOutlet'},
    {path: '',redirectTo : '/seller-side/(sellerRouterOutlet:seller-dashboard)', pathMatch:'full'}
  ]},
  // { path: 'seller-profile', component: SellerProfileComponent, children:[
  //   {path: 'profile-options', component: ProfileOptionsComponent, outlet:'sellerProfile'},
  //   {path: 'seller-payment-menu', component: SellerPaymentMenuComponent, outlet: 'sellerProfile'},
  //   { path:'', redirectTo:'/seller-profile/(sellerProfile:profile-options)', pathMatch: 'full'},
  // ]},
  { path:'becomeSeller', component : BecomeSellerFormComponent},
  { path: 'map', component:GeolocationComponent},
  { path: '', redirectTo: '/userGateway/(userGatewayRouter:login)',pathMatch: 'full'},
  { path: '**', component: PagenotfoundComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(routes
    ,{ enableTracing: false
    })],
  exports: [RouterModule],
  providers: [
    AuthGuardService
  ]
})
export class AppRoutingModule { }
