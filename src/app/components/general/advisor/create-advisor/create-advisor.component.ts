import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule,Validators } from '@angular/forms';
import { GetErrorPipe } from '../../../../pipes/get-error.pipe';
import { HasErrorsPipe } from '../../../../pipes/has-errors.pipe';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AdvisorActions } from '../../../../store/advisor/advisor.actions';

@Component({
  selector: 'app-create-advisor',
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GetErrorPipe,
    HasErrorsPipe,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule],
  templateUrl: './create-advisor.component.html',
  styleUrl: './create-advisor.component.scss'
})
export class CreateAdvisorComponent {

  message = ''
  store = inject(Store)
  router = inject(Router);
  mouseoverLogin: boolean = false;
  formGroup: FormGroup = {} as FormGroup;
  readonly dialogRef = inject(MatDialogRef<CreateAdvisorComponent>)
  readonly dialog = inject(MatDialog)
  todayString = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  types = ['ai', 'simple']

  constructor(private formBuilder: FormBuilder) { }



  ngOnInit() {

    this.formGroup = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.maxLength(4), Validators.minLength(4)]],
      type_tests: ['', Validators.required]
    });
  }

  emailValidator(control: FormControl) {
    if (
      control.value.match(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      )
    ) {
      return null;
    } else {
      return { invalidEmailAddress: true };
    }
  }

  create() {
    this.dialogRef.close()
    const v = this.formGroup.value;

    const advisor = {
      first_name: v.first_name,
      last_name: v.last_name,
      email: v.email,
      phone: v.phone,
      password: v.password,
      type_tests: v.type_tests
    };
    this.store.dispatch(AdvisorActions.createAdvisor({ advisor }))

  }
  return() {
    this.dialogRef.close()
    this.router.navigate(['/advisor']);

  }
}


