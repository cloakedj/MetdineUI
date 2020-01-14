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
import { TrendingSellersComponent } from './components/user-side/trending-sellers/trending-sellers.component';
import { SellerPageComponent } from './components/user-side/seller-page/seller-page.component';
import { FilterSidebarComponent } from './components/user-side/filter-sidebar/filter-sidebar.component';
import { FooterComponent } from './components/user-side/footer/footer.component';
import { PagenotfoundComponent } from './components/user-side/pagenotfound/pagenotfound.component';
import { HomepageComponent } from './components/user-side/homepage/homepage.component';
import { BuyerProfileComponent } from './components/user-side/buyer-profile/buyer-profile.component';
import { UserProfileComponent } from './components/user-side/buyer-profile/user-profile/user-profile.component';
import { ProductComponent } from './components/user-side/product/product.component';
import { CartComponent } from './components/user-side/cart/cart.component';
import { IncDecCartComponent } from './components/user-side/inc-dec-cart/inc-dec-cart.component';
import { LoginComponent } from './components/user-side/login/login.component';
import { SignupComponent } from './components/user-side/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { UserGatewayComponent } from './components/user-side/user-gateway/user-gateway.component';
import { FavouriteOrdersComponent } from './components/user-side/buyer-profile/favourite-orders/favourite-orders.component';
import { BuyerComponent } from './components/user-side/buyer/buyer.component';
import { SellerProfileComponent } from './components/seller-side/seller-profile/seller-profile.component';
import { ProfileOptionsComponent } from './components/seller-side/seller-profile/profile-options/profile-options.component';
import { MenuItemComponent } from './components/seller-side/menu-item/menu-item.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SellerDashboardComponent } from './components/seller-side/seller-dashboard/seller-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodycardsComponent,
    TrendingSellersComponent,
    SellerPageComponent,
    FilterSidebarComponent,
    FooterComponent,
    PagenotfoundComponent,
    HomepageComponent,
    BuyerProfileComponent,
    UserProfileComponent,
    ProductComponent,
    CartComponent,
    IncDecCartComponent,
    LoginComponent,
    SignupComponent,
    UserGatewayComponent,
    FavouriteOrdersComponent,
    BuyerComponent,
    SellerProfileComponent,
    ProfileOptionsComponent,
    MenuItemComponent,
    SellerDashboardComponent,
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
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }