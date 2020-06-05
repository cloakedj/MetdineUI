import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMaskComponent } from './header-mask.component';

describe('HeaderMaskComponent', () => {
  let component: HeaderMaskComponent;
  let fixture: ComponentFixture<HeaderMaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderMaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
