import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeuserPage } from './changeuser.page';

describe('ChangeuserPage', () => {
  let component: ChangeuserPage;
  let fixture: ComponentFixture<ChangeuserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeuserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeuserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
