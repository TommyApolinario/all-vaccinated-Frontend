import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacunarComponent } from './vacunar.component';

describe('VacunarComponent', () => {
  let component: VacunarComponent;
  let fixture: ComponentFixture<VacunarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacunarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacunarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
