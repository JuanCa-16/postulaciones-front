import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoDias } from './grafico-dias';

describe('GraficoDias', () => {
  let component: GraficoDias;
  let fixture: ComponentFixture<GraficoDias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoDias]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoDias);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
