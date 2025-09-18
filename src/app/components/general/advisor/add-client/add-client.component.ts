import { Component, EventEmitter, Inject, Input, Output, inject } from '@angular/core';
import { AbstractControl, ValidatorFn, ValidationErrors, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GetErrorPipe } from '../../../../pipes/get-error.pipe';
import { HasErrorsPipe } from '../../../../pipes/has-errors.pipe';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NewClientDetailsComponent } from './new-client-details/new-client-details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Client } from '../../../../models/client';
import { ClientHttpService } from '../../../../services/client-http.service';
import { Store } from '@ngrx/store';
import { AdvisorActions } from '../../../../store/advisor/advisor.actions';
import { selectAdvisor, selectRegions } from '../../../../store/advisor/advisor.selectors';
import { combineLatest, take } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


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
  readonly dialogRef = inject(MatDialogRef<AddClientComponent>)
  readonly dialog = inject(MatDialog)
  todayString = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  clientService = inject(ClientHttpService)
  store= inject(Store)
  regions$ = this.store.select(selectRegions)
  advisor$ = this.store.select(selectAdvisor)
constructor(
  private formBuilder: FormBuilder,
  @Inject(MAT_DIALOG_DATA) public data: { mode: 'add' | 'edit', client?: Client }
) { }


ngOnInit() {
  const isEdit = this.data?.mode === 'edit';
  const c = this.data?.client;

  this.formGroup = this.formBuilder.group({
    first_name: [isEdit ? c?.first_name : '', Validators.required],
    last_name: [isEdit ? c?.last_name : '', Validators.required],
    email: [isEdit ? c?.email : '', [Validators.required, Validators.email]],
    phone: [isEdit ? c?.phone : '', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
    password: [isEdit ? c?.password : '', [Validators.required, Validators.maxLength(9), Validators.minLength(9)]],
    birth_date: [isEdit ? c?.birth_date : '', [Validators.required, this.dateInRange()]],
    region: [isEdit ? c?.region_id : '', Validators.required]  // שימי לב אם צריך התאמה לפי שם/ID
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

submit() {
  if (this.data.mode === 'edit') {
    this.update();
  } else {
    this.create();
  }
}


 create() {
  combineLatest([this.advisor$, this.regions$])
    .pipe(take(1))
    .subscribe(([advisor, regions]) => {
      this.dialogRef.close();
      const v = this.formGroup.value;
      const regionMatch = regions.find(r => r.name === v.region);
      if (!regionMatch) {
        console.error('region not found');
        return;
      }
      const client: Client = {
        first_name: v.first_name,
        last_name: v.last_name,
        email: v.email,
        phone: v.phone,
        password: v.password,
        birth_date: typeof v.birth_date === 'string'
          ? v.birth_date
          : (v.birth_date as Date).toISOString().slice(0, 10),
        advisor_id: advisor.id ?? 0,
        region_id: regionMatch.id
      };

      this.store.dispatch(AdvisorActions.createClient({ client }));
        this.dialog.open(NewClientDetailsComponent, {
      data: { username: v.email, password: v.password },
    })
    });
  }

update() {
  combineLatest([this.advisor$, this.regions$])
    .pipe(take(1))
    .subscribe(([advisor, regions]) => {
      this.dialogRef.close();
      const v = this.formGroup.value;
      const regionMatch = regions.find(r => r.name === v.region);
      if (!regionMatch) {
        console.error('region not found');
        return;
      }

      const updatedClient: Client = {
        ...this.data.client,
        first_name: v.first_name,
        last_name: v.last_name,
        email: v.email,
        phone: v.phone,
        password: v.password,
        birth_date: typeof v.birth_date === 'string'
          ? v.birth_date
          : (v.birth_date as Date).toISOString().slice(0, 10),
        advisor_id: advisor.id ?? 0,
        region_id: regionMatch.id
      };

      this.store.dispatch(AdvisorActions.updateClient({ client: updatedClient }));
    });
}

  return() {
    this.dialogRef.close()
  }
}

