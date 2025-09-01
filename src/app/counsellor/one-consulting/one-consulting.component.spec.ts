import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneConsultingComponent } from './one-consulting.component';

describe('OneConsultingComponent', () => {
  let component: OneConsultingComponent;
  let fixture: ComponentFixture<OneConsultingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OneConsultingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneConsultingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
