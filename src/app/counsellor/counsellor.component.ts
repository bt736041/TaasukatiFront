import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AddConsultingComponent } from './add-consulting/add-consulting.component';
import { Store } from '@ngrx/store';
import { Advisor } from '../models/advisor';
import { selectAdvisor, selectClients, selectLastCreatedClient, selectRegions } from '../store/advisor/advisor.selectors';

@Component({
  selector: 'app-counsellor',
  imports: [RouterModule, CommonModule, AddConsultingComponent],
  templateUrl: './counsellor.component.html',
  styleUrl: './counsellor.component.scss'
})
export class CounsellorComponent implements OnInit {
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

  addConsulting() {
    this.dialog.open(AddConsultingComponent)
  }


}
