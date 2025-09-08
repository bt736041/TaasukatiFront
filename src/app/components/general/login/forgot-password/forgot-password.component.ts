import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { selectAuthLoading } from '../../store/auth/auth.selectors';
import { Actions, ofType } from '@ngrx/effects';
import { AuthActions } from '../../store/auth/auth.actions';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit {

  formGroup: FormGroup = {} as FormGroup;
  readonly dialogRef = inject(MatDialogRef<ForgotPasswordComponent>)
  mouseoverLogin: boolean = false;
  message: string = ""
  store = inject(Store)
  actions = inject(Actions)
  loading$ = this.store.select(selectAuthLoading)


  constructor(private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    })
    this.actions.pipe(
      ofType(AuthActions.forgotPasswordSuccess),
    ).subscribe(() => {
      this.message = 'אם כתובת המייל תקינה, נשלח אליה קישור לאיפוס הסיסמה'
    })
    this.actions.pipe(
      ofType(AuthActions.forgotPasswordFailure),
    ).subscribe(({ message }) => {
      this.message = message || 'שגיאה בשליחת המייל לאיפוס סיסמה';
    });
  }
  onNoClick() {
    this.dialogRef.close();
  }

  send() {
    const { email } = this.formGroup.value;
    this.store.dispatch(AuthActions.forgotPassword({ email }))
  }

}
