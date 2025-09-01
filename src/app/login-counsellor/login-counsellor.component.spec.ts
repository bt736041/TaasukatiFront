import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCounsellorComponent } from './login-counsellor.component';

describe('LoginCounsellorComponent', () => {
  let component: LoginCounsellorComponent;
  let fixture: ComponentFixture<LoginCounsellorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginCounsellorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginCounsellorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
