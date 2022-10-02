import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsubmitComponent } from './requestsubmit.component';

describe('RequestsubmitComponent', () => {
  let component: RequestsubmitComponent;
  let fixture: ComponentFixture<RequestsubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestsubmitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
