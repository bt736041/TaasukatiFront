import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartTestComponent } from './partTest.component';

describe('TestComponent', () => {
  let component: PartTestComponent;
  let fixture: ComponentFixture<PartTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
