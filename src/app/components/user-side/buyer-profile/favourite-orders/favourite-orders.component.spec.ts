import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteOrdersComponent } from './favourite-orders.component';

describe('FavouriteOrdersComponent', () => {
  let component: FavouriteOrdersComponent;
  let fixture: ComponentFixture<FavouriteOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavouriteOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouriteOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
