import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewConsultingDetailsComponent } from './new-consulting-details.component';

describe('NewConsultingDetailsComponent', () => {
  let component: NewConsultingDetailsComponent;
  let fixture: ComponentFixture<NewConsultingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewConsultingDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewConsultingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
