import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpOnboardComponent } from './emp-onboard.component';

describe('EmpOnboardComponent', () => {
  let component: EmpOnboardComponent;
  let fixture: ComponentFixture<EmpOnboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpOnboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpOnboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
