import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingSellersComponent } from './trending-sellers.component';

describe('TrendingSellersComponent', () => {
  let component: TrendingSellersComponent;
  let fixture: ComponentFixture<TrendingSellersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrendingSellersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendingSellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
