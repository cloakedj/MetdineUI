import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradePhoneComponent } from './upgrade-phone.component';

describe('UpgradePhoneComponent', () => {
  let component: UpgradePhoneComponent;
  let fixture: ComponentFixture<UpgradePhoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpgradePhoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpgradePhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
