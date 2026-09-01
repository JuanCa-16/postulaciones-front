import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearActualizar } from './crear-actualizar';

describe('CrearActualizar', () => {
  let component: CrearActualizar;
  let fixture: ComponentFixture<CrearActualizar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearActualizar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearActualizar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
