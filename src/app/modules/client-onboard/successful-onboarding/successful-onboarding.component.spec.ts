import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulOnboardingComponent } from './successful-onboarding.component';

describe('SuccessfulOnboardingComponent', () => {
  let component: SuccessfulOnboardingComponent;
  let fixture: ComponentFixture<SuccessfulOnboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessfulOnboardingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessfulOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
