import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FondoEsferas } from './fondo-esferas';

describe('FondoEsferas', () => {
  let component: FondoEsferas;
  let fixture: ComponentFixture<FondoEsferas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FondoEsferas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FondoEsferas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
