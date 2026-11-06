import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalPostulaciones } from './total-postulaciones';

describe('TotalPostulaciones', () => {
  let component: TotalPostulaciones;
  let fixture: ComponentFixture<TotalPostulaciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalPostulaciones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalPostulaciones);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
