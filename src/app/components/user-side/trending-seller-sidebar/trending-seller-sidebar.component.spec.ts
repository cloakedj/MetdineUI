import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingSellerSidebarComponent } from './trending-seller-sidebar.component';

describe('TrendingSellerSidebarComponent', () => {
  let component: TrendingSellerSidebarComponent;
  let fixture: ComponentFixture<TrendingSellerSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrendingSellerSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendingSellerSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
