import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerPaymentMenuComponent } from './seller-payment-menu.component';

describe('SellerPaymentMenuComponent', () => {
  let component: SellerPaymentMenuComponent;
  let fixture: ComponentFixture<SellerPaymentMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerPaymentMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerPaymentMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
