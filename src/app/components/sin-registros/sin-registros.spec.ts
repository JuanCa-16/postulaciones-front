import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinRegistros } from './sin-registros';

describe('SinRegistros', () => {
  let component: SinRegistros;
  let fixture: ComponentFixture<SinRegistros>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinRegistros]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinRegistros);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
