import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSimulationTableComponent } from './client-simulation-table.component';

describe('ClientSimulationTableComponent', () => {
  let component: ClientSimulationTableComponent;
  let fixture: ComponentFixture<ClientSimulationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientSimulationTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSimulationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
