import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NavbarService } from '../../../services/navbar.service';
import { LoginRequest, Role } from '../../../models/auth';
import { selectAccessToken, selectAuthError, selectAuthLoading, selectAuthUser, selectIsAuthenticated } from '../../../store/auth/auth.selectors';
import { AuthActions } from '../../../store/auth/auth.actions';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { CreateAdvisorComponent } from '../advisor/create-advisor/create-advisor.component';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  router = inject(Router);
  store = inject(Store)
  actions = inject(Actions)
  navbarService = inject(NavbarService)
  mouseoverLogin: boolean = false;
  message: string = ""
  formGroup: FormGroup = {} as FormGroup;
  readonly dialogRef = inject(MatDialogRef<LoginComponent>)
  readonly dialog = inject(MatDialog)

  constructor(private formBuilder: FormBuilder) { }

  accessToken$ = this.store.select(selectAccessToken)
  isAuthenticated$ = this.store.select(selectIsAuthenticated)
  user$ = this.store.select(selectAuthUser)
  loading$ = this.store.select(selectAuthLoading)
  error$ = this.store.select(selectAuthError)

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    debugger
    const { username, password } = this.formGroup.value;
    if (password.length !== 4 && password.length !== 9) {
      this.message = 'אורך סיסמה לא תקין';
    }
    const role: Role = (password.length === 9) ? 'client' : 'advisor';
    const loginUser: LoginRequest = { email: username, password, role };
    this.store.dispatch(AuthActions.login({ loginRequest: loginUser }));

    this.actions.pipe(
      ofType(AuthActions.loginSuccess),
    ).subscribe(({ loginResponse }) => {
      const role = loginResponse.role;
      this.navbarService.changeNavbar(role === 'advisor' ? 'login_advisor' : 'login_user');
      this.router.navigate([role === 'advisor' ? '/advisor' : '/client']);
      this.dialogRef?.close();
    });

    this.actions.pipe(
      ofType(AuthActions.loginFailure),
    ).subscribe(({ message }) => {
      this.message = message || 'שגיאת התחברות';

    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  forgetPass() {
    this.dialog.open(ForgotPasswordComponent)

  }

  createAdvisor() {
    this.dialogRef.close();
    this.dialog.open(CreateAdvisorComponent)
  }
}
