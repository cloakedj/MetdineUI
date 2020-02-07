import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGatewayComponent } from './user-gateway.component';

describe('UserGatewayComponent', () => {
  let component: UserGatewayComponent;
  let fixture: ComponentFixture<UserGatewayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGatewayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
