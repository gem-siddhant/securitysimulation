import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignConfirmComponent } from './campaign-confirm.component';

describe('CampaignConfirmComponent', () => {
  let component: CampaignConfirmComponent;
  let fixture: ComponentFixture<CampaignConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
