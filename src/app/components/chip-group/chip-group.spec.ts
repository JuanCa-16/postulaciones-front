import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipGroup } from './chip-group';

describe('ChipGroup', () => {
  let component: ChipGroup;
  let fixture: ComponentFixture<ChipGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChipGroup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChipGroup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
