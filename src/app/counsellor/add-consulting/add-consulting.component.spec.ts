import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConsultingComponent } from './add-consulting.component';

describe('AddConsultingComponent', () => {
  let component: AddConsultingComponent;
  let fixture: ComponentFixture<AddConsultingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddConsultingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddConsultingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
