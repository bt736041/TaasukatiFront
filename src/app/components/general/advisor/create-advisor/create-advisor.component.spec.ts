import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdvisorComponent } from './create-advisor.component';

describe('CreateAdvisorComponent', () => {
  let component: CreateAdvisorComponent;
  let fixture: ComponentFixture<CreateAdvisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAdvisorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAdvisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
