import { Component, Inject, OnInit, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-new-consulting-details',
  imports: [MatDialogModule,MatButtonModule],
  templateUrl: './new-consulting-details.component.html',
  styleUrl: './new-consulting-details.component.scss'
})
export class NewConsultingDetailsComponent implements OnInit{
  readonly dialogRef = inject(MatDialogRef<NewConsultingDetailsComponent>)
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  ngOnInit(): void {
   this.username= this.data.username
   this.password=this.data.password
  }

username:string='username';
password:string='password'

close(){
  this.dialogRef.close()
}

sendEmail(){

}
}
 