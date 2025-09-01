import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsConsultingsComponent } from './results-consultings.component';

describe('ResultsConsultingsComponent', () => {
  let component: ResultsConsultingsComponent;
  let fixture: ComponentFixture<ResultsConsultingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsConsultingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultsConsultingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
