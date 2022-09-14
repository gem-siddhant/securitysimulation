import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulelaterComponent } from './schedulelater.component';

describe('SchedulelaterComponent', () => {
  let component: SchedulelaterComponent;
  let fixture: ComponentFixture<SchedulelaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulelaterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulelaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
