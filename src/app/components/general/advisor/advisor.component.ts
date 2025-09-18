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

@Component({
  selector: 'app-advisor',
  imports: [ButtonComponent,RouterModule, CommonModule, OneClientComponent],
  templateUrl: './advisor.component.html',
  styleUrl: './advisor.component.scss'
})
export class AdvisorComponent implements OnInit {
  route = inject(ActivatedRoute)
  router = inject(Router);
  readonly dialog = inject(MatDialog)
  store = inject(Store)
  advisor$ = this.store.select(selectAdvisor)
  clients$ = this.store.select(selectClients)
  regions$ = this.store.select(selectRegions)
  lastCreatedClient$ = this.store.select(selectLastCreatedClient)
  
  ngOnInit(): void {
  }

  addClient() {
    this.dialog.open(AddClientComponent)
  }



}
