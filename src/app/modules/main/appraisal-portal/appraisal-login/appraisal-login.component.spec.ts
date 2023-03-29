import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalLoginComponent } from './appraisal-login.component';

describe('AppraisalLoginComponent', () => {
  let component: AppraisalLoginComponent;
  let fixture: ComponentFixture<AppraisalLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppraisalLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppraisalLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
