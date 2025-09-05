import { Component, inject } from '@angular/core';
import { CounsellorService } from '../../simple/Services/counsellor.service';
import { OneClientComponent } from '../one-client/one-client.component';
import { AddClientComponent } from '../add-client/add-client.component';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-results-clients',
  imports: [OneClientComponent, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './results-clients.component.html',
  styleUrl: './results-clients.component.scss'
})
export class ResultsClientsComponent {

  counsellorService= inject(CounsellorService)

  readonly dialog = inject(MatDialog)

  users=this.counsellorService.getUsers()
 
  addClient(){
    this.dialog.open(AddClientComponent)
    
      }

}