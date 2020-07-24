import { CartService } from './services/cart-service/cart.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/user-side/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BodycardsComponent } from './components/user-side/bodycards/bodycards.component';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { SellerPageComponent } from './components/user-side/seller-page/seller-page.component';
import { FooterComponent } from './components/user-side/footer/footer.component';
import { PagenotfoundComponent } from './components/user-side/pagenotfound/pagenotfound.component';
import { BuyerProfileComponent } from './components/user-side/buyer-profile/buyer-profile.component';
import { ProductComponent } from './components/user-side/product/product.component';
import { CartComponent } from './components/user-side/cart/cart.component';
import { IncDecCartComponent } from './components/user-side/inc-dec-cart/inc-dec-cart.component';
import { LoginComponent } from './components/user-side/login/login.component';
import { SignupComponent } from './components/user-side/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { UserGatewayComponent } from './components/user-side/user-gateway/user-gateway.component';
import { BuyerComponent } from './components/user-side/buyer/buyer.component';
import { MenuItemComponent } from './components/seller-side/menu-item/menu-item.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SellerDashboardComponent } from './components/seller-side/seller-dashboard/seller-dashboard.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { GeolocationComponent } from './components/geolocation/geolocation.component';
import { MetdineInterceptor } from './services/api-service/auth.interceptor';
import { AuthService } from 'src/app/services/auth-service/auth-service.service';
import { BecomeSellerFormComponent } from './components/seller-side/become-seller-form/become-seller-form.component';
import { FileUploadComponent } from './components/user-side/file-upload/file-upload.component';
import { FileUploadDirective } from './Directives/file-upload.directive';
import { ContentLengthPipe } from './pipes/content-length.pipe';
import { TrendingSellerSidebarComponent } from './components/user-side/trending-seller-sidebar/trending-seller-sidebar.component'
import { AgmCoreModule } from '@agm/core';
import { SellerSidebarComponent } from './components/seller-side/seller-sidebar/seller-sidebar.component';
import { CompletedOrdersComponent } from './components/seller-side/completed-orders/completed-orders.component';
import { SellerSideComponent } from './components/seller-side/seller-side/seller-side.component';
import { ActiveOrdersComponent } from './components/seller-side/active-orders/active-orders.component';
import { ConfirmOrderPicsComponent } from './components/seller-side/confirm-order-pics/confirm-order-pics.component';
import { OrderCardComponent } from './components/seller-side/order-card/order-card.component';
import { SellerItemsComponent } from './components/seller-side/seller-items/seller-items.component';
import { EditItemComponent } from './components/seller-side/edit-item/edit-item.component';
import { SellerProfileDataComponent } from './components/seller-side/seller-profile-data/seller-profile-data.component';
import { ActiveOrderComponent } from './components/user-side/active-order/active-order.component';
import { PreviousOrdersComponent } from './components/user-side/previous-orders/previous-orders.component';
import { SearchMaskComponent } from './components/user-side/search-mask/search-mask.component';
import { NgxUiLoaderModule,NgxUiLoaderRouterModule, NgxUiLoaderHttpModule} from 'ngx-ui-loader';
import { ToastrModule } from 'ngx-toastr';
import { LoginWithPhoneComponent } from './components/user-side/login-with-phone/login-with-phone.component';
import { VerifyPhoneComponent } from './components/user-side/verify-phone/verify-phone.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { PaymentWaitingScreenComponent } from './components/user-side/payment-waiting-screen/payment-waiting-screen.component';
import { ConfirmUserEmailComponent } from './components/user-side/confirm-user-email/confirm-user-email.component';
import { VegNonVegPipe } from './pipes/vegNonveg/veg-non-veg.pipe';
import { LabelFilterPipe } from './pipes/LabelFilter/label-filter.pipe';
import { AddOrAddedToCartPipe } from './pipes/addOrAddedToCart/add-or-added-to-cart.pipe';
import { GetquantityPipe } from './pipes/getquantity/getquantity.pipe';
import { SellerPaymentInfoComponent } from './components/seller-side/seller-payment-info/seller-payment-info.component';
import { UpgradePhoneComponent } from './components/seller-side/upgrade-phone/upgrade-phone.component';
import { AboutUsComponent } from './components/company-data/about-us/about-us.component';
import { OurTeamComponent } from './components/company-data/our-team/our-team.component';
import { PrivacyPolicyComponent } from './components/company-data/privacy-policy/privacy-policy.component';
import { HeaderMaskComponent } from './components/company-data/header-mask/header-mask.component';
import { RefundsCancelsComponent } from './components/company-data/refunds-cancels/refunds-cancels.component';
import { TermsOfUseComponent } from './components/company-data/terms-of-use/terms-of-use.component';
import { ArticlesComponent } from './components/user-side/under-work/articles/articles.component';
import { VideosComponent } from './components/user-side/under-work/videos/videos.component';
import { UrlSerializer } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodycardsComponent,
    SellerPageComponent,
    FooterComponent,
    BuyerProfileComponent,
    ProductComponent,
    CartComponent,
    IncDecCartComponent,
    PagenotfoundComponent,
    LoginComponent,
    SignupComponent,
    UserGatewayComponent,
    BuyerComponent,
    MenuItemComponent,
    SellerDashboardComponent,
    GeolocationComponent,
    BecomeSellerFormComponent,
    FileUploadComponent,
    FileUploadDirective,
    ContentLengthPipe,
    TrendingSellerSidebarComponent,
    SellerSidebarComponent,
    CompletedOrdersComponent,
    SellerSideComponent,
    ActiveOrdersComponent,
    ConfirmOrderPicsComponent,
    OrderCardComponent,
    SellerItemsComponent,
    EditItemComponent,
    SellerProfileDataComponent,
    ActiveOrderComponent,
    PreviousOrdersComponent,
    SearchMaskComponent,
    LoginWithPhoneComponent,
    VerifyPhoneComponent,
    ConfirmEmailComponent,
    PaymentWaitingScreenComponent,
    ConfirmUserEmailComponent,
    VegNonVegPipe,
    LabelFilterPipe,
    AddOrAddedToCartPipe,
    GetquantityPipe,
    SellerPaymentInfoComponent,
    UpgradePhoneComponent,
    AboutUsComponent,
    OurTeamComponent,
    PrivacyPolicyComponent,
    HeaderMaskComponent,
    RefundsCancelsComponent,
    TermsOfUseComponent,
    ArticlesComponent,
    VideosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatGridListModule,
    MatMenuModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    ReactiveFormsModule,
    MatInputModule,
    MatStepperModule,
    MatRadioModule,
    MatSlideToggleModule,
    HttpClientModule,
    MatCheckboxModule,
    MatCheckboxModule,
    NgxUiLoaderModule,
    NgxUiLoaderRouterModule,
    NgxUiLoaderHttpModule,
    ToastrModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey : "AIzaSyBeZektVlME9dVBSY8W2cGL7kTPyO6SRUk",
      libraries : ['places']
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MetdineInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
