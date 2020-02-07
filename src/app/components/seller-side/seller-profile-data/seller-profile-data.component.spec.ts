import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerProfileDataComponent } from './seller-profile-data.component';

describe('SellerProfileDataComponent', () => {
  let component: SellerProfileDataComponent;
  let fixture: ComponentFixture<SellerProfileDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerProfileDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerProfileDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
