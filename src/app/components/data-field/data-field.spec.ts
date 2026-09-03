import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataField } from './data-field';

describe('DataField', () => {
  let component: DataField;
  let fixture: ComponentFixture<DataField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataField]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataField);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
