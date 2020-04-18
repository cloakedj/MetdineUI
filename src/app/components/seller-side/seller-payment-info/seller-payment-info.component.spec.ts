import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerPaymentInfoComponent } from './seller-payment-info.component';

describe('SellerPaymentInfoComponent', () => {
  let component: SellerPaymentInfoComponent;
  let fixture: ComponentFixture<SellerPaymentInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerPaymentInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerPaymentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
