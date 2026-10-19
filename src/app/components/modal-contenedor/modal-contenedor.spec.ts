import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalContenedor } from './modal-contenedor';

describe('ModalContenedor', () => {
  let component: ModalContenedor;
  let fixture: ComponentFixture<ModalContenedor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalContenedor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalContenedor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
