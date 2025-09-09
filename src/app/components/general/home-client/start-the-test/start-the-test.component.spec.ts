import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartTheTestComponent } from './start-the-test.component';

describe('StartTheTestComponent', () => {
  let component: StartTheTestComponent;
  let fixture: ComponentFixture<StartTheTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartTheTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartTheTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
