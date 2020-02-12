import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMaskComponent } from './search-mask.component';

describe('SearchMaskComponent', () => {
  let component: SearchMaskComponent;
  let fixture: ComponentFixture<SearchMaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchMaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
