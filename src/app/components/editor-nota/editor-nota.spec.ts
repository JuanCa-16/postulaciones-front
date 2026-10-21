import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorNota } from './editor-nota';

describe('EditorNota', () => {
  let component: EditorNota;
  let fixture: ComponentFixture<EditorNota>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorNota]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorNota);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
