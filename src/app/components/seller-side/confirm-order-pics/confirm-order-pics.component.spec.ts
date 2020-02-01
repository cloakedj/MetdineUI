import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmOrderPicsComponent } from './confirm-order-pics.component';

describe('ConfirmOrderPicsComponent', () => {
  let component: ConfirmOrderPicsComponent;
  let fixture: ComponentFixture<ConfirmOrderPicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmOrderPicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmOrderPicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
