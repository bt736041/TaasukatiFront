import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, ValidationErrors, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../store/auth/auth.actions';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Actions, ofType } from '@ngrx/effects';
import { take } from 'rxjs';
import { LoginRequest } from '../../models/auth';
import { NavbarService } from '../../services/navbar.service';


@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatCardModule, MatInputModule
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

  form: FormGroup = {} as FormGroup;
  token: string | null = null;
  email: string = '';
  message: string = '';
  store = inject(Store);
  actions = inject(Actions)
  route = inject(ActivatedRoute);
  router = inject(Router);
  fb = inject(FormBuilder);
  submitted = false;
  navbarService = inject(NavbarService)

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') ?? '';
    this.email = this.route.snapshot.queryParamMap.get('email') ?? ''

    this.form = this.fb.group({
      newPassword: ['', [Validators.required, this.passwordLengthValidator]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordsMatchValidator });
  }

  passwordLengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;

    if (!value) return null;

    if (value.length === 4 || value.length === 9) {
      return null; // תקין
    }

    return { invalidLength: true };
  }


  get passwordTypeHint(): string {
    const value = this.form.get('newPassword')?.value ?? '';
    if (value.length === 4) {
      return 'הסיסמה מתאימה ליועץ (4 תווים)';
    } else if (value.length === 9) {
      return 'הסיסמה מתאימה לנועץ (9 תווים)';
    } else {
      return 'הקלד/י סיסמה באורך 4 או 9 תווים בהתאם לסוג המשתמש';
    }
  }


  passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('newPassword')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { notSame: true };
  }


  send(): void {
    this.submitted = true;
    if (this.form.invalid) {
      this.message = 'ודאי שהסיסמאות תקינות ותואמות';
      return;
    }

    const newPassword = this.form.value.newPassword;
    const confirm = this.form.value.confirmPassword;

    if (newPassword !== confirm) {
      this.message = 'הסיסמאות אינן תואמות';
      return;
    }

    if (!this.token) {
      this.message = 'קישור לא תקין או שפג תוקפו';
      return;
    }


    this.store.dispatch(AuthActions.resetPassword({
      token: this.token,
      newPassword: newPassword
    }));

    this.actions.pipe(
      ofType(AuthActions.resetPasswordSuccess),
      take(1),
    ).subscribe(() => {
      const role: 'client' | 'advisor' = newPassword.length === 9 ? 'client' : 'advisor';
      const loginUser: LoginRequest = {
        email: this.email,
        password: newPassword,
        role: role
      };

      this.store.dispatch(AuthActions.login({ loginRequest: loginUser }));

      this.actions.pipe(
        ofType(AuthActions.loginSuccess),
      ).subscribe(({ loginResponse }) => {
        const role = loginResponse.role;
        this.navbarService.changeNavbar(role === 'advisor' ? 'login_advisor' : 'login_user');
        this.router.navigate([role === 'advisor' ? '/advisor' : '/client']);
      });

      this.actions.pipe(
        ofType(AuthActions.loginFailure),
      ).subscribe(({ message }) => {
        this.message = message || 'שגיאת התחברות';

      });
    });

    this.message = 'הסיסמה אופסה בהצלחה!';
    setTimeout(() => this.router.navigate(['/login']), 2000);
  }

}
