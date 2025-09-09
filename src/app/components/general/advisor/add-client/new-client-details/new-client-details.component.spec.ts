import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewClientDetailsComponent } from './new-client-details.component';

describe('NewClientDetailsComponent', () => {
  let component: NewClientDetailsComponent;
  let fixture: ComponentFixture<NewClientDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewClientDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewClientDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
