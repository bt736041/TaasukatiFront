import { CommonModule } from '@angular/common';
import { Component , Input, OnInit, inject,} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router , RouterModule, ActivatedRoute} from '@angular/router';
import { AddConsultingComponent } from './add-consulting/add-consulting.component';

@Component({
  selector: 'app-counsellor',
  imports: [RouterModule, CommonModule, AddConsultingComponent],
  templateUrl: './counsellor.component.html',
  styleUrl: './counsellor.component.scss'
})
export class CounsellorComponent implements OnInit{
  route=inject(ActivatedRoute)

  router = inject(Router);
  readonly dialog = inject(MatDialog)

  

ngOnInit(): void {


}

addConsulting(){
this.dialog.open(AddConsultingComponent)
//this.router.navigate(['counsellor/addConsulting'])
  }

// resultsConsultings(){
// this.router.navigate(['counsellor/allResults'])
//   }

  signUp(){

  }

}
