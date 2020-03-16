import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginWithPhoneComponent } from './login-with-phone.component';

describe('LoginWithPhoneComponent', () => {
  let component: LoginWithPhoneComponent;
  let fixture: ComponentFixture<LoginWithPhoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginWithPhoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginWithPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
