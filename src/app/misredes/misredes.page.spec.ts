import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisredesPage } from './misredes.page';

describe('MisredesPage', () => {
  let component: MisredesPage;
  let fixture: ComponentFixture<MisredesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisredesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisredesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
