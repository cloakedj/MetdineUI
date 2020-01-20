import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeSellerFormComponent } from './become-seller-form.component';

describe('BecomeSellerFormComponent', () => {
  let component: BecomeSellerFormComponent;
  let fixture: ComponentFixture<BecomeSellerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BecomeSellerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BecomeSellerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
