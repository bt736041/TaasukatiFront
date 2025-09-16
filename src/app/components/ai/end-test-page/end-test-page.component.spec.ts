import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndTestPageComponent } from './end-test-page.component';

describe('EndTestPageComponent', () => {
  let component: EndTestPageComponent;
  let fixture: ComponentFixture<EndTestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndTestPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndTestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
