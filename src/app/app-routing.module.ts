import { ConfirmUserEmailComponent } from './components/user-side/confirm-user-email/confirm-user-email.component';
import { PaymentWaitingScreenComponent } from './components/user-side/payment-waiting-screen/payment-waiting-screen.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './components/user-side/pagenotfound/pagenotfound.component';
import { SellerPageComponent } from './components/user-side/seller-page/seller-page.component';
import { BuyerProfileComponent } from './components/user-side/buyer-profile/buyer-profile.component';
import { CartComponent } from './components/user-side/cart/cart.component';
import { LoginComponent } from './components/user-side/login/login.component';
import { SignupComponent } from './components/user-side/signup/signup.component';
import { UserGatewayComponent } from './components/user-side/user-gateway/user-gateway.component';
import { MenuItemComponent } from './components/seller-side/menu-item/menu-item.component';
import { SellerDashboardComponent } from './components/seller-side/seller-dashboard/seller-dashboard.component';
import { GeolocationComponent } from './components/geolocation/geolocation.component';
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
import { BuyerComponent } from './components/user-side/buyer/buyer.component';
import { ActiveOrderGuardService } from './services/Active-order/active-order-guard.service';
import { LoginWithPhoneComponent } from './components/user-side/login-with-phone/login-with-phone.component';
import { VerifyPhoneComponent } from './components/user-side/verify-phone/verify-phone.component';
import { SellerPaymentInfoComponent } from './components/seller-side/seller-payment-info/seller-payment-info.component';
import { UpgradePhoneComponent } from './components/seller-side/upgrade-phone/upgrade-phone.component';
import { AboutUsComponent } from './components/company-data/about-us/about-us.component';
import { PrivacyPolicyComponent } from './components/company-data/privacy-policy/privacy-policy.component';
import { OurTeamComponent } from './components/company-data/our-team/our-team.component';
import { RefundsCancelsComponent } from './components/company-data/refunds-cancels/refunds-cancels.component';
import { TermsOfUseComponent } from './components/company-data/terms-of-use/terms-of-use.component';
import { ArticlesComponent } from './components/user-side/under-work/articles/articles.component';
import { VideosComponent } from './components/user-side/under-work/videos/videos.component';
import { BodycardsComponent } from './components/user-side/bodycards/bodycards.component';

const routes: Routes =[
  {path : 'user', component: BuyerComponent,canActivate :[AuthGuardService],children: [
  { path: 'seller-page/:id', component: SellerPageComponent, outlet:'userRouterOutlet' },
  { path: 'home', component: BodycardsComponent,outlet:'userRouterOutlet'},
  { path: 'cart', component: CartComponent, outlet : 'userRouterOutlet'},
  { path: 'active-order/:id',component: ActiveOrderComponent, outlet:'userRouterOutlet'},
  { path: 'profile', component : BuyerProfileComponent, outlet : 'userRouterOutlet'},
  { path : '', redirectTo : '/user/(userRouterOutlet:home)', pathMatch:'full'},
]},
  { path: 'seller-side', component: SellerSideComponent, canActivate:[AuthGuardIsSellerService],children: [
    { path:'addItem', component:MenuItemComponent, outlet:'sellerRouterOutlet'},
    { path:'seller-dashboard' ,component: SellerDashboardComponent,outlet:'sellerRouterOutlet'},
    { path : 'completed-orders', component : CompletedOrdersComponent, outlet : 'sellerRouterOutlet'},
    {path : 'seller-items', component : SellerItemsComponent, outlet : 'sellerRouterOutlet'},
    {path : 'seller-profile', component : SellerProfileDataComponent, outlet: 'sellerRouterOutlet'},
    {path : 'seller-payment-info', component : SellerPaymentInfoComponent, outlet: 'sellerRouterOutlet'},
    {path : 'active-order/:id', component : ConfirmOrderPicsComponent, outlet: 'sellerRouterOutlet'},
    {path : 'active-orders', component: ActiveOrdersComponent, outlet : 'sellerRouterOutlet'},
    {path : 'edit-item/:id',component: EditItemComponent, outlet : 'sellerRouterOutlet'},
    {path: '',redirectTo : '/seller-side/(sellerRouterOutlet:seller-dashboard)', pathMatch:'full'}
  ]},
  { path:'becomeSeller', component : BecomeSellerFormComponent,canActivate :[AuthGuardService]},
  { path: 'upgrade-phone', component : UpgradePhoneComponent, canActivate : [AuthGuardService]},
  { path: 'map', component:GeolocationComponent , canActivate : [AuthGuardService]},
  { path : 'confirm-email', component : ConfirmEmailComponent},
  { path : 'confirm-user-email', component : ConfirmUserEmailComponent},
  { path: 'payment-confirmation-wait', component: PaymentWaitingScreenComponent,canActivate :[AuthGuardService]},
  { path: 'userGateway', component: UserGatewayComponent,children:[
    { path: 'login', component:LoginComponent,outlet: 'userGatewayRouter'},
    { path: 'login-with-phone', component:LoginWithPhoneComponent,outlet: 'userGatewayRouter'},
    { path : 'verify-phone', component:VerifyPhoneComponent,canActivate : [AuthGuardService],outlet: 'userGatewayRouter'},
    { path: 'signup', component:SignupComponent, outlet: 'userGatewayRouter'},
    { path: '', redirectTo: '/userGateway/(userGatewayRouter:login)',pathMatch: 'full'}
  ]},
  { path : 'about-us', component : AboutUsComponent},
  { path : 'our-team', component : OurTeamComponent},
  { path : 'privacy-policy', component : PrivacyPolicyComponent},
  { path : 'refunds-policy', component : RefundsCancelsComponent},
  { path : 'terms-of-use', component : TermsOfUseComponent},
  { path : 'articles', component : ArticlesComponent},
  { path : 'videos', component : VideosComponent},
  { path: '', redirectTo: '/user/(userRouterOutlet:home)',pathMatch: 'full'},
  { path: '**', component: PagenotfoundComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(routes
    ,{ enableTracing: false,
      useHash : true,
      scrollPositionRestoration: "enabled",
    })],
  exports: [RouterModule],
  providers: [
    AuthGuardService,
    AuthGuardIsSellerService,
    ActiveOrderGuardService
  ]
})
export class AppRoutingModule { }
