import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncDecCartComponent } from './inc-dec-cart.component';

describe('IncDecCartComponent', () => {
  let component: IncDecCartComponent;
  let fixture: ComponentFixture<IncDecCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncDecCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncDecCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
