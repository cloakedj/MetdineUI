import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmUserEmailComponent } from './confirm-user-email.component';

describe('ConfirmUserEmailComponent', () => {
  let component: ConfirmUserEmailComponent;
  let fixture: ComponentFixture<ConfirmUserEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmUserEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmUserEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
