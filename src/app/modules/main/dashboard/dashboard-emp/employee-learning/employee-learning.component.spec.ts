import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeLearningComponent } from './employee-learning.component';

describe('EmployeeLearningComponent', () => {
  let component: EmployeeLearningComponent;
  let fixture: ComponentFixture<EmployeeLearningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeLearningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
