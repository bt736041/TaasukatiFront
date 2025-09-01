import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeConsultingComponent } from './home-consulting.component';

describe('HomeConsultingComponent', () => {
  let component: HomeConsultingComponent;
  let fixture: ComponentFixture<HomeConsultingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeConsultingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeConsultingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
