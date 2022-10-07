import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvmessageComponent } from './csvmessage.component';

describe('CsvmessageComponent', () => {
  let component: CsvmessageComponent;
  let fixture: ComponentFixture<CsvmessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsvmessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CsvmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
