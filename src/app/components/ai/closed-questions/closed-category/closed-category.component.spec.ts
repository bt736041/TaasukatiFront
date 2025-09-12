import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedCategoryComponent } from './closed-category.component';

describe('ClosedCategoryComponent', () => {
  let component: ClosedCategoryComponent;
  let fixture: ComponentFixture<ClosedCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClosedCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClosedCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
