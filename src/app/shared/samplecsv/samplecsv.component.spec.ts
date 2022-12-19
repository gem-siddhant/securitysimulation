import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplecsvComponent } from './samplecsv.component';

describe('SamplecsvComponent', () => {
  let component: SamplecsvComponent;
  let fixture: ComponentFixture<SamplecsvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SamplecsvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SamplecsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
