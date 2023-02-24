import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvUploadModalComponent } from './csv-upload-modal.component';

describe('CsvUploadModalComponent', () => {
  let component: CsvUploadModalComponent;
  let fixture: ComponentFixture<CsvUploadModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsvUploadModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CsvUploadModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
