import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AddClientComponent } from './add-client/add-client.component';
import { Store } from '@ngrx/store';
import { Advisor } from '../../../models/advisor';
import { selectAdvisor, selectClients, selectLastCreatedClient, selectRegions } from '../../../store/advisor/advisor.selectors';
import { OneClientComponent } from './one-client/one-client.component';
import { ButtonComponent } from '../../base/button/button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Client } from '../../../models/client';
import { AdvisorActions } from '../../../store/advisor/advisor.actions';
import { FormsModule } from '@angular/forms';
import { map, combineLatest, startWith, BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-advisor',
  imports: [ButtonComponent,RouterModule, CommonModule, OneClientComponent, MatButtonModule, MatIconModule, FormsModule],
  templateUrl: './advisor.component.html',
  styleUrl: './advisor.component.scss'
})
export class AdvisorComponent  {
  route = inject(ActivatedRoute)
  router = inject(Router);
  readonly dialog = inject(MatDialog)
  store = inject(Store)
  advisor$ = this.store.select(selectAdvisor)
  clients$ = this.store.select(selectClients)
  regions$ = this.store.select(selectRegions)
  lastCreatedClient$ = this.store.select(selectLastCreatedClient)
  searchTerm = '';
private searchSubject = new BehaviorSubject<string>('');


filteredClients$ = combineLatest([
  this.clients$,
  this.searchSubject.asObservable().pipe(startWith(''))
]).pipe(
  map(([clients, term]) => {
    const search = term.toLowerCase().trim();
    if (!search) return clients;

    return clients.filter(client =>
      Object.values(client).some(value =>
        (value ?? '').toString().toLowerCase().includes(search)
      )
    );
  })
);

// נקרא מכל שינוי בקלט או אנטר
onSearch(term: string) {
  this.searchTerm = term;
  this.searchSubject.next(term);
}


 addClient() {
  this.dialog.open(AddClientComponent, {
    width: '500px',
    data: {
      mode: 'add'
    }
  });
}

editClient(client: Client) {
  this.dialog.open(AddClientComponent, {
    width: '500px',
    data: {
      mode: 'edit',
      client: client
    }
  });
}
deleteClient(clientId: number) {
  this.store.dispatch(AdvisorActions.deleteClient({ clientId }));
}

}
