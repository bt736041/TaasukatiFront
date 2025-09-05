import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { AbstractControl, ValidatorFn, ValidationErrors, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GetErrorPipe } from '../../pipes/get-error.pipe';
import { HasErrorsPipe } from '../../pipes/has-errors.pipe';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NewClientDetailsComponent } from './new-client-details/new-client-details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Client } from '../../models/client';
import { ClientHttpService } from '../../services/client-http.service';

@Component({
  selector: 'app-add-client',
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
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.scss'
})
export class AddClientComponent {

  message = ''
  router = inject(Router);
  mouseoverLogin: boolean = false;
  formGroup: FormGroup = {} as FormGroup;
  clients = [{}]
  readonly dialogRef = inject(MatDialogRef<AddClientComponent>)
  readonly dialog = inject(MatDialog)
  regions = [{ id: 1, name: "מרכז" }, { id: 2, name: "צפון" }, { id: 3, name: "דרום" }]
  todayString = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  clientService = inject(ClientHttpService)
  
  constructor(private formBuilder: FormBuilder) { }



  ngOnInit() {

    this.formGroup = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.maxLength(9), Validators.minLength(9)]],
      birth_date: ['', [Validators.required, this.dateInRange()]],
      region: ['', Validators.required]
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

  dateInRange(min = '1900-01-01', max = new Date().toISOString().slice(0, 10)): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      const v = c.value as string | null;
      if (!v) return null; // Validators.required כבר יטפל בריק
      if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return { dateFormat: true };
      if (v < min) return { dateMin: true };
      if (v > max) return { dateMax: true };
      return null;
    };
  }

  create() {
    this.dialogRef.close()
    const v = this.formGroup.value;

    const regionMatch = this.regions?.find(r => r.name === v.region);
    if (!regionMatch) { console.error('region not found'); return; }

    const client = {
      first_name: v.first_name,
      last_name: v.last_name,
      email: v.email,
      phone: v.phone,
      password: v.password,
      birth_date: typeof v.birth_date === 'string'
        ? v.birth_date
        : (v.birth_date as Date).toISOString().slice(0, 10),
      advisor_id: 1,
      region_id: regionMatch.id
    };

    console.log('OUT payload:', client);

    this.clientService.createClient$(client, "ai").subscribe({
      next: r => console.log('OK:', r),
      error: (e) => {
        console.error('HTTP ERR:', e.status, e.statusText);
        // ב-FastAPI/Django תקבלי פירוט ב-e.error
        console.dir(e.error, { depth: null });
      }
    });




    // this.clients.push(client)
    this.dialog.open(NewClientDetailsComponent, {
      data: { username: v.email, password: v.password },
    })
  }
  return() {
    this.dialogRef.close()
  }
}

