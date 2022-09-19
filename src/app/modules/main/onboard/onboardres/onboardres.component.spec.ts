import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardresComponent } from './onboardres.component';

describe('OnboardresComponent', () => {
  let component: OnboardresComponent;
  let fixture: ComponentFixture<OnboardresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
