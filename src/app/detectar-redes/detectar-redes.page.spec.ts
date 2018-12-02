import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetectarRedesPage } from './detectar-redes.page';

describe('DetectarRedesPage', () => {
  let component: DetectarRedesPage;
  let fixture: ComponentFixture<DetectarRedesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetectarRedesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetectarRedesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
