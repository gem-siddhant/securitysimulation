import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RescheduleCampaignModalComponent } from './reschedule-campaign-modal.component';

describe('RescheduleCampaignModalComponent', () => {
  let component: RescheduleCampaignModalComponent;
  let fixture: ComponentFixture<RescheduleCampaignModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RescheduleCampaignModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RescheduleCampaignModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
