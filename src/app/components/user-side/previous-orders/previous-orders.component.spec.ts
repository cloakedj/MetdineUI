import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousOrdersComponent } from './previous-orders.component';

describe('PreviousOrdersComponent', () => {
  let component: PreviousOrdersComponent;
  let fixture: ComponentFixture<PreviousOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
