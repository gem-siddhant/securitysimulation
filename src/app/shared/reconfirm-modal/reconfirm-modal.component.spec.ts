import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconfirmModalComponent } from './reconfirm-modal.component';

describe('ReconfirmModalComponent', () => {
  let component: ReconfirmModalComponent;
  let fixture: ComponentFixture<ReconfirmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReconfirmModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReconfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
