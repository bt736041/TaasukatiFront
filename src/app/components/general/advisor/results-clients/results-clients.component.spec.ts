import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsClientsComponent } from './results-clients.component';

describe('ResultsClientsComponent', () => {
  let component: ResultsClientsComponent;
  let fixture: ComponentFixture<ResultsClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsClientsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultsClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
