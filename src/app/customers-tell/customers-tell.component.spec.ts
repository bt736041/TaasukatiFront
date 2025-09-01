import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersTellComponent } from './customers-tell.component';

describe('CustomersTellComponent', () => {
  let component: CustomersTellComponent;
  let fixture: ComponentFixture<CustomersTellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersTellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomersTellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
