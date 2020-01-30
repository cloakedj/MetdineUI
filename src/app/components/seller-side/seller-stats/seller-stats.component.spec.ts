import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerStatsComponent } from './seller-stats.component';

describe('SellerStatsComponent', () => {
  let component: SellerStatsComponent;
  let fixture: ComponentFixture<SellerStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
