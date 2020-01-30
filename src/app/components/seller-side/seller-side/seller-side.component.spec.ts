import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerSideComponent } from './seller-side.component';

describe('SellerSideComponent', () => {
  let component: SellerSideComponent;
  let fixture: ComponentFixture<SellerSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerSideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
