import { Component, EventEmitter, Inject, Input, OnInit, Output, inject,  } from '@angular/core';
import { Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Client } from '../../../../models/client';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddClientComponent } from '../add-client/add-client.component';
import { MatIconModule } from '@angular/material/icon';
import { TypeService } from '../../../../services/type.service';
import { map, Observable } from 'rxjs';
import { Type } from '../../../../models/types';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectTypes } from '../../../../store/results/results.selectors';
import { ButtonComponent } from '../../../base/button/button.component';

@Component({
  selector: 'app-one-client',
  imports: [MatCardModule, MatButtonModule, MatIconModule, AsyncPipe, ButtonComponent],
  templateUrl: './one-client.component.html',
  styleUrl: './one-client.component.scss'
})
export class OneClientComponent {
@Output() edit = new EventEmitter<void>();
@Output() remove = new EventEmitter<number>();
@Input() client:Client={} as Client
router=inject(Router)
readonly dialog = inject(MatDialog)
private store = inject(Store);

types$ = this.store.select(selectTypes);
typeName$: Observable<string> = this.types$.pipe(
  map(types => types.find(t => t.id === this.client.dominant_type_id)?.name ?? '')
);

viewResults(){
this.router.navigate(['/results'],{ queryParams:{ testId: this.client.active_test_id } })
}

set() {
  this.edit.emit();
}

delete() {
  this.remove.emit(this.client.id);
}

}
