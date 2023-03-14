import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardpopupmodalComponent } from './dashboardpopupmodal.component';

describe('DashboardpopupmodalComponent', () => {
  let component: DashboardpopupmodalComponent;
  let fixture: ComponentFixture<DashboardpopupmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardpopupmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardpopupmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
