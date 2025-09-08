import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsTellComponent } from './clients-tell.component';

describe('ClientsTellComponent', () => {
  let component: ClientsTellComponent;
  let fixture: ComponentFixture<ClientsTellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsTellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsTellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
