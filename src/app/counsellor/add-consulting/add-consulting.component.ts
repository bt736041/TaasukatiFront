import { Component, EventEmitter, Input, Output, inject} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GetErrorPipe } from '../../pipes/get-error.pipe';
import { HasErrorsPipe } from '../../pipes/has-errors.pipe';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NewConsultingDetailsComponent } from './new-consulting-details/new-consulting-details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-consulting',
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GetErrorPipe,
    HasErrorsPipe,
  MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './add-consulting.component.html',
  styleUrl: './add-consulting.component.scss'
})
export class AddConsultingComponent {

  message = ''
  router = inject(Router);
  mouseoverLogin: boolean = false;
  formGroup: FormGroup = {} as FormGroup;
  consultings= [{}]
  constructor(private formBuilder: FormBuilder) { }
  readonly dialogRef = inject(MatDialogRef<AddConsultingComponent>)
  readonly dialog = inject(MatDialog)




  ngOnInit() {

    this.formGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      age: ['', [Validators.required, Validators.min(1)]],
      area: ['', Validators.required]
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
    const { firstName, lastName, email, phone, age, area } = this.formGroup.value;
    const consulting= {first: firstName, last: lastName, mail: email, phone: phone, age: age, area: area}
    this.consultings.push(consulting)
    this.dialog.open(NewConsultingDetailsComponent, {
      data: { username:firstName, password:email },
    })
  }
  return(){
    this.dialogRef.close()
  }
}
