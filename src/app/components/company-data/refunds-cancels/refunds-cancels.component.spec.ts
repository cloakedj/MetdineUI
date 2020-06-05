import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundsCancelsComponent } from './refunds-cancels.component';

describe('RefundsCancelsComponent', () => {
  let component: RefundsCancelsComponent;
  let fixture: ComponentFixture<RefundsCancelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefundsCancelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundsCancelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
