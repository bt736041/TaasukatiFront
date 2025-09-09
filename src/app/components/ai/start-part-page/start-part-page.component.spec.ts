import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartPartPageComponent } from './start-part-page.component';

describe('StartPartPageComponent', () => {
  let component: StartPartPageComponent;
  let fixture: ComponentFixture<StartPartPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartPartPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartPartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
