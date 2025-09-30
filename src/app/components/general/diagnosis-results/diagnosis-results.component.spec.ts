import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosisResultsComponent } from './diagnosis-results.component';

describe('DiagnosisResultsComponent', () => {
  let component: DiagnosisResultsComponent;
  let fixture: ComponentFixture<DiagnosisResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiagnosisResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagnosisResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
