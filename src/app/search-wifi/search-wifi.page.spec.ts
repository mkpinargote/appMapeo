import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchWifiPage } from './search-wifi.page';

describe('SearchWifiPage', () => {
  let component: SearchWifiPage;
  let fixture: ComponentFixture<SearchWifiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchWifiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchWifiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
