import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodycardsComponent } from './bodycards.component';

describe('BodycardsComponent', () => {
  let component: BodycardsComponent;
  let fixture: ComponentFixture<BodycardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodycardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodycardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
