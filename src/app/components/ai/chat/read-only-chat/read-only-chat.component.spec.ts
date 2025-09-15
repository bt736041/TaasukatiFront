import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadOnlyChatComponent } from './read-only-chat.component';

describe('ReadOnlyChatComponent', () => {
  let component: ReadOnlyChatComponent;
  let fixture: ComponentFixture<ReadOnlyChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadOnlyChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadOnlyChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
