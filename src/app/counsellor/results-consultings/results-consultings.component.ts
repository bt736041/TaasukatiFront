import { Component, inject } from '@angular/core';
import { CounsellorService } from '../../simple/Services/counsellor.service';
import { OneConsultingComponent } from '../one-consulting/one-consulting.component';
import { AddConsultingComponent } from '../add-consulting/add-consulting.component';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-results-consultings',
  imports: [OneConsultingComponent, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './results-consultings.component.html',
  styleUrl: './results-consultings.component.scss'
})
export class ResultsConsultingsComponent {

  counsellorService= inject(CounsellorService)

  readonly dialog = inject(MatDialog)

  users=this.counsellorService.getUsers()
 
  addConsulting(){
    this.dialog.open(AddConsultingComponent)
    
      }

}