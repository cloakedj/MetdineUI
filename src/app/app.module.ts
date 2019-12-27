import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BodycardsComponent } from './components/bodycards/bodycards.component';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { TrendingSellersComponent } from './components/trending-sellers/trending-sellers.component';
import { SellerPageComponent } from './components/seller-page/seller-page.component';
import { FilterSidebarComponent } from './components/filter-sidebar/filter-sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { BuyerProfileComponent } from './components/buyer-profile/buyer-profile.component';
import { UserProfileComponent } from './components/buyer-profile/user-profile/user-profile.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';


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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
