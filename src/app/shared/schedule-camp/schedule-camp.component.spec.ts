import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleCampComponent } from './schedule-camp.component';

describe('ScheduleCampComponent', () => {
  let component: ScheduleCampComponent;
  let fixture: ComponentFixture<ScheduleCampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleCampComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleCampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
