import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntrudactionComponent } from './intrudaction.component';

describe('IntrudactionComponent', () => {
  let component: IntrudactionComponent;
  let fixture: ComponentFixture<IntrudactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntrudactionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntrudactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
