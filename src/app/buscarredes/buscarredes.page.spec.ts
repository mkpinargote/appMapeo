import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarredesPage } from './buscarredes.page';

describe('BuscarredesPage', () => {
  let component: BuscarredesPage;
  let fixture: ComponentFixture<BuscarredesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarredesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarredesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
