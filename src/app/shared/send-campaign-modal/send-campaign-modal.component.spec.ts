import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendCampaignModalComponent } from './send-campaign-modal.component';

describe('SendCampaignModalComponent', () => {
  let component: SendCampaignModalComponent;
  let fixture: ComponentFixture<SendCampaignModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendCampaignModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendCampaignModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
