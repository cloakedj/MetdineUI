import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentWaitingScreenComponent } from './payment-waiting-screen.component';

describe('PaymentWaitingScreenComponent', () => {
  let component: PaymentWaitingScreenComponent;
  let fixture: ComponentFixture<PaymentWaitingScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentWaitingScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentWaitingScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
