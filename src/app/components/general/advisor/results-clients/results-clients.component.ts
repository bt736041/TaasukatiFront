import { Component, inject } from '@angular/core';
import { OneClientComponent } from '../one-client/one-client.component';
import { AddClientComponent } from '../add-client/add-client.component';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
// import { CounsellorService } from '../../../../services/old-services/counsellor.service';

@Component({
  selector: 'app-results-clients',
  imports: [RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './results-clients.component.html',
  styleUrl: './results-clients.component.scss'
})
export class ResultsClientsComponent {


  readonly dialog = inject(MatDialog)

 
  addClient(){
    this.dialog.open(AddClientComponent)
    
      }

}