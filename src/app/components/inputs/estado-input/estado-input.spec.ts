import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoInput } from './estado-input';

describe('EstadoInput', () => {
  let component: EstadoInput;
  let fixture: ComponentFixture<EstadoInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadoInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadoInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
