import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorcentajeEstados } from './porcentaje-estados';

describe('PorcentajeEstados', () => {
  let component: PorcentajeEstados;
  let fixture: ComponentFixture<PorcentajeEstados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PorcentajeEstados]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PorcentajeEstados);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
